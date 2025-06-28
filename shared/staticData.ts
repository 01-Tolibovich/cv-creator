import { AboutData, CertificatesData, EducationData, ExperienceData, SectionData, SectionType, SkillsData, Theme, ThemeKey } from "./types";

export const SECTION_TYPES: Record<SectionType, string> = {
  experience: "Опыт работы",
  education: "Образование",
  skills: "Навыки",
  certificates: "Сертификаты",
  about: "О себе",
};

export const MOCK_DATA: Record<SectionType, SectionData> = {
  experience: {
    position: "Front End разработчик",
    company: 'ООО "ТехИнновации"',
    period: "2022 - настоящее время",
    description:
      "Разработка современных веб-приложений с использованием React, TypeScript и других передовых технологий. Участие в архитектурных решениях и оптимизации производительности.",
  } as ExperienceData,
  education: {
    institution: "МГУ им. М.В. Ломоносова",
    specialty: "Прикладная математика и информатика",
    period: "2018 - 2022",
  } as EducationData,
  skills: {
    skills: [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Docker",
      "Git",
    ],
  } as SkillsData,
  certificates: {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
  } as CertificatesData,
  about: {
    text: "Увлеченный разработчик с 3+ годами опыта создания масштабируемых веб-приложений. Постоянно изучаю новые технологии и применяю лучшие практики разработки.",
  } as AboutData,
};

export const THEMES: Record<ThemeKey, Theme> = {
  blue: { primary: "#3b82f6", secondary: "#1e40af", accent: "#eff6ff" },
  green: { primary: "#10b981", secondary: "#047857", accent: "#f0fdf4" },
  purple: { primary: "#8b5cf6", secondary: "#7c3aed", accent: "#faf5ff" },
  red: { primary: "#ef4444", secondary: "#dc2626", accent: "#fef2f2" },
};

