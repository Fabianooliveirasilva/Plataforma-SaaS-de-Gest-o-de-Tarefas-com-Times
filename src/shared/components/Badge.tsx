import { cn } from "../utils/cn";

type BadgeProps = {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
};

export function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variant === "default" &&
          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200",
        variant === "success" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
        variant === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
        variant === "danger" &&
          "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
      )}
    >
      {label}
    </span>
  );
}
