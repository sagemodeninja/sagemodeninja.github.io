
'use client';
import React, { useEffect, useState } from 'react';

export default function WebpConverterPage() {
	// Requirements checklist (kept here for traceability):
	// - file input for image selection
	// - EXIF metadata will be removed (canvas-based conversion)
	// - resizing (width/height)
	// - quality control
	// - convert to webp and provide download

	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [quality, setQuality] = useState<number>(80);
	const [resize, setResize] = useState<boolean>(false);
	const [width, setWidth] = useState<number | ''>('');
	const [height, setHeight] = useState<number | ''>('');
	const [outputUrl, setOutputUrl] = useState<string | null>(null);
	const [processing, setProcessing] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			if (outputUrl) URL.revokeObjectURL(outputUrl);
		};
	}, [previewUrl, outputUrl]);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] ?? null;
		setFile(f);
		setOutputUrl(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		if (f) {
			setPreviewUrl(URL.createObjectURL(f));
		}
	};

	const convertToWebP = async () => {
		if (!file) return;
		setProcessing(true);
		try {
			// Load image from selected file (use a fresh object URL and revoke it afterwards)
			const srcUrl = URL.createObjectURL(file);
			let img: HTMLImageElement | null = null;
			try {
				img = await loadImage(srcUrl);
			} finally {
				URL.revokeObjectURL(srcUrl);
			}

			// Determine target size
			let targetW = img.width;
			let targetH = img.height;
			if (resize) {
				if (width && !height) {
					targetW = Number(width);
					targetH = Math.round((img.height / img.width) * targetW);
				} else if (!width && height) {
					targetH = Number(height);
					targetW = Math.round((img.width / img.height) * targetH);
				} else if (width && height) {
					targetW = Number(width);
					targetH = Number(height);
				}
			}

			if (!img) throw new Error('Image load failed');
			// Use high-quality downscaling and image smoothing to reduce aliasing.
			const resultCanvas = await downscaleAndDrawToCanvas(img, targetW, targetH);

			const blob: Blob | null = await new Promise((resolve) =>
				resultCanvas.toBlob((b) => resolve(b), 'image/webp', Math.max(0.01, Math.min(1, quality / 100)))
			);

			if (!blob) throw new Error('Conversion failed');

			if (outputUrl) {
				URL.revokeObjectURL(outputUrl);
			}
			const outUrl = URL.createObjectURL(blob);
			setOutputUrl(outUrl);
		} catch (err) {
			// keep short: errors surfaced to console
			// In-app messaging could be added later
			// eslint-disable-next-line no-console
			console.error(err);
			alert('Conversion failed: ' + String(err));
		} finally {
			setProcessing(false);
		}
	};

	return (
		<div style={{ maxWidth: 720, margin: '2rem auto', padding: 20 }}>
			<h3>WebP Converter</h3>

			<div style={{ marginBottom: 12 }}>
				<input type="file" accept="image/*" onChange={onFileChange} />
			</div>

			{previewUrl && (
				<div style={{ marginBottom: 12 }}>
					<div style={{ marginBottom: 6 }}>Original Preview</div>
					<img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 320 }} />
				</div>
			)}

			<div style={{ marginBottom: 8 }}>
				<div style={{ color: '#666', marginBottom: 6 }}>EXIF metadata will be removed during conversion.</div>
			</div>

			<div style={{ marginBottom: 8 }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={resize} onChange={(e) => setResize(e.target.checked)} />
					Resize
				</label>
				{resize && (
					<div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
						<input
							type="number"
							placeholder="Width"
							value={width as any}
							onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
							style={{ width: 120 }}
						/>
						<input
							type="number"
							placeholder="Height"
							value={height as any}
							onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
							style={{ width: 120 }}
						/>
					</div>
				)}
			</div>

			<div style={{ marginBottom: 12 }}>
				<label>
					Quality (1-100):
					<input
						type="number"
						min={1}
						max={100}
						value={quality}
						onChange={(e) => setQuality(Math.max(1, Math.min(100, Number(e.target.value))))}
						style={{ width: 100, marginLeft: 8 }}
					/>
				</label>
			</div>

			<div style={{ marginBottom: 16 }}>
				<button onClick={convertToWebP} disabled={!file || processing} style={{ padding: '8px 12px' }}>
					{processing ? 'Converting…' : 'Convert to WebP'}
				</button>
			</div>

			{outputUrl && (
				<div style={{ marginTop: 12 }}>
					<h4>Result</h4>
					<img src={outputUrl} alt="converted" style={{ maxWidth: '100%', maxHeight: 320 }} />
					<div style={{ marginTop: 8 }}>
						<a href={outputUrl} download={`converted.webp`}>Download WebP</a>
					</div>
				</div>
			)}
		</div>
	);
}

// --- helpers ---
function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = (e) => reject(new Error('Image load failed'));
		img.src = src;
	});
}

/**
 * Draws `img` into a canvas sized targetW x targetH with high-quality downscaling.
 * Uses createImageBitmap when available and progressive downscaling to reduce aliasing.
 */
async function downscaleAndDrawToCanvas(img: HTMLImageElement, targetW: number, targetH: number): Promise<HTMLCanvasElement> {
	// Single-step high-quality draw: enable smoothing and draw directly to target canvas.
	const srcW = img.naturalWidth || img.width;
	const srcH = img.naturalHeight || img.height;

	let bitmap: ImageBitmap | HTMLImageElement = img;
	if ('createImageBitmap' in window) {
		try {
			bitmap = await (window as any).createImageBitmap(img);
		} catch (e) {
			bitmap = img;
		}
	}

	const canvas = document.createElement('canvas');
	canvas.width = targetW;
	canvas.height = targetH;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas not supported');

	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';

	ctx.drawImage(bitmap as any, 0, 0, srcW, srcH, 0, 0, targetW, targetH);
	if ((bitmap as ImageBitmap).close) try { (bitmap as ImageBitmap).close(); } catch {}
	return canvas;
}
