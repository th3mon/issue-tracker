export const Endpoints = {
  API_ISSUES: "/api/issues/",
  API_SIGNOUT: "/api/auth/signout",
  API_SIGNIN: "/api/auth/signin",
  ISSUES: "/issues/list",
  ISSUE: "/issues/${issueId}",
  ISSUE_EDIT: "/issues/edit/${issueId}",
  ISSUE_NEW: "/issues/new",
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
