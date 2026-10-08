import { services } from "./services";

/** The answers to "What are you enquiring about?" on the enquiry form. */
export const topics = [
  ...services.map(({ id, name }) => ({ value: id, label: name })),
  { value: "other", label: "Other" },
];

/** The answers to "Online or face-to-face?" on the enquiry form. */
export const formats = [
  "Online",
  "Face-to-face in Buckinghamshire",
  "Not sure yet",
];
