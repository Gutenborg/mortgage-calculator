import {
  AllHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "@types/react";

export interface ButtonProps
  extends PropsWithChildren, AllHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button className="button" onClick={onClick}>{children}</button>;
};
