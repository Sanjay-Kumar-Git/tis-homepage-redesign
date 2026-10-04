import Link from "next/link";
import { uiCopy } from "@/data/page-content";
import { SITE_URL } from "@/data/site";
import { menuHome, navItems } from "@/data/navigation";

export function MobileMenuLinks() {
  return (
    <nav aria-label={uiCopy[0].primaryNavigation} className="mx-auto w-full max-w-xl">
      <ul className="space-y-2">
        {menuHome.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex min-h-11 items-center py-2 font-display text-3xl font-bold uppercase">{item.label}</Link>
          </li>
        ))}
        {navItems.map((item) => (
          <li key={item.label} className="border-b border-white/20 py-2">
            {item.children?.length ? (
              <details>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-display text-3xl font-bold uppercase marker:hidden">
                  {item.label}
                  <span aria-hidden="true" className="font-sans text-xl font-normal">+</span>
                </summary>
                <ul className="grid gap-1 py-2 pl-4">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link href={new URL(child.href, SITE_URL).href} className="flex min-h-11 items-center py-1 text-base font-medium">{child.label}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link href={new URL(item.href, SITE_URL).href} className="flex min-h-11 items-center font-display text-3xl font-bold uppercase">{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}