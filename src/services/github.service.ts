import axios from "axios";

import type { TreeResponse } from "@/types/github";
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

/** Get the date at which an item was last updated
 * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
 */
export async function getUpdatedDate(path: string) {
  const endpoint = new URL(
    `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/commits`
  );

  const params = endpoint.searchParams;
  params.append("page", "1");
  params.append("per_page", "1");

  if (path) params.append("path", path);

  const authStore = useAuthStore();

  try {
    const response = await axios.get(endpoint.toString(), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${authStore.access_token}`,
      },
    });
    console.log(response);
    console.error(`Retrieved commit ${response.data[0].sha}`);
    return response.data;
  } catch (e: any) {
    console.error(e.response);
    console.error(`Failed to get commit at path "${path}"`);
  }
}

/** Download the raw contents of a file from GitHub */
export async function downloadFile(path: string) {
  const endpoint = new URL(
    `https://raw.githubusercontent.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/main/${path}`
  );

  try {
    const response = await axios.get<string | Object>(endpoint.toString());
    console.log(response);
    console.log(`Downloaded file ${path}`);
    return response.data;
  } catch (e: any) {
    console.error(e.response);
    console.error(`Failed to download file "${path}" (${e})`);
  }
}
