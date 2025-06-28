import {
  SectionData,
  ExperienceData,
  EducationData,
  SkillsData,
  CertificatesData,
  AboutData,
} from "./types";

// Типгарды
export const isExperienceData = (data: SectionData): data is ExperienceData => {
  return "position" in data && "company" in data;
};

export const isEducationData = (data: SectionData): data is EducationData => {
  return "institution" in data && "specialty" in data;
};

export const isSkillsData = (data: SectionData): data is SkillsData => {
  return "skills" in data && Array.isArray((data as SkillsData).skills);
};

export const isCertificatesData = (
  data: SectionData
): data is CertificatesData => {
  return "name" in data && "issuer" in data;
};

export const isAboutData = (data: SectionData): data is AboutData => {
  return "text" in data;
};
