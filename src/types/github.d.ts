type TreeNode = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size: number;
  url: string;
};

export type TreeResponse = {
  sha: string;
  url: string;
  tree: TreeNode[];
  truncated: boolean;
};

export type CommitList = CommitResponse[];
export interface CommitResponse {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: Commit;
  author: User;
  committer: User;
  parents: Tree[];
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Commit {
  url: string;
  author: CommitAuthor;
  committer: CommitAuthor;
  message: string;
  tree: Tree;
  comment_count: number;
  verification: Verification;
}

interface CommitAuthor {
  name: string;
  email: string;
  date: Date;
}

interface Tree {
  url: string;
  sha: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
}
