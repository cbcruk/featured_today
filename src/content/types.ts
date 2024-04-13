import type { CollectionEntry } from 'astro:content'

export type Featured = CollectionEntry<'featured'>
export type Stories = Featured['data']['stories']
export type Story = Stories[number]
