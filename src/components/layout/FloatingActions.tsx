import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { layoutCopy } from "@/data/layout";

const copy = layoutCopy[0];

export function FloatingActions() {
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-50 flex items-center gap-2 lg:right-6">
      <Button href={contact.applyUrl} variant="primary" size="md" className="lg:hidden">
        {copy.applyLabel}
      </Button>
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.whatsappLabel}
        data-cursor="WhatsApp"
        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-black shadow-lg transition-transform hover:scale-105 focus-visible:outline-offset-4"
      >
        <MessageCircle aria-hidden size={24} />
      </a>
    </div>
  );
}