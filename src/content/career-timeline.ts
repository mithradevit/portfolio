/**
 * The vertical career timeline on /about — "The roles".
 *
 * One ordered list, oldest first, holding two kinds of entry:
 *
 *   `role`     a title change at Alchi. These are the spine of the timeline
 *              and always sit on the rail's right, in full-strength ink.
 *   `project`  work shipped between those title changes. Quieter, on the left,
 *              so the promotions still read as the structure.
 *
 * TODO(Mithra): the three roles below are real, taken from content/milestones.ts
 * and the resume. The project entries are the ones you said you'd send — add
 * them in date order between the roles and delete this note. Each needs at
 * minimum `date`, `year`, `title` and `description`; `image`, `meta` and `tags`
 * are optional and only change how much the hover card shows.
 */

export type CareerEntry = {
  /** "YYYY-MM". Sorts the rail; the spacing between entries stays even. */
  date: string;
  /** The large line in the label and on the card, e.g. "2024" or "Jun 2022". */
  year: string;
  title: string;
  /** Roles anchor the timeline; projects sit between them. */
  kind: "role" | "project";
  /** Card body. Say what the entry meant in practice, not what it was called. */
  description: string;
  /** Small line under the card's title — a date range, or the client. */
  meta?: string;
  /** Card pills. Keep to two or three; they wrap badly past that. */
  tags?: string[];
  /** Card image. Anything already in public/images works. */
  image?: { src: string; width: number; height: number; alt: string };
};

export const careerTimeline: CareerEntry[] = [
  {
    date: "2022-06",
    year: "Jun 2022",
    title: "UX Design Intern",
    kind: "role",
    meta: "Alchi Design Studio, Bangalore",
    description:
      "Five patient-management tools for hospitals, nurses and psychologists — real clinical surface, not intern work. Aged-care apps built around low-vision and low-confidence users lifted adoption 35%.",
  },
  {
    date: "2023-02",
    year: "Feb 2023",
    title: "UX Designer",
    kind: "role",
    meta: "Alchi Design Studio",
    description:
      "Full-time in under six months. Owned the Sanro Health CTMS end to end: physician and coordinator interviews, an EMR-integrated dashboard scoring patients against inclusion criteria in real time. 40% faster trial matching, 30% higher referral efficiency.",
  },
  {
    date: "2024-03",
    year: "Mar 2024",
    title: "Senior UX Designer",
    kind: "role",
    meta: "Alchi Design Studio",
    description:
      "Intern to Senior in roughly two years. The shift was from executing to deciding — owning design risk and UX controls against regulatory requirements, and mentoring the designers doing the work I used to do.",
  },
];
