"use client";

import { Typography } from "@/shared/ui";
import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { Download, Palette } from "lucide-react";
import { ThemeKey } from "@/shared/types";

interface AdminHeaderProps {
  theme: ThemeKey;
  setTheme: Dispatch<SetStateAction<ThemeKey>>;
  cvRef: RefObject<HTMLDivElement | null>;
}

export const AdminHeader: FC<AdminHeaderProps> = ({
  theme,
  setTheme,
  cvRef,
}) => {
  const handleDownload = async () => {
    console.log(cvRef);

    alert("Экспорт в PDF ещё не реализован");

    // const html2pdf = (await import("html2pdf.js")).default;
    // if (!cvRef.current) return;

    // html2pdf()
    //   .set({
    //     margin: 0,
    //     filename: "file.pdf",
    //     html2canvas: {
    //       scale: 2,
    //       useCORS: true,
    //       scrollY: 0, // зафиксировать скролл
    //     },
    //     jsPDF: {
    //       unit: "px",
    //       format: "a4",
    //       orientation: "portrait",
    //     },
    //   })
    //   .from(cvRef.current)
    //   .save();
  };
  return (
    <header className="mb-6 flex items-center justify-between">
      <Typography as="h1">Редактор резюме</Typography>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-gray-600" />
          <select
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTheme(e.target.value as ThemeKey)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="blue">Синий</option>
            <option value="green">Зеленый</option>
            <option value="purple">Фиолетовый</option>
            <option value="red">Красный</option>
          </select>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Скачать PDF
        </button>
      </div>
    </header>
  );
};
