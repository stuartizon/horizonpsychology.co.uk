export interface Publication {
  authors: string;
  year: number;
  title: string;
  /** Journal, with volume and pages where known. */
  journal: string;
  href?: string;
}

/** Newest first. */
export const publications: Publication[] = [
  {
    authors: "Izon, E., & Fletcher, H. K.",
    year: 2026,
    title: "“I'm not a wimp, I'm brave”.",
    journal:
      "Advances in Mental Health and Intellectual Disabilities, advance online publication",
    href: "https://doi.org/10.1108/AMHID-10-2025-0048",
  },
  {
    authors: "Izon, E., Dow, R., Collett, N., & Churchard, A.",
    year: 2026,
    title:
      "Understanding barriers to receiving psychological intervention for older persons who experience hallucinations.",
    journal: "BMC Geriatrics, advance online publication",
    href: "https://doi.org/10.1186/s12877-025-06831-7",
  },
  {
    authors: "Izon, E., Radez, J., & Knight, M. T.",
    year: 2023,
    title:
      "The psychosocial stressors of siblings of people with experiences of psychosis (SOPEP): A systematic narrative review across cultures.",
    journal: "Clinical Psychology & Psychotherapy",
  },
  {
    authors: "Radez, J., Waite, F., Izon, E., & Johns, L.",
    year: 2023,
    title:
      "Identifying individuals at risk of developing psychosis: A systematic review of the literature in primary care services.",
    journal: "Early Intervention in Psychiatry, 17(5), 429–446",
  },
  {
    authors: "Izon, E., Au-Yeung, K., Berry, K., & French, P.",
    year: 2023,
    title:
      "Service User Perceived Criticism and Warmth (SU-PCaW) Questionnaire.",
    journal: "Psychosis, 15(2), 201–210",
  },
  {
    authors: "Izon, E., & Dow, R.",
    year: 2022,
    title:
      "Treating anxiety in an older adult using internet-based cognitive behavioural therapy (iCBT): A case study.",
    journal: "FPOP Bulletin: Psychology of Older People",
    href: "https://doi.org/10.53841/bpsfpop.2022.1.158.22",
  },
  {
    authors: "Izon, E., Berry, K., Law, H., & French, P.",
    year: 2022,
    title:
      "‘If he feels better I'll feel better’: relationships with individuals at high-risk of developing psychosis.",
    journal: "Early Intervention in Psychiatry, 16(3), 231–238",
  },
  {
    authors:
      "Izon, E., Berry, K., Wearden, A., Carter, L-A., Law, H., & French, P.",
    year: 2021,
    title:
      "Investigating Expressed Emotion (EE) in individuals at-risk of developing psychosis and their families over 12 months.",
    journal: "Clinical Psychology & Psychotherapy",
  },
  {
    authors: "Izon, E., Berry, K., Law, H., Au-Yeung, K., & French, P.",
    year: 2020,
    title:
      "“I don't know how to fix it and sometimes it's so overwhelming”: Identifying the barriers and facilitators for family caregivers supporting someone at high-risk of psychosis: A qualitative study.",
    journal: "Psychosis, 12(1), 57–67",
  },
  {
    authors: "Izon, E., Berry, K., Law, H., Shiers, D., & French, P.",
    year: 2020,
    title:
      "“I don't think I took her fears seriously.” Exploring the experiences of family members of individuals at-risk of developing psychosis over 12 months.",
    journal: "Clinical Psychology & Psychotherapy",
  },
  {
    authors: "Izon, E., Au-Yeung, K., & Jones, W.",
    year: 2020,
    title:
      "The challenges of engaging individuals at high-risk of developing psychosis: reflections from research assistants within a randomised control trial.",
    journal: "Psychosis, 1–9",
  },
  {
    authors:
      "Law, H., Izon, E., Au-Yeung, K., Morrison, A. P., Byrne, R., Notley, C., … French, P.",
    year: 2019,
    title:
      "Combined individual and family therapy in comparison to treatment as usual for people at-risk of psychosis: A feasibility study (IF CBT).",
    journal: "Trial rationale, methodology and baseline characteristics",
  },
  {
    authors: "Izon, E., Berry, K., Law, H., & French, P.",
    year: 2018,
    title:
      "Expressed emotion (EE) in families of individuals at-risk of developing psychosis: A systematic review.",
    journal: "Psychiatry Research, 270, 661–672",
  },
];
