import { THEMES } from "@/shared/staticData";
import {
  isAboutData,
  isCertificatesData,
  isEducationData,
  isExperienceData,
  isSkillsData,
} from "@/shared/tipgards";
import { Section, Theme } from "@/shared/types";
import { Typography } from "@/shared/ui";
import { FC, JSX } from "react";

interface PreviewProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  theme: string;
  sections: Section[];
}

export const Preview: FC<PreviewProps> = ({
  name,
  title,
  email,
  phone,
  theme,
  sections,
}) => {
  const renderPreviewSection = (section: Section): JSX.Element | null => {
    const { type, data } = section;
    const currentTheme: Theme = THEMES[theme as keyof typeof THEMES];

    switch (type) {
      case "experience":
        if (!isExperienceData(data)) return null;
        return (
          <div className="mb-6">
            <Typography as="h3">ОПЫТ РАБОТЫ</Typography>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800">
                {data.position || "Должность"}
              </h4>
              <Typography as="p">
                {data.company || "Компания"} • {data.period || "Период"}
              </Typography>
              <Typography
                as="p"
                className="mt-2 text-gray-700 text-sm leading-relaxed"
              >
                {data.description || "Описание обязанностей"}
              </Typography>
            </div>
          </div>
        );

      case "education":
        if (!isEducationData(data)) return null;
        return (
          <div className="mb-6">
            <Typography as="h3">ОБРАЗОВАНИЕ</Typography>
            <div>
              <h4 className="font-semibold text-gray-800">
                {data.institution || "Учебное заведение"}
              </h4>
              <Typography as="p">
                {data.specialty || "Специальность"}
              </Typography>
              <Typography as="p">{data.period || "Период обучения"}</Typography>
            </div>
          </div>
        );

      case "skills":
        if (!isSkillsData(data)) return null;
        return (
          <div className="mb-6">
            <Typography as="h3">НАВЫКИ</Typography>
            <div className="flex flex-wrap gap-2">
              {(data.skills && data.skills.length > 0
                ? data.skills
                : ["Навыки не указаны"]
              ).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: currentTheme.secondary,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case "certificates":
        if (!isCertificatesData(data)) return null;
        return (
          <div className="mb-6">
            <Typography as="h3">СЕРТИФИКАТЫ</Typography>
            <div>
              <h4 className="font-semibold text-gray-800">
                {data.name || "Название сертификата"}
              </h4>
              <Typography as="p">
                {data.issuer || "Организация"} • {data.date || "Дата"}
              </Typography>
            </div>
          </div>
        );

      case "about":
        if (!isAboutData(data)) return null;
        return (
          <div className="mb-6">
            <Typography as="h3">О СЕБЕ</Typography>
            <Typography as="p" className="text-gray-700 leading-relaxed">
              {data.text || "Информация о себе"}
            </Typography>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
          <Typography as="h2">Предварительный просмотр</Typography>
        </div>

        <div
          className="p-6 h-[800px] overflow-y-auto bg-white"
          style={{ fontFamily: "serif" }}
        >
          {/* Заголовок резюме */}
          <div
            className="text-center mb-8 pb-6 border-b-2"
            style={{
              borderColor: THEMES[theme as keyof typeof THEMES].primary,
            }}
          >
            <Typography as="h1" className="mb-2">
              {name}
            </Typography>
            <Typography as="p" className="text-xl text-gray-600 mb-3">
              {title}
            </Typography>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
            </div>
          </div>

          {/* Секции резюме */}
          <div className="space-y-6">
            {sections.map((section: Section) => (
              <div key={section.id}>{renderPreviewSection(section)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
