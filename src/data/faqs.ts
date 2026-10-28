export interface Faq {
  question: string;
  /**
   * The answer, one string per paragraph. A phrase can link to another page,
   * written as a Markdown link: `[Privacy Policy](/privacy-policy/)`.
   */
  answer: string[];
}

export const faqs = {
  right: {
    question: "How do I know if this is right for me?",
    answer: [
      "You may not be completely sure whether therapy is right for you, and that's okay. If something feels difficult, unsettled, or hard to manage alone, therapy can provide a supportive space to make sense of your experiences and explore what might help.",
      "Emma offers a complimentary 15-minute introductory consultation where you can ask questions, share what feels important, and explore whether working together feels right for you. There is no pressure to make a decision straight away.",
    ],
  },
  next: {
    question: "What happens after I get in touch?",
    answer: [
      "After you get in touch, Emma will respond by email within five working days. Where appropriate, you will be offered a complimentary 15-minute introductory consultation to discuss your needs, ask questions, and explore whether working together feels like the right fit. If you decide to proceed, Emma will arrange your first appointment at a time that works for you.",
    ],
  },
  online: {
    question: "Do you offer online sessions?",
    answer: [
      "Yes, both online and in-person sessions are available. Online therapy is delivered securely via video call and can be a helpful option if you prefer the comfort of your own space, have a busy schedule, or are not local. In-person sessions are available in Buckinghamshire for those who prefer to meet face-to-face. Both formats offer the same level of care, confidentiality, and therapeutic support.",
    ],
  },
  confidential: {
    question: "Is therapy confidential?",
    answer: [
      "Confidentiality is central to the therapy process. Everything you share with Emma is treated with care, respect, and sensitivity, creating a safe and trusting space where you can speak openly and at your own pace.",
      "To support safe and effective practice, Emma regularly discusses her clinical work with a qualified clinical supervisor. These discussions are conducted anonymously, with identifying details removed wherever possible, to protect your privacy while supporting ongoing reflection and high standards of care.",
      "There are a small number of legal and ethical exceptions to confidentiality, particularly where there are concerns about serious risk of harm to you or others, safeguarding concerns, or where disclosure is required by law. Wherever possible, Emma will discuss these circumstances with you before sharing information.",
      "For further information about how your information is collected, stored, used, and retained, including data retention periods and your rights, please read the Horizon Psychology [Confidentiality](/confidentiality/) and [Privacy Policy](/privacy-policy/).",
    ],
  },
  gp: {
    question: "Will my GP be informed?",
    answer: [
      "Your GP will not be informed automatically that you are receiving therapy. Therapy is confidential, and information will not be shared with your GP without your consent, unless there is a legal or ethical reason to do so, such as serious concerns about your safety or the safety of others. Wherever possible, this would be discussed with you beforehand.",
      "Horizon Psychology will ask for your GP's details as part of the initial assessment. You remain in control of whether you consent to information being shared with your GP, subject to the limits of confidentiality outlined in [our policy](/confidentiality/).",
    ],
  },
  referral: {
    question: "Do I need a referral?",
    answer: [
      "No, you do not need a referral to begin therapy. You are welcome to get in touch directly to arrange an initial consultation or to ask any questions about the process.",
    ],
  },
  fees: {
    question: "What are your fees and cancellation policy?",
    answer: [
      "Fees are confirmed at the time of booking, with payment required in advance of each session. A free, no-obligation 15-minute introductory consultation is available for new therapy clients.",
      "We kindly request at least 48 hours’ notice for cancellations or rescheduling. Cancellations made with less than 48 hours’ notice incur a 50% fee, while cancellations with less than 24 hours’ notice or missed appointments without notice are charged at the full session fee. These arrangements apply to both therapy and supervision appointments. Please see [our policy](/fees-and-cancellations/) for more details.",
    ],
  },
  howMany: {
    question: "How many sessions will I need?",
    answer: [
      "There is no set number. Some people come for a short, focused piece of work; others prefer longer-term support. During your initial assessment we will agree a session frequency that supports your goals, and we review how the work is going as we go along.",
    ],
  },
  firstSession: {
    question: "What happens in a first session?",
    answer: [
      "The first session is an assessment, providing time to talk through what has been happening, what you would like to change, and any relevant history. Emma will explain her approach, answer your questions, and work collaboratively with you to agree on your goals and the frequency of sessions. There is no pressure to make any decisions straight away.",
    ],
  },
  bothAttend: {
    question:
      "In couples therapy, do both individuals need to attend every session?",
    answer: [
      "Most sessions are attended together, as the work focuses on what happens between you. Individual sessions may be offered where appropriate and agreed by all parties, and what is discussed in them is handled openly within the agreement you set at the start.",
    ],
  },
  romantic: {
    question:
      "In couples therapy, do we need to be in a romantic relationship?",
    answer: [
      "Couples therapy is available for any two people wishing to work through shared difficulties and improve their relationship, including romantic partners, family members, friends, or colleagues.",
    ],
  },
  couplesConfidential: {
    question: "How does confidentiality work with two people?",
    answer: [
      "Confidentiality is an important part of creating a safe, respectful space for both people in couples therapy. Emma aims to ensure that each person feels able to share their experiences, thoughts, and feelings openly, while recognising that couples therapy differs from individual therapy.",
      "Horizon Psychology follows a no-secrets approach to couples therapy. This means Emma will not agree to keep secrets from one partner that are significant to the relationship or directly affect the work being undertaken together. If one person shares important information individually between sessions, Emma will generally encourage them to bring this into the joint sessions in a supported and constructive way. Where necessary, Emma will work with them to consider how best to approach this conversation. Emma will not promise to keep information confidential from the other partner if doing so would compromise the therapeutic process.",
      "As with all therapy, there are legal and ethical limits to confidentiality, including circumstances involving serious risk of harm, safeguarding concerns, or legal requirements to disclose information.",
      "Emma also regularly discusses her clinical work with a qualified clinical supervisor to support safe, ethical, and effective practice. These discussions are handled with appropriate care to protect both partners' privacy.",
      "For further information about how personal information and clinical records are collected, stored, and managed, including your data protection rights, please read the Horizon Psychology [Confidentiality](/confidentiality/) and [Privacy Policy](/privacy-policy/).",
    ],
  },
  accreditation: {
    question: "Is supervision suitable for BABCP accreditation?",
    answer: [
      "Supervision is provided by a registered Clinical Psychologist and BABCP-accredited CBT therapist, and is suitable for professionals working towards or maintaining similar professional accreditations. Requirements are set by the accrediting body, so it is worth checking your route with them as you plan your supervision.",
    ],
  },
  groupSupervision: {
    question: "Do you offer group supervision?",
    answer: [
      "Yes. Group supervision is available on request, alongside reflective practice, training, and consultation for organisations on mental health, neurodiversity, and wellbeing.",
    ],
  },
  supervisionCadence: {
    question: "Can I book a one-off session?",
    answer: [
      "Yes. One-off, ad hoc, and ongoing supervision are all available, tailored to your clinical practice and professional development.",
    ],
  },
  supervisionWho: {
    question: "Who is clinical supervision for?",
    answer: [
      "Horizon Psychology offers clinical supervision for psychologists, CBT therapists, and other healthcare professionals, including those working towards professional accreditation. Supervision provides a supportive, collaborative space to reflect on clinical practice, navigate challenges, build confidence, and develop skills to support ongoing professional growth.",
    ],
  },
  researchStage: {
    question: "At what stage can supervision start?",
    answer: [
      "At any stage. Supervision covers study design and proposals, ethics applications, data collection, quantitative and qualitative analysis, academic writing, and preparing work for publication.",
    ],
  },
  researchWho: {
    question: "Who is research supervision for?",
    answer: [
      "Horizon Psychology offers research supervision and mentoring for clinicians, students, trainees, and researchers across psychology, mental health, and related disciplines, from undergraduate to doctoral level. Supervision can complement support provided by your university or institution, or help you develop a research idea independently.",
    ],
  },
  researchEthics: {
    question: "Can you help with ethics applications?",
    answer: [
      "Yes. Ethics and governance paperwork is one of the most common reasons people get in touch, and supervision can cover drafting, review, and responding to committee feedback.",
    ],
  },
  researchPublication: {
    question: "Do you support publication?",
    answer: [
      "Yes. Supervision can include structuring a manuscript, choosing a journal, responding to peer review, and planning authorship.",
    ],
  },
} satisfies Record<string, Faq>;

export type FaqId = keyof typeof faqs;

export interface FaqGroup {
  title: string;
  faqs: FaqId[];
}

/** The groups on the FAQs page, which together hold every FAQ. */
export const faqGroups: FaqGroup[] = [
  {
    title: "Before you begin therapy",
    faqs: ["right", "next", "firstSession", "referral"],
  },
  {
    title: "How therapy works",
    faqs: ["online", "howMany", "bothAttend", "romantic"],
  },
  {
    title: "Clinical supervision",
    faqs: [
      "supervisionWho",
      "accreditation",
      "groupSupervision",
      "supervisionCadence",
    ],
  },
  {
    title: "Research supervision",
    faqs: [
      "researchWho",
      "researchStage",
      "researchEthics",
      "researchPublication",
    ],
  },
  {
    title: "Fees and confidentiality",
    faqs: ["fees", "confidential", "couplesConfidential", "gp"],
  },
];
