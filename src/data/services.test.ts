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
      "In couples therapy, do we need to be in a romantic relationship?",
      "In couples therapy, do both individuals need to attend every session?",
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

test("each service's fees panel lists Emma's points, in her order", () => {
  expect(
    Object.fromEntries(
      services.map((service) => [service.id, service.practical]),
    ),
  ).toEqual({
    "individual-therapy": [
      "Free 15-minute introductory video call",
      "Online or face-to-face sessions in Buckinghamshire",
      "No referral needed to get started",
    ],
    "couples-therapy": [
      "Free 15-minute introductory video call",
      "Online or face-to-face sessions in Buckinghamshire",
      "Sessions for any two people, not just romantic couples",
    ],
    "clinical-supervision": [
      "One-off, ad hoc or ongoing",
      "Online or face-to-face in Buckinghamshire",
      "Group supervision available on request",
    ],
    "research-supervision": [
      "From research proposal and ethics to data analysis and publication",
      "One-off or ongoing",
      "Online or face-to-face in Buckinghamshire",
    ],
  });
});
