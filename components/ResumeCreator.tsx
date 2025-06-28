"use client";

import React, { useState, useRef, JSX } from "react";
import {
  AboutData,
  ExperienceData,
  PersonalInfo,
  Section,
  ThemeKey,
} from "@/shared/types";
import { AdminHeader, FormEditor, Preview } from "@/widgets";

export function ResumeCreator(): JSX.Element {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "about",
      data: {
        text: "Опытный разработчик с фокусом на современные веб-технологии",
      } as AboutData,
    },
    {
      id: "2",
      type: "experience",
      data: {
        position: "Senior Front End Developer",
        company: "Tech Corp",
        period: "2022 - н.в.",
        description: "Разработка сложных веб-приложений",
      } as ExperienceData,
    },
  ]);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [theme, setTheme] = useState<ThemeKey>("blue");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Далер Абдурахимов",
    title: "Front End разработчик",
    email: "01.tolibovich@gmail.com",
    phone: "+992 985 22 33 41",
  });

  const dragOverItem = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        <AdminHeader theme={theme} setTheme={setTheme} cvRef={contentRef} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Левая панель - Редактор */}
          <FormEditor
            {...personalInfo}
            setPersonalInfo={setPersonalInfo}
            sections={sections}
            setSections={setSections}
            setDraggedItem={setDraggedItem}
            dragOverItem={dragOverItem}
            draggedItem={draggedItem}
          />

          {/* Правая панель - Превью */}
          <div ref={contentRef}>
            <Preview {...personalInfo} sections={sections} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
