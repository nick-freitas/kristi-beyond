const STANDALONE_SHEET_PATHS = new Set(['/new-view', '/modify-character']);

export function isStandaloneSheetRoute(
  url: string,
  urlAfterRedirects = url,
): boolean {
  const path = urlAfterRedirects.split(/[?#]/, 1)[0].replace(/\/+$/, '');

  return STANDALONE_SHEET_PATHS.has(path);
}
