import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { lucia } from "$lib/server/lucia";

export const POST: RequestHandler = async (event) => {
  const { user, session } = event.locals;

  console.log("user", user);
  console.log("session", session);

  if (!event.locals.session) {
    redirect(302, "/");
  }
  await lucia.invalidateSession(event.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
  redirect(302, "/");
};
