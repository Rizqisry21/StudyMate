/** Prefix public assets when this app is hosted under a repository path. */
export function publicAsset(path: string): string {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
