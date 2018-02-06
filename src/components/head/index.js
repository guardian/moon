// includes:
// - https://meyerweb.com/eric/tools/css/reset
// - https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice

import loadApp from './__inline__/loadApp';
import loadFonts from './__inline__/loadFonts';
import resetCSS from './__inline__/reset.css';

const getFontDefinitions = fontDefinitions => {
    let html = '';

    if (fontDefinitions) {
        fontDefinitions.forEach(typeFace => {
            html += `<style class="webfont" data-cache-name="${
                typeFace.typeFace
            }"`;
            typeFace.fileTypes.forEach(fileType => {
                html += ` data-cache-file-${fileType.fileType}="${
                    fileType.endpoint
                }"`;
                fileType.hintTypes.forEach(hintType => {
                    html += ` data-cache-file-hinted-${hintType.hintType}-${
                        fileType.fileType
                    }="${hintType.endpoint}"`;
                });
            });
            html += '></style>';
        });
    }

    return html;
};

export default (props, appCSS) =>
    `<head lang="en" data-page-path="/uk">
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Page not found | The Guardian</title>
        <meta name="description" content="">
        <meta name="format-detection" content="telephone=no"/>
        <meta name="HandheldFriendly" content="True"/>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>${resetCSS}</style>
        ${getFontDefinitions(props.config.fontDefinitions)}
        ${appCSS}
        <script>
            window.guardian = ${JSON.stringify(props)};
            ${loadApp}
            ${loadFonts}
        </script>
    </head>`;
