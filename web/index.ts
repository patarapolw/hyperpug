interface Window {
  CodeMirror: typeof import('codemirror')
  HyperPug: typeof import('../src').default
  Prism: typeof import('prismjs')
  markdownit: typeof import('markdown-it')
}

const editorEl = document.getElementById('editor') as HTMLTextAreaElement
const outputEl = document.getElementById('output') as HTMLDivElement

const editor = window.CodeMirror.fromTextArea(editorEl, {
  mode: 'pug',
  extraKeys: {
    Tab: (cm) => cm.execCommand('indentMore'),
    'Shift-Tab': (cm) => cm.execCommand('indentLess'),
  },
  // @ts-ignore
  matchBrackets: true,
  autoCloseBrackets: true,
  lineWrapping: true,
})
editor.setSize('100%', '100%')

console.log(window)

const md = window.markdownit().use((md) => {
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const info = (token.info || '').trim()
    const content = token.content

    if (info === 'pug parsed') {
      return hp.parse(content)
    }

    return fence!(tokens, idx, options, env, slf)
  }
  return md
})

const hp = new window.HyperPug({
  markdown: (s) => {
    return md.render(s)
  },
})

editor.on('change', () => {
  const content = hp.parse(editor.getValue())
  outputEl.innerHTML = content
  outputEl.querySelectorAll('pre code').forEach((el) => {
    window.Prism.highlightElement(el)
  })
})

editor.setValue(require('fs').readFileSync(`${__dirname}/example.pug.txt`, 'utf8'))
