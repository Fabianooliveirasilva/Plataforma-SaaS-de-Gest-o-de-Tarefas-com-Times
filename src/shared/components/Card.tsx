import { cn } from "../utils/cn";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  value?: string | number;
  helper?: string;
  className?: string;
  children?: ReactNode;
};

export function Card({ title, value, helper, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          {value !== undefined && (
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          )}
          {helper && <p className="mt-2 text-sm text-slate-400">{helper}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
