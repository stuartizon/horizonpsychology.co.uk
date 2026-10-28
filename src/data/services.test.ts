import { expect, test } from "vitest";
import { faqs } from "./faqs";
import { services } from "./services";

test("each service page asks the questions Emma chose, in her order", () => {
  expect(
    Object.fromEntries(
      services.map((service) => [
        service.id,
        service.faqs.map((id) => faqs[id].question),
      ]),
    ),
  ).toEqual({
    "individual-therapy": [
      "How do I know if this is right for me?",
      "What happens after I get in touch?",
      "How many sessions will I need?",
      "Is therapy confidential?",
    ],
    "couples-therapy": [
      "How do I know if this is right for me?",
      "Do we need to be in a romantic relationship?",
      "Do we both need to attend every session?",
      "How does confidentiality work with two people?",
    ],
    "clinical-supervision": [
      "Who is clinical supervision for?",
      "Can I book a one-off session?",
      "Do you offer group supervision?",
      "Is supervision suitable for BABCP accreditation?",
    ],
    "research-supervision": [
      "Who is research supervision for?",
      "At what stage can supervision start?",
      "Can you help with ethics applications?",
      "Do you support publication?",
    ],
  });
});
