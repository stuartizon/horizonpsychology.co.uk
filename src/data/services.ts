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
  /** A link shown after the description, such as to the publications. */
  link?: { href: string; label: string };
}

export const services: Service[] = [
  {
    id: "individual-therapy",
    name: "Individual Therapy",
    summary:
      "Personalised, compassionate psychological therapy to help you navigate life's challenges, build confidence, and create meaningful change.",
    description: [
      "Horizon Psychology offers person centred psychological therapy in a warm, safe, and confidential environment, tailored to your individual needs and goals. With extensive experience in a range of psychological treatment approaches, Emma supports people to make meaningful changes, navigate difficult personal or interpersonal situations, and manage a wide range of mental health difficulties.",
      "Therapy can support difficulties including anxiety, panic, depression, low mood, stress, burnout, low self-esteem, grief and loss, relationship difficulties, and adjusting to life changes or changes in physical health. Emma can also help with building confidence, establishing healthy boundaries, managing anger, navigating separation, and coping with the demands of caring for others.",
      "Emma also offers specialist support for individuals experiencing unusual or distressing experiences, heightened feelings of threat or mistrust, or difficulties making sense of changes in their thoughts or perceptions. She supports people through significant life transitions, including parenthood, bereavement, changes in employment, and adjustments to physical health or ability.",
      "Together, we will work towards making sense of the challenges you are experiencing through a compassionate, non-judgemental approach that recognises your individual experiences and needs. We will develop practical strategies to help you manage difficulties, strengthen self-understanding and confidence, and work towards meaningful, lasting change. During your initial assessment, Emma will discuss your needs with you and agree on a session frequency that best supports you and your goals.",
    ],
    price: 100,
    minutes: 50,
    practical: [
      "Free 15-minute introductory video call",
      "Online or face-to-face sessions in Buckinghamshire",
      "No referral needed to get started",
    ],
    faqs: ["right", "firstSession", "howMany", "online"],
    photoAlt:
      "Emma smiling as she goes through some papers with someone at a low table",
  },
  {
    id: "couples-therapy",
    name: "Couples Therapy",
    summary:
      "Compassionate couples therapy to improve communication, navigate challenges, and build stronger, healthier relationships.",
    description: [
      "Horizon Psychology offers couples therapy in a safe, supportive, and confidential environment for any two people looking to improve their relationship, navigate difficulties, or better understand one another. You do not need to be in a romantic relationship to access this support.",
      "Emma takes a person-centred and systemic approach, drawing on evidence-based systemic and cognitive behavioural therapies to help you understand relationship patterns, improve communication, navigate conflict, and strengthen your connection. Her approach is informed by attachment, narrative, and systemic theories, with an emphasis on understanding each person's experiences within the wider context of their relationships and lives.",
      "Emma is a Foundation and Intermediate Systemic Practitioner, with training through the Association for Family Therapy and Systemic Practice (AFT) at the University of Oxford. Her systemic training has developed her understanding of relational dynamics, circular patterns, and narrative and solution-focused approaches, alongside a reflective, anti-discriminatory approach that considers the influence of power, identity, and wider social contexts on relationships.",
      "Sessions are usually attended together, although individual sessions may be offered where appropriate and agreed by all parties. During your initial assessment, Emma will explore your needs and goals with you and agree on a session frequency that best supports your relationship and progress.",
    ],
    price: 120,
    minutes: 60,
    practical: [
      "Free 15-minute introductory video call",
      "Online or face-to-face sessions in Buckinghamshire",
      "Sessions for any two people, not just romantic couples",
    ],
    faqs: ["romantic", "bothAttend", "couplesConfidential", "online"],
    photoAlt: "Emma talking with a couple who are laughing together on a sofa",
  },
  {
    id: "clinical-supervision",
    name: "Clinical Supervision",
    summary:
      "Person-centred clinical supervision to build confidence, reflect on practice, and support your professional growth.",
    description: [
      "Horizon Psychology offers clinical supervision for psychologists, CBT therapists, and other healthcare professionals, including those working towards professional accreditation. Supervision provides a supportive, collaborative, and reflective space to explore clinical practice, navigate challenges, develop skills, and support ongoing professional development.",
      "Emma takes a person-centred approach, tailoring supervision to each individual's needs, experience, and goals. She aims to create a space where supervisees feel supported to reflect openly, build confidence, strengthen their existing skills, and develop in areas of practice they wish to explore further. Emma has experience supervising healthcare professionals and teams, facilitating group supervision, and delivering reflective practice sessions. She has undertaken additional supervision training through the NHS and the University of Oxford and is committed to continually developing her own supervisory practice through ongoing supervision, CPD and reflection.",
      "Horizon Psychology offer one-off, ad hoc, and ongoing supervision tailored to your clinical role, experience, and professional development needs. Alongside individual and group supervision, Emma offers reflective practice, training, and consultation for organisations on mental health, neurodiversity, and wellbeing.",
    ],
    price: 130,
    minutes: 60,
    practical: [
      "One-off, ad hoc or ongoing",
      "Online or face-to-face in Buckinghamshire",
      "Group supervision available on request",
    ],
    faqs: [
      "supervisionWho",
      "accreditation",
      "groupSupervision",
      "supervisionCadence",
    ],
    photoAlt: "Emma and a colleague going through notes together",
  },
  {
    id: "research-supervision",
    name: "Research Supervision",
    summary:
      "Research supervision, mentoring and publication support to develop your ideas, build confidence, and take your research from inception to publication.",
    description: [
      "Horizon Psychology offer research supervision and mentoring for clinicians, students, trainees, and researchers across psychology, mental health, and related disciplines, from undergraduate to doctoral level. Whether you are developing a proposal, conducting literature reviews, designing a study, applying for ethics, gathering and analysing data, exploring methodologies such as single-case experimental designs, or preparing work for publication, supervision provides a collaborative space to build confidence, develop your skills, and progress your project.",
      "Emma's passion for research began early in her career as a Research Assistant, working on single-site and multisite randomised controlled trials designed to inform policy and practice across the lifespan. As a qualified Clinical Psychologist working in Early Intervention and Early Detection teams, Emma brings clinical and academic experience to her supervision. Her research interests include psychosis, prevention, family environments, caregiver needs, mental health and intersecting identities, as well as sport and wellbeing. She has experience supervising Master's and doctoral research and publishing in peer-reviewed journals using mixed-methods approaches. She enjoys all aspects of the research process, from developing ideas and gathering and analysing data to writing up findings and supporting others to build their research skills and confidence.",
    ],
    price: 120,
    minutes: 60,
    practical: [
      "Master's and Doctoral level",
      "Proposal, ethics, analysis, write-up",
      "Online or face-to-face in Buckinghamshire",
      "One-off or ongoing",
    ],
    faqs: [
      "researchWho",
      "researchStage",
      "researchEthics",
      "researchPublication",
    ],
    photoAlt:
      "Emma talking with someone in armchairs, notes on the table between them",
    link: { href: "/research/", label: "See publications" },
  },
];
