import Link from "next/link";

export type Crumb = {
  href?: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="kicker mb-8 flex flex-wrap gap-x-3 gap-y-2">
      {items.flatMap((item, index) => {
        const last = index === items.length - 1;
        const crumb =
          item.href && !last ? (
            <Link
              key={item.label}
              href={item.href}
              className="text-muted no-underline hover:text-fg"
            >
              {item.label}
            </Link>
          ) : (
            <span key={item.label} className="text-fg">
              {item.label}
            </span>
          );

        if (index === 0) {
          return [crumb];
        }

        return [
          <span key={`${item.label}-sep`} className="text-faint" aria-hidden="true">
            /
          </span>,
          crumb,
        ];
      })}
    </nav>
  );
}
