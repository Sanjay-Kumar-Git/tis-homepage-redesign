import Image from "next/image";

interface CircleImageProps {
  src: string;
  alt: string;
  sizes: string;
  blob: string;
  priority?: boolean;
}

export function CircleImage({ src, alt, sizes, blob, priority = false }: CircleImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-full" style={{ backgroundColor: blob }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}