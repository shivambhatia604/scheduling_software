import "server-only";

import { cache } from "react";
import getUser from "./data/user/getUser";
import { getToken } from "./session";

export type getUser =Awaited<ReturnType<typeof getUser>>;

export const auth = cache(async () => {
  const session = await getToken();
  if (!session?.userId) {
    return null;
  }

  const user = await getUser(session?.userId);
if(!user) {
  return null;
}
  return { user };
});
// export async function signIn() {
//  createSession();
// }
// export async function signOut() {
//   const session = await getToken();
//   if (!session?.userId) {
//     return null;
//   }

//   const user = await getUser(session?.userId);

//   return { user };
// }
