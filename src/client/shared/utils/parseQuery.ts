export function parseQuery(url: string) {
  const params: { [key: string]: string } = {};
  let query: string | string[] = url.split("?");
  if (query.length < 2) return params;
  query = query[1];
  const pairs = query.split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return params;
}
