import Database from 'better-sqlite3'

for (const country of 'AU CA CN DE FR GB IT JP KR RU US'.split(' ')) {
  const db = new Database(`db/${country.toLowerCase()}.db`, {
    verbose: console.log,
  })

  const states = [
    `CREATE TABLE countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country TEXT NOT NULL,
      date TEXT NOT NULL
    );`,
    `CREATE TABLE stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL,
      story_id TEXT NOT NULL,
      url TEXT,
      title TEXT,
      label TEXT,
      short_description TEXT,
      style TEXT NOT NULL,
      video_preview_url TEXT,
      substyle TEXT,
      country_id INTEGER NOT NULL,
      FOREIGN KEY (country_id) REFERENCES countries(id)
    );`,
    `CREATE TABLE artworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      url TEXT NOT NULL,
      bg_color TEXT,
      alpha BOOLEAN NOT NULL,
      FOREIGN KEY (story_id) REFERENCES stories(id)
    );`,
    `CREATE TABLE artwork_text_colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artwork_id INTEGER NOT NULL,
      text_color TEXT,
      FOREIGN KEY (artwork_id) REFERENCES artworks(id)
    );`,
    `CREATE TABLE apps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      app_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      publisher_id TEXT NOT NULL,
      publisher_name TEXT NOT NULL,
      subtitle TEXT,
      icon_url TEXT NOT NULL,
      on_card BOOLEAN NOT NULL,
      FOREIGN KEY (story_id) REFERENCES stories(id)
    );`,
    `CREATE TABLE app_offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_id INTEGER NOT NULL,
      action_text TEXT NOT NULL,
      price REAL NOT NULL,
      price_formatted TEXT NOT NULL,
      FOREIGN KEY (app_id) REFERENCES apps(id)
    );`,
    `CREATE TABLE app_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_id INTEGER NOT NULL,
      category INTEGER NOT NULL,
      FOREIGN KEY (app_id) REFERENCES apps(id)
    );`,
  ]

  for (const state of states) {
    db.prepare(state).run()
  }
}
