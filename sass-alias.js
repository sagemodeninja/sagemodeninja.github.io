/**
* Ported from: https://github.com/LuisGazcon/sass-alias/blob/master/source/index.ts.
*/
 
const { fileURLToPath } = require('url');
const { readFileSync } = require('fs');
const { extname } = require('path');
const { resolve } = require('sass-alias/build/resolve');
 
const create = (config) =>{
    const entries = Object.entries(config);

    return {
        canonicalize(requestedUrl, { fromImport }) {
            return entries.reduce((resolved, [alias, path]) => {
                if (resolved)
                    return resolved;

                if ((index = requestedUrl.indexOf(alias)) >= 0) {
                    return resolve({ url: requestedUrl.slice(index), alias, path, fromImport });
                }

                return null;
            }, null);
        },
        load(canonicalUrl) {
            const filepath = fileURLToPath(canonicalUrl);
            const extension = extname(filepath).replace('.', '');
            const contents = readFileSync(filepath).toString();

            return {
                syntax: (extension === 'sass' ? 'indented' : extension),
                contents,
            };
        },
    };
}
 
module.exports = { create };