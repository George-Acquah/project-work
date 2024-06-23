import { clsx } from "clsx";
import Link from "next/link";
import { inter } from "@/app/ui/font";
import { strongTextColor } from "../themes";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(inter.className, "flex text-xl md:text-2xl")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? strongTextColor
                : "text-gray-400 dark:text-gray-400"
            )}
          >
            {breadcrumbs.length > 0 && breadcrumbs.length - 1 !== index ? (
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            ) : (
              <p className="cursor-default">{breadcrumb.label}</p>
            )}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
