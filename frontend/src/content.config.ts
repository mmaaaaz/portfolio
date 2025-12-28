import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    projectId: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    timeline: z.string().optional(),
    stack: z.string().optional(),
    liveUrl: z.string().optional(),
    images: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
