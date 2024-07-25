import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';

marked.setOptions({
    breaks: true,
});

const placeholder = `# Heading Element (H1 Size)
## Sub Heading Element (H2 Size)
[link to this gh repo](https://github.com/the-rfer/FreeCodeCamp/tree/main/MarkdownPreviewer)
\` \`console.log('Hello, world!');\` \`
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
- List Item 1
- List Item 2
- List Item 3
> This is a blockquote.
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
**This text is bolded.**
`;

function App() {
    const [markdown, setMarkdown] = useState(placeholder);

    const purify = DOMPurify(window);

    const handleChange = (e) => {
        setMarkdown(e.target.value);
    };

    useEffect(() => {
        const clean = purify.sanitize(markdown);
        document.getElementById('preview').innerHTML = marked(clean);
    }, [markdown]);
    return (
        <>
            {/* When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a heading element (H1 size), a sub heading element (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text. */}

            <div id='editor-container'>
                <textarea
                    id='editor'
                    value={markdown}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div id='preview-container'>
                <div id='preview'></div>
            </div>
        </>
    );
}

export default App;
