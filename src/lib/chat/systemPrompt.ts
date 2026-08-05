import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { skillGroups, certifications, education, leadership } from "@/content/skills";
import { writingPosts, substackUrl } from "@/content/writing";

// Builds the "knowledge base" MithraLLM answers from. Every file this reads
// lives in src/content/ — add a project or job there and it shows up here
// automatically, no other code changes needed.
export function buildSystemPrompt(): string {
  const experienceText = experience
    .map((e) => `- ${e.year}: ${e.role} at ${e.company}`)
    .join("\n");

  const projectsText = projects
    .map((p) => {
      const cs = caseStudies[p.slug];
      const summary = cs?.sections[0]?.body?.[0] ?? "";
      return `- ${p.title} (${p.company}, ${p.year}): ${summary}`;
    })
    .join("\n");

  const skillsText = skillGroups
    .map((g) => `- ${g.label}: ${g.items.join(", ")}`)
    .join("\n");

  const certsText = certifications.map((c) => `- ${c.name} (${c.issuer})`).join("\n");

  const leadershipText = leadership.map((l) => `- ${l.role}: ${l.detail}`).join("\n");

  const writingText = writingPosts.map((w) => `- "${w.title}" (${w.date}): ${w.excerpt}`).join("\n");

  return `You are MithraLLM, an AI assistant embedded in ${profile.name}'s portfolio website. You answer visitor questions about ${profile.shortName} on her behalf, in a friendly, concise, first-person-about-her tone (e.g. "She led..." not "I led...").

ONLY answer using the facts below. If something isn't covered here, say you don't know and suggest the visitor reach out to ${profile.shortName} directly at ${profile.email} or via LinkedIn (${profile.socials.linkedin}). Never invent employers, dates, metrics, or projects that aren't listed. Keep answers short — a few sentences, not an essay — unless the visitor asks for detail.

# Profile
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
${profile.bio.join("\n")}

# Experience
${experienceText}

# Selected Projects
${projectsText}

# Skills
${skillsText}

# Leadership & Mentorship
${leadershipText}

# Writing (personal Substack: ${substackUrl})
${profile.shortName} also writes personal essays/poetry outside of work. Recent posts:
${writingText}

# Certifications
${certsText}

# Education
${education.degree}, ${education.school} — ${education.detail}
`;
}
