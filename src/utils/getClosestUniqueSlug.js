// getClosestUniqueSlug.js

import appwriteService from "../appwrite/config";
import words from "./words";

async function slugExists(candidate) {
  try {
    await appwriteService.getPost(candidate);
    return true; // found — slug is taken
  } catch (error) {
    if (error?.code === 404) {
      return false; // not found — slug is available
    }
    throw error; // genuine failure — don't swallow it
  }
}

export default async function getClosestUniqueSlug(previousSlug) {
  // 1. Try predefined words
  for (const word of words) {
    const candidate = `${previousSlug}-${word}`;

    if (!(await slugExists(candidate))) {
      return candidate;
    }
  }

  // 2. Try numbers
  let i = 1;

  while (true) {
    const candidate = `${previousSlug}-${i}`;

    if (!(await slugExists(candidate))) {
      return candidate;
    }

    i++;
  }
}