export function tokenize (s: string): {
  key: string
  dict: string
  suffix: string
  content: string
} {
  let key = ''
  let dict = ''
  let suffix = ''
  let content = ''

  let wasInsideBracket = false
  let wasExitBracket = false
  let wasEndOfKey = false

  const bracketStack: string[] = []

  for (const c of s.split('')) {
    if (c === '(') {
      bracketStack.push(c)
      wasInsideBracket = true

      continue
    } else if (c === ')') {
      bracketStack.pop()
      if (bracketStack.length === 0) {
        wasExitBracket = true
      }

      continue
    }

    if ([' ', ':'].includes(c)) {
      wasEndOfKey = true
    }

    if (!wasInsideBracket) {
      if (wasEndOfKey) {
        content += c
      } else {
        key += c
      }
    } else if (!wasExitBracket) {
      dict += c
    } else {
      content += c
    }
  }

  if ([':', '.'].some((el) => content.startsWith(el))) {
    suffix = content[0]
    content = content.substr(1)
  }

  if ([':', '.'].some((el) => key.endsWith(el))) {
    suffix = key[key.length - 1]
    key = key.substr(0, key.length - 1)
  }

  content = content.trim()

  return {
    key,
    dict,
    suffix,
    content,
  }
}
