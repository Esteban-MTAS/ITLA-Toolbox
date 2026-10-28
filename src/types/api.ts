import { z } from 'zod';
export const GenderSchema = z.object({
  name: z.string(),
  gender: z.enum(['male', 'female']).nullable(),
  probability: z.number().min(0).max(1).nullable().optional(),
  count: z.number().optional(),
});
export type GenderResponse = z.infer<typeof GenderSchema>;
export const PersonSchema = z.object({
  results: z
    .array(
      z.object({
        name: z.object({ first: z.string(), last: z.string() }),
        dob: z.object({ date: z.string(), age: z.number() }),
        picture: z.object({ large: z.string() }).optional(),
      }),
    )
    .min(1),
});
export type Person = z.infer<typeof PersonSchema>['results'][number];
export const UniversitiesSchema = z.array(
  z.object({
    name: z.string(),
    domains: z.array(z.string()).default([]),
    web_pages: z.array(z.string()).default([]),
  }),
);
export type University = z.infer<typeof UniversitiesSchema>[number];
export const WeatherSchema = z.object({
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number().nullable(),
    apparent_temperature: z.number().nullable(),
    weather_code: z.number(),
    wind_speed_10m: z.number().nullable(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number().nullable()),
    temperature_2m_min: z.array(z.number().nullable()),
    precipitation_probability_max: z.array(z.number().nullable()).optional(),
  }),
});
export type Weather = z.infer<typeof WeatherSchema>;
export const PokemonSchema = z.object({
  name: z.string(),
  base_experience: z.number().nullable(),
  abilities: z.array(z.object({ ability: z.object({ name: z.string() }) })),
  sprites: z.object({
    front_default: z.string().nullable(),
    other: z
      .object({
        'official-artwork': z.object({ front_default: z.string().nullable() }),
      })
      .optional(),
  }),
  cries: z.object({ latest: z.string().nullable().optional() }).optional(),
});
export type Pokemon = z.infer<typeof PokemonSchema>;
export const PostsSchema = z.array(
  z.object({
    id: z.number(),
    link: z.string(),
    date_gmt: z.string(),
    title: z.object({ rendered: z.string() }),
    excerpt: z.object({ rendered: z.string() }),
  }),
);
export type Post = z.infer<typeof PostsSchema>[number];
