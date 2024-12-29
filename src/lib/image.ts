export function getThumbnail(url: string, size: string) {
  const result = url.replace(/\d+x\d+.+/, '') + `${size}.webp`
  return result
}
