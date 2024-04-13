#!/usr/bin/env zx

const countries = 'AU CA CN DE FR GB IT JP KR RU US'

async function mkdir() {
  for (const country of countries.split(' ')) {
    await $`mkdir ./src/content/featured/${country}`
  }
}

async function mv() {
  for (const country of countries.split(' ')) {
    const files = await glob([`src/content/featured/*_${country}.json`])

    for (const file of files) {
      await $`git mv ${file} ./src/content/featured/${country}`
    }
  }
}

async function rename() {
  for (const country of countries.split(' ')) {
    const files = await glob([`src/content/featured/${country}/*.json`])

    for (const file of files) {
      await $`git mv ${file} ${file.replace(`_${country}.json`, '.json')}`
    }
  }
}

rename()
