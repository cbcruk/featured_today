import { readFile, readdir } from 'node:fs/promises'
import Database from 'better-sqlite3'

const db = new Database('featured_today.db', { verbose: console.log })

const insertCountry = db.prepare(
  'INSERT INTO countries (country, date) VALUES (?, ?)'
)

const insertStory = db.prepare(`
  INSERT INTO stories (position, story_id, url, title, label, short_description, style, video_preview_url, substyle, country_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertArtwork = db.prepare(`
  INSERT INTO artworks (story_id, url, bg_color, alpha)
  VALUES (?, ?, ?, ?)
`)

const insertTextColor = db.prepare(
  'INSERT INTO artwork_text_colors (artwork_id, text_color) VALUES (?, ?)'
)

const insertApp = db.prepare(`
  INSERT INTO apps (story_id, app_id, name, publisher_id, publisher_name, subtitle, icon_url, on_card)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertOffer = db.prepare(`
  INSERT INTO app_offers (app_id, action_text, price, price_formatted)
  VALUES (?, ?, ?, ?)
`)

const insertCategory = db.prepare(
  'INSERT INTO app_categories (app_id, category) VALUES (?, ?)'
)

async function main() {
  const featuredUrl = new URL('../src/content/featured', import.meta.url)
  const countries = await readdir(featuredUrl.pathname)

  for (const country of countries) {
    const countryUrl = new URL(
      `../src/content/featured/${country}`,
      import.meta.url
    )
    const dates = await readdir(countryUrl.pathname)

    for (const date of dates) {
      const dateUrl = new URL(
        `../src/content/featured/${country}/${date}`,
        import.meta.url
      )
      const dateFile = await readFile(dateUrl.pathname, { encoding: 'utf-8' })
      const data = JSON.parse(dateFile)

      const countryId = insertCountry.run(
        data.country,
        data.date.slice(0, 10)
      ).lastInsertRowid

      for (const story of data.stories) {
        const storyId = insertStory.run(
          story.position,
          story.id,
          `${story.url}`,
          `${story.title}`,
          `${story.label}`,
          `${story.short_description}`,
          `${story.style}`,
          `${story.video_preview_url}`,
          `${story.substyle}`,
          countryId
        ).lastInsertRowid

        if (story.artwork) {
          const artworkId = insertArtwork.run(
            storyId,
            `${story.artwork.url}`,
            `${story.artwork.bg_color}`,
            `${story.artwork.alpha}`
          ).lastInsertRowid

          for (const color of story.artwork.text_colors) {
            insertTextColor.run(artworkId, color)
          }
        }

        for (const app of story.apps) {
          const appId = insertApp.run(
            storyId,
            app.app_id,
            `${app.name}`,
            `${app.publisher_id}`,
            `${app.publisher_name}`,
            `${app.subtitle}`,
            `${app.icon_url}`,
            `${app.on_card}`
          ).lastInsertRowid

          insertOffer.run(
            appId,
            `${app.offer.action_text}`,
            `${app.offer.price}`,
            `${app.offer.price_formatted}`
          )

          for (const category of app.categories) {
            insertCategory.run(appId, category)
          }
        }
      }
    }
  }
}

main()
