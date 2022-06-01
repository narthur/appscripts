export default function fetchJson(url: string): unknown {
  const response = UrlFetchApp.fetch(url);
  const text: string = response.getContentText();

  return JSON.parse(text);
}
