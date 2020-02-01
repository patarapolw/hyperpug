/* global CodeMirror, HyperPug, Prism */

/**
 * @type {typeof import('codemirror')}
 */
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  mode: 'pug',
  extraKeys: {
    Tab: (cm) => cm.execCommand('indentMore'),
    'Shift-Tab': (cm) => cm.execCommand('indentLess'),
  },
  matchBrackets: true,
  autoCloseBrackets: true,
  lineWrapping: true,
})
editor.setSize('100%', '100%')

/**
 * @type {import('../src').default}
 */
var hp = new HyperPug()

function parse (s) {
  const raw = typeof s === 'string' ? s : editor.getValue()
  const content = hp.parse(raw)
  const elOutput = document.getElementById('output')
  elOutput.innerHTML = content
  elOutput.querySelectorAll('pre code').forEach((el) => {
    Prism.highlightElement(el)
  })
}

editor.on('change', parse)
// editor.setValue(require('fs').readFileSync(`${__dirname}/../example.md`, 'utf8'))
