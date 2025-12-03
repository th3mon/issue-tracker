export const Endpoints = {
  API_ISSUES: "/api/issues/",
  API_SIGNOUT: "/api/auth/signout",
  API_SIGNIN: "/api/auth/signin",
  API_USERS: "/api/users/",
  ISSUES: "/issues/list",
  ISSUE: "/issues/",
  ISSUE_EDIT: "/issues/edit/",
  ISSUE_NEW: "/issues/new",
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
