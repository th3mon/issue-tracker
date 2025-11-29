export const Endpoints = {
  API_ISSUES: "/api/issues/",
  ISSUES: "/issues/list",
  ISSUE: "/issues/${issueId}",
  ISSUE_EDIT: "/issues/edit/${issueId}",
  ISSUE_NEW: "/issues/new",
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
