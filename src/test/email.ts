/** A raw email's headers, unfolded and decoded, and its decoded body. */
export function parseEmail(raw: string) {
  const [head, body] = raw.split("\r\n\r\n");
  const headers = new Map<string, string>();
  for (const line of head.replace(/\r\n[ \t]/g, " ").split("\r\n")) {
    const colon = line.indexOf(":");
    headers.set(
      line.slice(0, colon).toLowerCase(),
      decodeWords(line.slice(colon + 1).trim()),
    );
  }
  return {
    headers,
    body: Buffer.from(body.replace(/\r\n/g, ""), "base64").toString("utf8"),
  };
}

/** Decodes RFC 2047 encoded words, such as `=?UTF-8?B?...?=`. */
function decodeWords(value: string) {
  return value
    .replace(/\?=\s+=\?/g, "?==?")
    .replace(/=\?UTF-8\?B\?([^?]*)\?=/gi, (_, text: string) =>
      Buffer.from(text, "base64").toString("utf8"),
    );
}
