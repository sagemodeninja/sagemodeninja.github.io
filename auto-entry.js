const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const crypto = require('crypto')
 
function getEntryHash(file, ext) {
    const entry = path.join(path.dirname(file), path.basename(file, ext))
    return crypto.createHash('md5').update(entry).digest('hex')
}
 
function lookupFiles(root, target, exclude) {
    const files = []
 
    function lookupDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            const template = path.join(dir, file)
            const stat = fs.statSync(template)
 
            if (stat.isDirectory()) {
                lookupDir(template)
            } else if ((ext = path.extname(file)) === target && (!exclude || !exclude.includes(file))) {
                files.push({
                    entry: getEntryHash(template, ext),
                    template,
                    filename: path.relative(root, template),
                })
            }
        })
    }
 
    lookupDir(root)
    return files
}
 
function loadEntries(options) {
    const dir = path.join(__dirname, 'views')
    const files = lookupFiles(dir, '.ts', options?.exclude)
 
    return files
            .reduce((entries, file) => {
                return {
                    ...entries,
                    [file.entry]: file.template
                }
            }, {})
}
 
function loadViews(options) {
    const dir = path.join(__dirname, 'views')
    const files = lookupFiles(dir, '.html', options?.exclude)
 
    return files
            .map(({ entry, filename, template }) => {
                return new HtmlWebpackPlugin({
                    template,
                    filename: filename,
                    chunks: [entry]
                })
            })
}
 
module.exports = {
    load: (options) => {
        switch (options.type) {
            case 'entry':
                return loadEntries(options)
            case 'view':
                return loadViews(options)
            default:
                console.warn(`Unknown entry type: '${options.type}'.`)
        }
    }
}