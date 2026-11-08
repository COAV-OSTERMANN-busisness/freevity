import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "text" | "icon";
  href?: string;
  width?: number;
  priority?: boolean;
  className?: string;
}

const LOGO_ASSETS = {
  text: {
    src: "/brand/textual_logo.png",
    width: 180,
    height: 61,
    alt: "Frevity",
  },
  icon: {
    src: "/brand/logo-icon.png",
    width: 48,
    height: 48,
    alt: "Frevity",
  },
} as const;

export function Logo({
  variant = "text",
  href = "/",
  width,
  priority = false,
  className,
}: LogoProps) {
  const asset = LOGO_ASSETS[variant];

  const imageWidth = width ?? asset.width;
  const imageHeight = Math.round(
    asset.height * (imageWidth / asset.width),
  );

  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={imageWidth}
      height={imageHeight}
      priority={priority}
      className={className}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link
      href={href}
      aria-label="Frevity — Home"
      className="inline-flex items-center"
    >
      {image}
    </Link>
  );
}