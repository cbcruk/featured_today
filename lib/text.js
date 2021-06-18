export function normalize(text) {
  if (!text) {
    return ''
  }

  return text.replace('〈', '<').replace('〉', '>')
}
