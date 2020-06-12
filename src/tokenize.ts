export function tokenize (s: string): {
  key: string
  dict: string
  post: string
} {
  let key = ''
  let dict = ''
  let post = ''

  let wasInsideBracket = false
  let wasExitBracket = false
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

    if (!wasInsideBracket) {
      key += c
    } else if (!wasExitBracket) {
      dict += c
    } else {
      post += c
    }
  }

  return {
    key,
    dict,
    post,
  }
}
