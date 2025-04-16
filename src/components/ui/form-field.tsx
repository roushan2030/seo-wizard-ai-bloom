
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "email";
  disabled?: boolean;
  className?: string;
}

export const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      {type === "textarea" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={4}
          className={disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        />
      )}
    </div>
  );
};
