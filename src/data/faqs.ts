export interface Faq {
  question: string;
  /** The answer, one string per paragraph. */
  answer: string[];
}

export const faqs = {
  right: {
    question: "How do I know if this is right for me?",
    answer: [
      "You may not be completely sure whether therapy is right for you — and that's okay. Reaching this point often means something feels difficult, unsettled, or hard to carry on your own. Therapy can offer a supportive space to slow things down, make sense of what you're experiencing, and gently explore what might help.",
      "I offer a complimentary 15-minute initial consultation where you're welcome to ask questions and share what feels important to you. This is simply a chance to see whether working together feels comfortable and right for you, with no pressure to decide straight away.",
    ],
  },
  next: {
    question: "What happens after I get in touch?",
    answer: [
      "After you get in touch, you will be contacted via email within 5 working days. This will usually include a response to your enquiry and, if helpful, the option to arrange a complimentary 15-minute consultation. This initial conversation is a chance to talk through what you're looking for, ask any questions, and see whether working together feels like a good fit.",
      "If you decide to go ahead, we will arrange your first appointment at a time that works for you.",
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
      "Yes, therapy is confidential. Everything you share is treated with care and respect, and is not discussed outside of sessions. Confidentiality is a key part of creating a safe, trusting space where you can speak freely and at your own pace.",
      "There are a small number of legal and ethical exceptions to confidentiality. These relate to situations where there may be a serious risk of harm to you or others, or where information is required by law. If anything like this were ever to arise, it would always be discussed with you first wherever possible.",
    ],
  },
  gp: {
    question: "Will my GP be informed?",
    answer: [
      "No, your GP will not be informed automatically. Therapy is confidential, and anything you share remains private unless you choose for it to be shared.",
      "The exception to this is if there were serious concerns about safety or risk, in which case this would be discussed with you wherever possible beforehand.",
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
      "Fees are as outlined at the time of booking and are payable in advance of each session. If you need to cancel or reschedule your appointment, I kindly ask for at least 48 hours' notice so that the time can be offered to someone else. Cancellations made with less than 48 hours' notice will be charged at 50% of the session fee. Cancellations made with less than 24 hours' notice, or missed appointments without notice, will be charged at the full session fee.",
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
      "The first session is an assessment. There is time to describe what has been happening, what you would like to be different, and any history that feels relevant. Emma will explain how she works, answer questions, and together you will agree what to focus on and how often to meet. Nothing has to be decided on the spot.",
    ],
  },
  bothAttend: {
    question: "Do we both need to attend every session?",
    answer: [
      "Most sessions are attended together, as the work focuses on what happens between you. Individual sessions may be offered where appropriate and agreed by all parties, and what is discussed in them is handled openly within the agreement you set at the start.",
    ],
  },
  romantic: {
    question: "Do we need to be in a romantic relationship?",
    answer: [
      "No. Couples Therapy is available for any two people wishing to work on a shared issue — partners, family members, friends, or colleagues.",
    ],
  },
  couplesConfidential: {
    question: "How does confidentiality work with two people?",
    answer: [
      "Confidentiality covers the work as a whole, and we agree at the outset how information shared in any individual session will be handled. The same legal and ethical exceptions apply: where there may be a serious risk of harm, or where information is required by law, and this would be discussed with you first wherever possible.",
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
      "Psychologists, CBT therapists, and other mental health and healthcare professionals, including those in training and those maintaining accreditation.",
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
      "Master's and Doctoral students, clinicians, trainees, and researchers seeking guidance on a project. Supervision can sit alongside supervision provided by your institution.",
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
  eyebrow: string;
  title: string;
  faqs: FaqId[];
}

/** The groups on the FAQs page, which together hold every FAQ. */
export const faqGroups: FaqGroup[] = [
  {
    eyebrow: "Getting started",
    title: "Before you begin",
    faqs: ["right", "next", "firstSession", "referral"],
  },
  {
    eyebrow: "Sessions",
    title: "How the work runs",
    faqs: ["online", "howMany", "bothAttend", "romantic"],
  },
  {
    eyebrow: "Supervision",
    title: "Clinical supervision",
    faqs: ["supervisionWho", "accreditation", "groupSupervision", "supervisionCadence"],
  },
  {
    eyebrow: "Supervision",
    title: "Research supervision",
    faqs: ["researchWho", "researchStage", "researchEthics", "researchPublication"],
  },
  {
    eyebrow: "Practical",
    title: "Fees and confidentiality",
    faqs: ["fees", "confidential", "couplesConfidential", "gp"],
  },
];
