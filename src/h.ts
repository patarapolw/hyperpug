export const h = (name: string, eqdict: string, children: string | string[]) => {
  const childrenNodes = typeof children === 'string' ? [children] : children

  eqdict = ' ' + eqdict

  const classes: string[] = []
  name = name.replace(/\.[^'"#.]+/g, (p0) => {
    classes.push(p0.substring(1))
    return ''
  })

  let classList = ''
  eqdict = eqdict.replace(/\sclass=(['"])([^'"]*?)\1/g, (_full, _quote, classList_) => {
    classList = classList_
    return ''
  })

  classList = [classList.trim(), ...classes].join(' ').trim()

  if (classList) {
    eqdict = `class="${classList}" ${eqdict}`
  }

  let id = ''
  name = name.replace(/#[^'"#.]+/g, (p0) => {
    id = p0.substring(1)
    return ''
  })

  if (id) {
    eqdict = eqdict.replace(/\sid=(['"])[^'"]*?\1/g, '')
    eqdict = `id="${id}" ${eqdict}`
  }

  eqdict = eqdict.trim()

  if (!name) {
    name = 'div'
  }

  return `<${name}${eqdict ? ` ${eqdict}` : ''}>${childrenNodes.join('')}</${name}>`
}
