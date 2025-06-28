import { MOCK_DATA, SECTION_TYPES } from "@/shared/staticData";
import { isAboutData, isCertificatesData, isEducationData, isExperienceData, isSkillsData } from "@/shared/tipgards";
import {
  SectionType,
  Section,
  PersonalInfo,
  SectionData,
} from "@/shared/types";
import { Typography, Input } from "@/shared/ui";
import { Plus, GripVertical, Sparkles, X } from "lucide-react";
import { Dispatch, FC, JSX, RefObject, SetStateAction } from "react";

interface FormEditorProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfo>>;
  sections: Section[];
  setSections: Dispatch<SetStateAction<Section[]>>;
  setDraggedItem: Dispatch<SetStateAction<number | null>>;
  dragOverItem: RefObject<number | null>;
  draggedItem: number | null;
}

export const FormEditor: FC<FormEditorProps> = ({
  name,
  title,
  email,
  phone,
  setPersonalInfo,
  sections,
  setSections,
  setDraggedItem,
  dragOverItem,
  draggedItem,
}) => {
  const updatePersonalInfo = (
    field: keyof PersonalInfo,
    value: string
  ): void => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const addSection = (type: SectionType): void => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      data: { ...MOCK_DATA[type] },
    };
    setSections([...sections, newSection]);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDragEnd = (): void => {
    if (
      draggedItem !== null &&
      dragOverItem.current !== null &&
      draggedItem !== dragOverItem.current
    ) {
      const newSections = [...sections];
      const draggedSection = newSections[draggedItem];
      newSections.splice(draggedItem, 1);
      newSections.splice(dragOverItem.current, 0, draggedSection);
      setSections(newSections);
    }
    setDraggedItem(null);
    dragOverItem.current = null;
  };

  const updateSection = (id: string, data: SectionData): void => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, data } : section
      )
    );
  };

  const addAISuggestion = (sectionId: string, type: SectionType): void => {
    updateSection(sectionId, { ...MOCK_DATA[type] });
  };

  const deleteSection = (id: string): void => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const renderSectionForm = (section: Section): JSX.Element | null => {
    const { id, type, data } = section;

    switch (type) {
      case "experience":
        if (!isExperienceData(data)) return null;
        return (
          <div className="space-y-3">
            <Input
              placeholder="Должность"
              value={data.position || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, position: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Компания"
              value={data.company || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, company: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Период работы"
              value={data.period || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, period: e.target.value })
              }
            />
            <textarea
              placeholder="Описание обязанностей"
              value={data.description || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateSection(id, { ...data, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
            />
          </div>
        );

      case "education":
        if (!isEducationData(data)) return null;
        return (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Учебное заведение"
              value={data.institution || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, institution: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Специальность"
              value={data.specialty || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, specialty: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Период обучения"
              value={data.period || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, period: e.target.value })
              }
            />
          </div>
        );

      case "skills":
        if (!isSkillsData(data)) return null;
        return (
          <div className="space-y-3">
            <textarea
              placeholder="Навыки (каждый с новой строки)"
              value={(data.skills || []).join("\n")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateSection(id, {
                  ...data,
                  skills: e.target.value.split("\n"),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            />
          </div>
        );

      case "certificates":
        if (!isCertificatesData(data)) return null;
        return (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Название сертификата"
              value={data.name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Организация"
              value={data.issuer || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, issuer: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Дата получения"
              value={data.date || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSection(id, { ...data, date: e.target.value })
              }
            />
          </div>
        );

      case "about":
        if (!isAboutData(data)) return null;
        return (
          <div className="space-y-3">
            <textarea
              placeholder="Расскажите о себе"
              value={data.text || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateSection(id, { ...data, text: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Typography as="h2" className="font-semibold mb-4">
          Личная информация
        </Typography>
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Полное имя"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePersonalInfo("name", e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Профессия"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePersonalInfo("title", e.target.value)
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePersonalInfo("email", e.target.value)
            }
          />
          <Input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePersonalInfo("phone", e.target.value)
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography as="h2">Секции резюме</Typography>
          <div className="relative">
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                if (e.target.value) {
                  addSection(e.target.value as SectionType);
                  e.target.value = "";
                }
              }}
              className="appearance-none bg-blue-600 text-white px-4 py-2 pr-8 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <option value="">+ Добавить секцию</option>
              {Object.entries(SECTION_TYPES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <Plus className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section: Section, index: number) => (
            <div
              key={section.id}
              draggable
              onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                handleDragStart(e, index)
              }
              onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                handleDragOver(e, index)
              }
              onDragEnd={handleDragEnd}
              className={`border rounded-xl p-4 transition-all cursor-move ${
                draggedItem === index
                  ? "opacity-50 scale-95"
                  : "hover:shadow-md"
              } bg-gray-50 border-gray-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <Typography as="h3" className="font-medium">
                    {SECTION_TYPES[section.type]}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addAISuggestion(section.id, section.type)}
                    className="p-1 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                    title="AI подсказка"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {renderSectionForm(section)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
