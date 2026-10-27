import { services } from "@/data/services";
import { describe, expect, test } from "vitest";
import { page, text, texts } from "./pages";

describe("the Confidentiality page", () => {
  const document = page("/confidentiality/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Confidentiality \| /);
    expect(texts(document, "h1")).toEqual(["Confidentiality"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(
      "At Horizon Psychology, confidentiality is central to creating a safe, trusting and collaborative therapeutic relationship.",
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a heading for each part", () => {
    expect(texts(main, "h2")).toEqual([
      "When might confidentiality be limited?",
      "Clinical supervision",
      "Confidentiality in supervision",
      "Confidentiality and your records",
      "Questions",
    ]);
  });

  test("says what the limits of confidentiality are", () => {
    expect(texts(main, "li")).toEqual([
      "There is a serious concern about your safety or wellbeing, or the safety of another person.",
      "There are safeguarding concerns involving a child or an adult at risk of abuse or neglect.",
      "Information must be disclosed to meet a legal obligation, such as a court order, or where disclosure is otherwise justified by law or a relevant public interest.",
    ]);
  });

  test("links to the privacy policy", () => {
    expect(main.querySelector('a[href="/privacy-policy/"]')).not.toBeNull();
  });
});

describe("the Complaints page", () => {
  const document = page("/complaints/");
  const main = document.querySelector("main")!;
  const link = (href: string) => text(main.querySelector(`a[href="${href}"]`));

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Complaints and concerns \| /);
    expect(texts(document, "h1")).toEqual(["Complaints and concerns"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(
      "If something about your care or experience with Horizon Psychology has not felt right, please feel able to raise it.",
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a heading for data protection concerns", () => {
    expect(texts(main, "h2")).toEqual(["Privacy and data protection concerns"]);
  });

  test("says how long a response takes", () => {
    expect(text(main)).toContain(
      "You will receive an acknowledgement within ten working days and a full response within 20 working days.",
    );
  });

  test("names the HCPC, BABCP and ICO in full, linking to each in a new tab", () => {
    expect(link("https://www.hcpc-uk.org/")).toBe(
      "Health and Care Professions Council (HCPC) (opens in a new tab)",
    );
    expect(
      link(
        "https://babcp.com/about/raising-a-concern/babcp-complaints-declarations-and-disciplinary-procedure/",
      ),
    ).toBe(
      "British Association for Behavioural and Cognitive Psychotherapies (BABCP) (opens in a new tab)",
    );
    expect(link("https://ico.org.uk/make-a-complaint/")).toBe(
      "Information Commissioner’s Office (ICO) (opens in a new tab)",
    );
  });

  test("gives the ICO's postal address and phone number", () => {
    expect(text(main.querySelector("address"))).toBe(
      "Information Commissioner’s Office Wycliffe House Water Lane Wilmslow Cheshire SK9 5AF",
    );
    expect(link("tel:+443031231113")).toBe("0303 123 1113");
  });
});

describe("the Fees and cancellations page", () => {
  const document = page("/fees-and-cancellations/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Fees and cancellations \| /);
    expect(texts(document, "h1")).toEqual(["Fees and cancellations"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(
      /^At Horizon Psychology, fees and cancellation arrangements are outlined clearly from the outset/,
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a heading for each part, in sentence case", () => {
    expect(texts(main, "h2")).toEqual([
      "Session fees",
      "Payment",
      "Cancellation and rescheduling policy",
      "Questions about fees",
    ]);
  });

  test("lists each service's fee under Session fees", () => {
    expect(texts(main, "dd")).toEqual(
      services.map(({ price, minutes }) => `£${price} · ${minutes} minutes`),
    );
    expect(text(main.querySelector("dl")?.previousElementSibling)).toBe(
      "Session fees",
    );
  });

  test("offers new therapy clients a free introductory call", () => {
    expect(text(main)).toContain(
      "A free, no-obligation 15-minute introductory phone consultation is available for new therapy clients.",
    );
  });

  test("sets out what each late cancellation costs", () => {
    expect(texts(main, "li")).toEqual([
      "48 hours or more: No cancellation fee.",
      "Less than 48 hours’ notice: 50% of the session fee.",
      "Less than 24 hours’ notice: The full session fee.",
      "Missed appointments without notice: The full session fee.",
    ]);
  });

  test("ends with the email address for questions about fees", () => {
    expect(
      main.querySelector('a[href="mailto:hello@horizonpsychology.co.uk"]'),
    ).toHaveProperty("textContent", "hello@horizonpsychology.co.uk");
  });
});

for (const path of ["/confidentiality/", "/complaints/", "/privacy-policy/"]) {
  test(`${path} gives the email address for questions`, () => {
    expect(
      page(path).querySelector(
        'main a[href="mailto:hello@horizonpsychology.co.uk"]',
      ),
    ).not.toBeNull();
  });
}

describe("the Privacy policy page", () => {
  const document = page("/privacy-policy/");
  const main = document.querySelector("main")!;
  const link = (href: string) => text(main.querySelector(`a[href="${href}"]`));

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Privacy policy \| /);
    expect(texts(document, "h1")).toEqual(["Privacy policy"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(
      "Horizon Psychology is committed to protecting your privacy and handling your personal information with care, confidentiality and transparency.",
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a numbered heading for each section", () => {
    expect(texts(main, "h2")).toEqual([
      "1. Who is responsible for your personal information?",
      "2. Information we collect and use",
      "3. How enquiry and client information is collected, used and stored",
      "4. Where your information comes from",
      "5. Lawful bases for processing",
      "6. Who we share your personal information with",
      "7. How long we keep your information",
      "8. Your data protection rights",
      "9. How your information is protected",
      "10. Confidentiality after death",
      "11. Cookies and website usage",
      "12. Changes to this Privacy Policy",
    ]);
  });

  test("calls itself a privacy policy, never a notice", () => {
    expect(text(main)).not.toMatch(/notice/i);
  });

  test("says the website uses no cookies, and counts visits anonymously with Umami", () => {
    expect(text(main)).toContain(
      "Horizon Psychology does not use cookies on its website, and does not store anything on your device to track you.",
    );
    expect(text(main)).toContain(
      "Horizon Psychology counts visits to the website using Umami, a privacy-focused analytics service, with the information stored in the European Union.",
    );
    expect(text(main)).toContain("It is kept for six months.");
    expect(text(main)).not.toContain("does not currently use cookies");
  });

  test("says visitors can stop their visits being counted with the switch", () => {
    expect(text(main)).toContain(
      "You can stop your visits being counted at any time:",
    );
    expect(text(main)).toContain("using the switch below,");
    expect(text(main)).not.toContain("button");
  });

  test("names Umami among the website providers, and understanding the website among the legitimate interests", () => {
    expect(text(main)).toContain(
      "Umami: Counting visits to the website anonymously, with the information stored in the European Union.",
    );
    expect(text(main)).toContain(
      "administer the practice, understand how the website is used, and address complaints or legal claims",
    );
  });

  test("names the services that handle an enquiry, and says the website keeps none", () => {
    expect(text(main)).toContain(
      "When you submit the contact form, Cloudflare receives the information you enter and transmits it to Dr Emma Izon by email.",
    );
    expect(text(main)).toContain(
      "The website itself does not store or log the contents of your submission.",
    );
    expect(text(main)).toContain(
      "received in Dr Izon’s email account, which is provided by Google",
    );
  });

  test("says how long each kind of information is kept", () => {
    expect(texts(main, "li")).toEqual(
      expect.arrayContaining([
        "Clients and supervisees: Records are retained for seven years from the date of last contact.",
        expect.stringMatching(
          /^Enquiries that do not proceed: Information is retained for six months from the date of last contact/,
        ),
      ]),
    );
  });

  test("links to section 7 from section 3", () => {
    const href = main
      .querySelector('a[href^="#"]')
      ?.getAttribute("href")
      ?.slice(1);

    expect(text(document.getElementById(href!))).toBe(
      "7. How long we keep your information",
    );
  });

  test("links to the confidentiality and complaints pages", () => {
    expect(link("/confidentiality/")).toBe(
      "Horizon Psychology Confidentiality Statement",
    );
    expect(link("/complaints/")).toBe("complaints");
  });

  test("links to Articles 6 and 9 of the UK GDPR", () => {
    expect(
      link("https://www.legislation.gov.uk/eur/2016/679/article/6"),
    ).toMatch(/^Article 6 of the UK GDPR/);
    expect(
      link("https://www.legislation.gov.uk/eur/2016/679/article/9"),
    ).toMatch(/^Article 9/);
  });

  test("ends with when it was last updated", () => {
    expect(text(main.querySelector(".legal-page__body > p:last-child"))).toBe(
      "Last updated: October 2026",
    );
  });
});
