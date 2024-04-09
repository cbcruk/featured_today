import { Glob } from 'bun'
import { unlink } from 'node:fs/promises'

const glob = new Glob('./raw_data/**/*.json')

for await (const file of glob.scan('.')) {
  const f = Bun.file(file)

  if (f.size === 0) {
    await unlink(file)
  }
}
