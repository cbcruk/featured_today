export function normalize(text: string | undefined | null) {
  if (!text) {
    return ''
  }

  return text.replace('〈', '<').replace('〉', '>')
}
