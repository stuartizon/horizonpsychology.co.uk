import type { FaqId } from "./faqs";

export interface Service {
  /** URL slug, and the name of the service's icon in `src/icons/` and photo in `src/photos/`. */
  id: string;
  name: string;
  /** One sentence for service cards and the page description. */
  summary: string;
  /** The full description, one string per paragraph. */
  description: string[];
  /** Session fee in pounds. */
  price: number;
  /** Session length in minutes. */
  minutes: number;
  /** Short practical points, such as where sessions happen. */
  practical: string[];
  /** The questions shown on the service's page. */
  faqs: FaqId[];
  /** Alt text for the photo on the service's page, `src/photos/<id>.jpg`. */
  photoAlt: string;
}

export const services: Service[] = [
  {
    id: "individual-therapy",
    name: "Individual Therapy",
    summary:
      "Support for anxiety, low mood, trauma, stress, adjusting to change, and living with a long-term condition.",
    description: [
      "We offer personalised therapy in a warm, safe, and confidential environment, tailored to your individual needs. Our clinicians support people experiencing a wide range of difficulties, including depression, anxiety, stress, low self-esteem, adjustment to life changes as well as physical health challenges.",
      "We also provide specialist support for athletes managing injury, performance stress, and the psychological demands of sport. Together, we work towards greater understanding, resilience, and lasting positive change.",
      "Before starting therapy, we offer a free 15-minute introductory call to answer any questions and help you decide whether we're the right fit. During your initial assessment, we'll agree on a session frequency that best supports your goals.",
    ],
    price: 100,
    minutes: 50,
    practical: [
      "Free 15-minute introductory call",
      "Online or face-to-face in Buckinghamshire",
      "No referral needed",
    ],
    faqs: ["right", "firstSession", "howMany", "online"],
    photoAlt: "Emma talking with a client in armchairs, notes on the table between them",
  },
  {
    id: "couples-therapy",
    name: "Couples Therapy",
    summary:
      "For any two people working on a shared difficulty. You do not need to be in a romantic relationship.",
    description: [
      "We offer Couples Therapy in a safe, supportive, and confidential environment for any two people looking to improve their relationship or work through a shared difficulty — you do not need to be in a romantic relationship.",
      "Using evidence-based systemic and cognitive behavioural approaches, we help you understand the patterns within your relationship, improve communication, navigate conflict, and strengthen your connection.",
      "Most sessions are attended together, although individual sessions may be offered where appropriate and agreed by all parties. During your initial assessment, we'll discuss your goals and recommend a session frequency that best supports your progress.",
    ],
    price: 120,
    minutes: 60,
    practical: [
      "Free 15-minute introductory call",
      "Online or face-to-face in Buckinghamshire",
      "Both partners usually attend together",
    ],
    faqs: ["romantic", "bothAttend", "couplesConfidential", "online"],
    photoAlt: "Emma talking with a couple who are laughing together on a sofa",
  },
  {
    id: "clinical-supervision",
    name: "Clinical Supervision",
    summary:
      "For psychologists, CBT therapists and healthcare professionals, including those working towards accreditation.",
    description: [
      "We offer clinical supervision for psychologists, CBT therapists, and other healthcare professionals in a supportive, collaborative, and reflective environment.",
      "Supervision is provided by Dr Emma Izon, a registered Clinical Psychologist and BABCP-accredited CBT therapist, and is suitable for professionals working towards or maintaining similar professional accreditations. We offer one-off, ad hoc, and ongoing supervision tailored to your individual clinical practice and professional development.",
      "Alongside supervision, Emma offers reflective practice, training, and consultation for organisations on mental health, neurodiversity, and wellbeing.",
    ],
    price: 130,
    minutes: 60,
    practical: [
      "One-off, ad hoc or ongoing",
      "Online or face-to-face in Buckinghamshire",
      "Suitable for BABCP accreditation routes",
      "Group supervision available on request",
    ],
    faqs: ["supervisionWho", "accreditation", "groupSupervision", "supervisionCadence"],
    photoAlt: "Emma and a colleague going through notes together",
  },
  {
    id: "research-supervision",
    name: "Research Supervision",
    summary:
      "Support at any stage of a research project, from proposal and ethics through to analysis and publication.",
    description: [
      "We offer research supervision for clinicians, trainees, and researchers seeking guidance at any stage of the research process.",
      "Whether you are developing a research proposal, designing a study, analysing data, or preparing work for publication, supervision provides a collaborative space to build confidence, develop your skills, and progress your project.",
      "Emma supervises Master's and Doctoral students, and publishes in peer-reviewed journals herself, so supervision is grounded in current practice.",
    ],
    price: 120,
    minutes: 60,
    practical: [
      "Master's and Doctoral level",
      "Proposal, ethics, analysis, write-up",
      "Online or face-to-face in Buckinghamshire",
      "One-off or ongoing",
    ],
    faqs: ["researchWho", "researchStage", "researchEthics", "researchPublication"],
    photoAlt: "Emma smiling as she goes through some papers with someone at a low table",
  },
];
