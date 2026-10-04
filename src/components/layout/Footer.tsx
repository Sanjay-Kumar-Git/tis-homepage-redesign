import Image from "next/image";
import Link from "next/link";
import { footerActions, footerCopy, footerLinks, mapEmbedUrl, socialLinks } from "@/data/footer";
import { contact } from "@/data/contact";
import { logo } from "@/data/images";
import { SITE_URL } from "@/data/site";
import { mapTitle } from "@/data/page-content";

export function Footer() {
  return (
    <footer className="bg-ink pb-[calc(env(safe-area-inset-bottom)+7rem)] text-white lg:pb-12">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-12">
        <div>
          <Link href="/" aria-label="Tulas International School home" className="inline-flex min-h-11 items-center">
            <Image src={logo} alt="Tulas International School" width={88} height={88} sizes="88px" className="rounded-full" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {contact.address}
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={contact.helpline.href} className="block min-h-11 content-center">{contact.helpline.display}</a>
            {contact.landlines.map((phone) => <a key={phone.href} href={phone.href} className="block min-h-11 content-center">{phone.display}</a>)}
            <a href={`mailto:${contact.email}`} className="block min-h-11 content-center">{contact.email}</a>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.icon}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 hover:bg-white/15">
                  <Image src={`/images/icons/${social.icon}.svg`} alt="" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <iframe
            title={mapTitle[0]}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-56 w-full border-0 bg-surface"
          />
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1">
            {footerLinks.map((link) => (
              <Link key={link.label} href={new URL(link.href, SITE_URL).href} className="flex min-h-11 items-center text-sm text-white/85 hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {footerActions.map((action) => (
              <li key={action.label}>
                <Link href={action.href} className="flex min-h-12 items-center justify-between font-display text-lg font-bold uppercase hover:text-accent">
                  {action.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 border-t border-white/15 px-6 pt-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>{footerCopy[0]}</p>
        <p>{footerCopy[1]} <a href="https://netpuppys.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{footerCopy[2]}</a></p>
      </div>
    </footer>
  );
}