import type { ReactNode, ElementType } from "react";

// Both languages ship in the HTML; CSS shows the one on <html data-lang>.
// Without script, English shows.
export function T({ en, es, as: Tag = "span", className }: { en: ReactNode; es: ReactNode; as?: ElementType; className?: string }) {
  return (
    <>
      <Tag lang="en" data-t="en" className={className}>{en}</Tag>
      <Tag lang="es" data-t="es" className={className}>{es}</Tag>
    </>
  );
}
