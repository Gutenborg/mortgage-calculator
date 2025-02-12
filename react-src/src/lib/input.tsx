import { AllHTMLAttributes } from "@types/react";

export interface InputProps extends AllHTMLAttributes<HTMLInputElement> {
  defaultValue: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = (
  { defaultValue, label, prefix, suffix, ...props },
) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>

      <div className="internal-input-wrapper">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input defaultValue={defaultValue} {...props} />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
    </div>
  );
};
