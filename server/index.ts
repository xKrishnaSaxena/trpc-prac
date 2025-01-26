import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

const appRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const username = opts.ctx.username;
      let email = opts.input.email;
      let password = opts.input.password;

      let token = "xyz";
      return { token };
    }),
  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async (opts) => {
      console.log(opts.ctx.username);
      return {
        id: "1",
      };
    }),
});
//http server
const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];

    return {
      username: "xyzo",
    };
  },
});
//serving
server.listen(3000);

export type AppRouter = typeof appRouter;
