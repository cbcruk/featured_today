import { defineCollection, z } from 'astro:content'

const featured = defineCollection({
  type: 'data',
  schema: z.object({
    country: z.string(),
    date: z.string(),
    stories: z.array(
      z.object({
        position: z.number(),
        id: z.string(),
        url: z.string().nullable(),
        title: z.string().nullable(),
        label: z.string().nullable(),
        short_description: z.string().nullable(),
        style: z.string(),
        artwork: z
          .object({
            url: z.string(),
            text_colors: z.array(z.string().nullable()),
            bg_color: z.string().nullable(),
            alpha: z.boolean(),
          })
          .nullable(),
        video_preview_url: z.string().nullable(),
        apps: z.array(
          z.union([
            z.object({
              app_id: z.number(),
              name: z.string(),
              publisher_id: z.string(),
              publisher_name: z.string(),
              categories: z.array(z.number()),
              subtitle: z.string(),
              icon_url: z.string(),
              offer: z.object({
                action_text: z.string(),
                price: z.number(),
                price_formatted: z.string(),
              }),
              on_card: z.boolean(),
            }),
            z.object({
              app_id: z.number(),
              name: z.string(),
              publisher_id: z.string(),
              publisher_name: z.string(),
              categories: z.array(z.number()),
              subtitle: z.null(),
              icon_url: z.string(),
              offer: z.object({
                action_text: z.string(),
                price: z.number(),
                price_formatted: z.string(),
              }),
              on_card: z.boolean(),
            }),
          ])
        ),
        substyle: z.string().nullable(),
      })
    ),
  }),
})

export const collections = {
  featured,
}
