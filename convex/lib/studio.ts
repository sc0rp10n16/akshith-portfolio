import {
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

function secretsMatch(given: string, expected: string): boolean {
  if (given.length !== expected.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < given.length; i += 1) {
    mismatch |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return mismatch === 0;
}

function assertStudioSecret(secret: string) {
  const expected = process.env.CONVEX_STUDIO_SECRET;
  if (!expected || !secretsMatch(secret, expected)) {
    throw new Error("Unauthorized");
  }
}

export const studioQuery = customQuery(query, {
  args: { secret: v.string() },
  input: async (ctx, args) => {
    assertStudioSecret(args.secret);
    return { ctx, args: {} };
  },
});

export const studioMutation = customMutation(mutation, {
  args: { secret: v.string() },
  input: async (ctx, args) => {
    assertStudioSecret(args.secret);
    return { ctx, args: {} };
  },
});
