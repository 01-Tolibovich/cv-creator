export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface ExperienceData {
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationData {
  institution: string;
  specialty: string;
  period: string;
}

export interface CertificatesData {
  name: string;
  issuer: string;
  date: string;
}

export interface AboutData {
  text: string;
}

export interface SkillsData {
  skills: string[];
}

export type SectionData =
  | ExperienceData
  | EducationData
  | SkillsData
  | CertificatesData
  | AboutData;

export type SectionType =
  | "experience"
  | "education"
  | "skills"
  | "certificates"
  | "about";

export  interface Section {
  id: string;
  type: SectionType;
  data: SectionData;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

export type ThemeKey = "blue" | "green" | "purple" | "red";