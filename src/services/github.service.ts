import axios from "axios";

import type { CommitList, TreeResponse } from "@/types/github";
import { useAuthStore } from "@/stores/auth";

import { REPOSITORY_OWNER, REPOSITORY_NAME } from "@/config";

/** Get a Git tree
 * @see https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree
 */
export async function getGitTree(SHA: string, recursive = false) {
  const endpoint = new URL(
    `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/git/trees/`
  );
  const url = new URL(SHA, endpoint);

  if (recursive) url.searchParams.append("recursive", "true");

  const authStore = useAuthStore();

  try {
    const response = await axios.get<TreeResponse>(url.toString(), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${authStore.access_token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (e: any) {
    const response = e.response;
    console.error(response);
    throw new Error(`Failed to get git tree ${url.toString()} (${e})`);
  }
}

/** Get the latest commit at a path
 * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
 */
export async function getCommit(path: string) {
  const endpoint = new URL(
    `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/commits`
  );

  const params = endpoint.searchParams;
  params.append("path", path);
  params.append("page", "1");
  params.append("per_page", "1");

  const authStore = useAuthStore();

  try {
    console.log(endpoint.toString());
    const response = await axios.get<CommitList>(endpoint.toString(), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${authStore.access_token}`,
      },
    });
    console.log(response);
    console.log(`Retrieved commit ${response.data[0].sha}`);
    return response.data[0];
  } catch (e: any) {
    console.error(e.response ?? e.message);
    console.error(`Failed to get commit at path "${path}"`);
    throw e;
  }
}

/** Download the raw contents of a file from GitHub */
export async function downloadFile<T>(path: string) {
  const endpoint = new URL(
    `https://raw.githubusercontent.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/main/${path}`
  );

  try {
    const response = await axios.get<T>(endpoint.toString());
    console.log(response);
    console.log(`Downloaded file ${path}`);
    if (!response.data) throw new Error("Response contains no data!");
    return response.data;
  } catch (e: any) {
    console.error(e.response);
    console.error(`Failed to download file "${path}" (${e})`);
    throw e;
  }
}
