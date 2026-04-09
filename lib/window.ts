import { PropsWithoutRef, useEffect, useState } from "react";

export default function forwardHandle<P>(render: (props: P, handle: string) => React.ReactNode) {
    return (props: P) => {
        const [handle, setHandle] = useState<string>(null);
        
        useEffect(() => {
            const params = new URLSearchParams(window.location.hash.slice(1));
            setHandle(params.get("handle"));
        }, []);

        return handle && render(props, handle);
    };
};
