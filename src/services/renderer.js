import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('bash', bash);

marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-'
});

export async function renderMarkdown(content, githubConfig) {
  let html = marked.parse(content);

  html = convertInternalLinks(html);
  html = convertImageLinks(html, githubConfig);

  return html;
}

function convertInternalLinks(html) {
  return html.replace(
    /\[\[(.*?)\]\]/g,
    '<a href="#/$1.md" class="internal-link text-blue-600 hover:text-blue-800 transition-colors">$1</a>'
  );
}

function convertImageLinks(html, githubConfig) {
  const { owner, repo, branch } = githubConfig;

  return html.replace(
    /!\[\[(.*?)\]\]/g,
    (match, filename) => {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/_image_${filename}`;
      return `<img src="${url}" alt="${filename}" class="max-w-full h-auto rounded-md shadow-sm my-4" />`;
    }
  );
}