import { ReactNode } from "react";
interface ButtonProps {
  label: ReactNode | string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  clasName?: any;
  type?: "button" | "submit";
  onClick?: () => void;
}
export default function Button({
  label,
  disabled,
  fullWidth,
  large,
  onClick,
  outline,
  secondary,
  type,
  clasName,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
        "rounded-full font-semibold border transition hover:bg-sky-800 disabled:cursor-not-allowed",
        
        ${fullWidth ? "w-full" : "w-fit"},
        ${secondary ? "bg-sky-700 text-black" : " bg-sky-500 text-white "}  ,
         ${large ? "text-xl px-5 py-3" : " text-md px-4 py-3"},
       ${
         outline
           ? "bg-transparent border-slate-600 text-sk-500 hover:bg-slate-800/40"
           : ""
       },
       ${clasName}
      `}
    >
      {label}
    </button>
  );
}
