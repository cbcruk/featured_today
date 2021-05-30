#!/usr/bin/env zx

const countries = [
  'US',
  'AU',
  'CA',
  'CN',
  'FR',
  'DE',
  'GB',
  'IT',
  'KR',
  'JP',
  'RU',
]

async function mkdir() {
  for (const country of countries) {
    await $`mkdir ./raw_data/${country}`
    await $`touch ./raw_data/${country}/data.json`
  }
}
