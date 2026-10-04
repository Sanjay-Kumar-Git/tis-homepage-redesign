import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { layoutCopy } from "@/data/layout";

const copy = layoutCopy[0];

export function AnnouncementBar() {
  return (
    <aside className="relative z-50 bg-accent px-4 py-1.5 text-black">
      <div className="mx-auto flex min-h-11 max-w-screen-2xl items-center justify-between gap-2">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-display text-xs font-bold uppercase">{copy.admissionsLabel}</span>
          <a className="min-h-11 content-center font-display text-sm font-bold" href={contact.helpline.href}>
            {contact.helpline.display}
          </a>
        </div>
        <Button href="#enquire" variant="ink" size="md" className="px-3 text-sm">
          {copy.enquireLabel}
        </Button>
      </div>
    </aside>
  );
}