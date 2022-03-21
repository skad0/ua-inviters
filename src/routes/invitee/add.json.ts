import type { RequestHandler } from "@sveltejs/kit";
import db from "../../db/db";

export const get: RequestHandler = async (event) => {
  const body = await event.request.json();
  try {
    const insertedEntity = await db("regufees").insert(body);
    return {
      status: 201,
      body: {
        error: null,
        data: insertedEntity,
      },
    };
  } catch (e) {
    return {
      status: 500,
      body: {
        error: e,
        data: {},
      },
    };
  }
};
