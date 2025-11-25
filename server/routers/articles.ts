import { z } from "zod"
import { publicProcedure, router } from "../trpc"

export const articlesRouter = router({
  getAll: publicProcedure.query(async () => {
    // Mock data for now - replace with real DB query
    return [
      {
        id: "1",
        title: "Zohran Momdani Recent Election Win",
        excerpt: "Socialist candidate secures historic victory",
        category: "Politics",
        views: 15420,
        likes: 3200,
      },
    ]
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    // Mock data - replace with real DB query
    return {
      id: input.id,
      title: "Article Title",
      content: "Article content here",
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: Implement article creation
      return { success: true, id: "1" }
    }),

  search: publicProcedure.input(z.object({ query: z.string() })).query(async ({ input }) => {
    // TODO: Implement vector search
    return []
  }),
})
