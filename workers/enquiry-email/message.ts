// Builds the email that a contact form enquiry is sent as: plain text, from
// the website's no-reply address, and replied to at the visitor's address.

export interface Enquiry {
  name: string;
  email: string;
  topic: string;
  format: string;
  message: string;
}

export const FROM = "noreply@horizonpsychology.co.uk";

/**
 * The raw email for an enquiry, addressed to `addressedTo`. The recipient's
 * email program replies from that address, whichever inbox it's delivered to.
 */
export function enquiryEmail(enquiry: Enquiry, addressedTo: string) {
  const { name, email, topic, format, message } = enquiry;
  const details = [
    ["Name", name],
    ["Email", email],
    ["Enquiring about", topic],
    ["Online or face-to-face", format],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const body = message
    ? [...details, "", message.replace(/\r?\n/g, "\r\n")]
    : details;

  return [
    `From: Horizon Psychology <${FROM}>`,
    `To: ${addressedTo}`,
    `Reply-To: ${encodeWords(name)} <${email}>`,
    `Subject: ${encodeWords(`Website enquiry from ${name}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@horizonpsychology.co.uk>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64(body.join("\r\n")).replace(/.{76}(?=.)/g, "$&\r\n"),
  ].join("\r\n");
}

/**
 * Encodes text the visitor wrote for an email header (RFC 2047), so it can
 * hold any characters but never a line break that starts a new header. Each
 * encoded word holds at most 39 bytes, so a header's lines stay under 78
 * characters, and never splits a character.
 */
function encodeWords(text: string) {
  const words: string[] = [];
  let word = "";
  for (const character of text) {
    if (new TextEncoder().encode(word + character).length > 39) {
      words.push(word);
      word = "";
    }
    word += character;
  }
  words.push(word);
  return words.map((word) => `=?UTF-8?B?${base64(word)}?=`).join("\r\n ");
}

function base64(text: string) {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
