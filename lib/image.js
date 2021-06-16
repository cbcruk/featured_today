export function getThumbnail(url, size) {
  const result = url.replace(/\d+x\d+.+/, '') + `${size}.webp`
  return result
}
