import { testimonials } from "@/data/testimonials";
import { expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./pages";

const document = page("/about/");

test("the About page has its title and heading, with Emma's credentials", () => {
  expect(document.title).toMatch(/^About Emma \| /);
  expect(texts(document, "h1")).toEqual(["Dr Emma Izon"]);
  expect(text(document.querySelector(".section-heading__subtitle"))).toBe(
    "Clinical Psychologist · DClinPsych, PhD, MSc, BSc (International)",
  );
});

test("the About page introduces Emma in her own words", () => {
  expect(texts(document, ".about__intro > p")).toEqual([
    "Dr Emma Izon is a Clinical Psychologist who trained at the University of Oxford and holds a PhD in Clinical Psychology from the University of Manchester. She has extensive experience delivering psychological assessment and therapy across national specialist and local NHS services, as well as private healthcare.",
    "Emma has particular expertise in working with psychosis, paranoia and complex psychological presentations, alongside experience supporting people experiencing anxiety, depression, stress and difficulties associated with life transitions. Her approach is trauma-informed and neurodiversity-affirming, with a focus on helping individuals understand their experiences, develop new perspectives and work towards meaningful change.",
    "Emma has undertaken additional training in enhanced Cognitive Behavioural Therapy (CBT) for psychosis and bipolar disorder. Her research interests include the at-risk mental state for psychosis and the experiences, needs and wellbeing of family members and loved ones. She values a systemic perspective, recognising the importance of relationships, family support and the wider circumstances that shape our mental health and wellbeing.",
    "Emma also has a particular interest in sport and psychological wellbeing. As a competitive netball player and high-level netball umpire, she brings personal insight into the demands of competitive sport and the psychological challenges athletes can face. She has undertaken additional learning in sport and mental health, including performance anxiety, the psychological impact of injury, athlete wellbeing and the challenges associated with transitioning out of a sporting career. She is interested in supporting athletes to navigate these challenges, manage the pressures of performance and maintain their psychological wellbeing both within and beyond sport.",
    "Emma offers a compassionate, collaborative approach, creating a safe and supportive space in which individuals can explore their experiences, make sense of emotional difficulties and develop strategies to support lasting change. Alongside her clinical work, she provides clinical and research supervision, drawing on her experience across clinical practice and research.",
  ]);
});

test("the About page shows Emma's portrait, optimised by Astro", () => {
  const portrait = document.querySelector('img[alt="Dr Emma Izon"]');

  expect(portrait?.getAttribute("src")).toMatch(/^\/_astro\/about\..+\.webp$/);
  expect(portrait?.getAttribute("srcset")).toBeTruthy();
});

test("the About page links to Emma's registration and accreditation, with their logos", () => {
  const credentials = [...document.querySelectorAll(".about__intro a")].map(
    (link) => ({
      href: link.getAttribute("href"),
      name: `${link.querySelector("img")?.getAttribute("alt")} ${text(link)}`,
      logo: link.querySelector("img")?.getAttribute("src"),
    }),
  );

  expect(credentials).toEqual([
    {
      href: "https://www.hcpc-uk.org/check-the-register/professional-registration-detail/?query=PYL043541&profession=PYL",
      name: "Health and Care Professions Council (HCPC) registered (opens in a new tab)",
      logo: expect.stringMatching(/^\/_astro\/hcpc-registered\..+\.webp$/),
    },
    {
      href: "https://www.babcp.com/",
      name: "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited (opens in a new tab)",
      logo: expect.stringMatching(/^\/_astro\/babcp-accredited\..+\.webp$/),
    },
  ]);
});

test("the About page shows each testimonial with its name, under a Testimonials eyebrow", () => {
  const section = labelled(document, "What people have said");
  const cards = [...section.querySelectorAll("figure")];

  expect(
    cards.map((card) => [
      text(card.querySelector("blockquote")),
      text(card.querySelector("figcaption")),
    ]),
  ).toEqual(testimonials.map(({ quote, name }) => [`“${quote}”`, name]));
  expect(text(section.querySelector(".eyebrow"))).toBe("Testimonials");
  expect(testimonials.map(({ name }) => name)).toEqual([
    "Sarah",
    "Aisha",
    "John",
    "Priya",
    "Alex",
    "Rachel",
    "Patrick",
    "Grace",
  ]);
});

test("the About page describes how Emma works", () => {
  const section = labelled(document, "How Emma works");

  expect(texts(section, ".approach__columns > p")).toEqual([
    "Emma believes that therapy is most effective when built on a safe, trusting and collaborative relationship. She offers a calm, confidential and non-judgemental space where clients can explore their experiences at a pace that feels right for them, without pressure or fear of judgement. Whether navigating stress, anxiety, low mood, the impact of trauma, relationship difficulties or significant life transitions, Emma works alongside clients to make sense of their experiences and find a way forward that feels meaningful to them.",
    "Her approach is compassionate, integrative and grounded in evidence-based psychological practice. Working primarily within a Cognitive Behavioural Therapy (CBT) framework, Emma draws on a range of approaches, including Mindfulness-Based CBT, Compassion-Focused Therapy (CFT), Acceptance and Commitment Therapy (ACT), systemic practices and narrative therapies. This flexible approach allows therapy to be tailored to each individual’s needs, strengths and goals. Committed to trauma-informed, neurodiversity-affirming and culturally sensitive practice, Emma combines warmth and compassionate honesty with evidence-based care to support greater self-understanding, resilience and meaningful, lasting change.",
  ]);
});

test("How Emma works has the photo of the bookshelf, optimised by Astro", () => {
  const photo = labelled(document, "How Emma works").querySelector("img");

  expect(photo?.getAttribute("alt")).toBe(
    "Psychology books, a trailing plant and succulents on a wooden shelf",
  );
  expect(photo?.getAttribute("src")).toMatch(
    /^\/_astro\/about-approach\..+\.webp$/,
  );
});

test("the About page links to the contact page and Emma's publications", () => {
  expect(link(document, "Get in touch").getAttribute("href")).toBe("/contact/");
  expect(link(document, "See publications").getAttribute("href")).toBe(
    "/research/",
  );
});
