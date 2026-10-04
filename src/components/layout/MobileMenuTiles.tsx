import Image from "next/image";
import Link from "next/link";
import { menuTiles } from "@/data/navigation";
import { SITE_URL } from "@/data/site";

export function MobileMenuTiles() {
  return (
    <nav aria-label={menuTiles[0].label} className="mx-auto grid w-full max-w-xl grid-cols-2 gap-3">
      {menuTiles.map((tile) => (
        <Link key={tile.label} href={new URL(tile.href, SITE_URL).href} className="group relative min-h-36 overflow-hidden rounded-sm bg-ink">
          <Image src={tile.image} alt={tile.alt} fill sizes="(max-width: 767px) 44vw, 18rem" className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105" />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-8 font-display text-base font-bold uppercase text-white">{tile.label}</span>
        </Link>
      ))}
    </nav>
  );
}