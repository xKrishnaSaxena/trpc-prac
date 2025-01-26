import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          Authorization: "Bearer token",
        };
      },
    }),
  ],
});

//calling the endpoint
async function main() {
  let response = await trpc.createTodo.mutate({
    title: "kricom",
  });
  console.log(response);
}

main();
