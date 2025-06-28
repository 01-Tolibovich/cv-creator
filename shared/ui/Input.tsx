import { FC } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};
