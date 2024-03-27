import React from 'react';

export default function SanitizedHtml({htmlString}) {

    if (htmlString === undefined) {
        return '';
    }
    const removeStyleAttributes = (htmlString) => {
        // Define a regular expression to match style attributes
        const styleRegex = /\s*style\s*=\s*(['"])(.*?)\1/gi;

        return htmlString.replace(styleRegex, '');
    };

    const sanitizedHtml = removeStyleAttributes(htmlString);

    return <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>;
}
