export interface Testimonial {
  /** Word for word. An excerpt marks where it's cut with an ellipsis. */
  quote: string;
  /** First name only. */
  name: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I thoroughly enjoyed working with Emma and found her help invaluable. … She was understanding, insightful and brought relevant, clinical knowledge based on what could be applied to me. She worked with me, at my pace, allowing me to evaluate and observe myself with her professional guidance along the way.",
    name: "James",
  },
  {
    quote:
      "I enjoyed having a space to express my feelings and thoughts that was warm and judgement free. I had been going through a period where I didn't always have that sort of space in my day to day interactions, so it was appreciated in my sessions with Emma. I also liked the professional and clinical knowledge that Emma brought and applied, within the sessions. I could really apply many of the methods and ideas she brought, to my daily interactions, and saw a positive impact.",
    name: "Sophie",
  },
  {
    quote:
      "I very much enjoyed working with Emma. I had a very positive experience and would turn to her again in future if I was seeking support through psychology.",
    name: "Daniel",
  },
  {
    quote:
      "I had a positive experience with Emma. I feel she understands my personal approach to psychology and our sessions, and I enjoyed working with her towards my goals.",
    name: "Priya",
  },
  {
    quote:
      "Thank you very much for all of the therapy sessions, I really appreciated them and feel I have learnt so much. You lent a non judgemental ear, and safe environment whereby I felt able to express myself and open up. The advice and strategies you gave me over the course of our sessions have proved invaluable, I have already implemented some and truly they are what kept me calm in some more stressful moments.",
    name: "Laura",
  },
  {
    quote:
      "Emma created a safe and reassuring environment for my son to talk, listen and ask questions. Her focus was clearly on my son rather than him feeling it was adults talking about him or over him. She made him feel safe to talk and share when normally he is reluctant. My son felt the sessions were fun, engaging and relevant.",
    name: "Rachel",
  },
  {
    quote: "All the sessions were helpful because they were done to fit me specifically.",
    name: "Tom",
  },
  {
    quote:
      "Emma is very nice and helpful. She is funny and makes things understandable and puts them into context.",
    name: "Grace",
  },
];
