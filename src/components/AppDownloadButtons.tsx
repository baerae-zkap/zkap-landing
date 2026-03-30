import Image from "next/image";

interface AppDownloadButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { height: 40, width: 135 },
  md: { height: 48, width: 162 },
  lg: { height: 56, width: 189 },
};

export default function AppDownloadButtons({
  className = "",
  size = "md",
}: AppDownloadButtonsProps) {
  const { height, width } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          width={width}
          height={height}
        />
      </a>
      <a
        href="https://play.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/google-play-badge.svg"
          alt="Get it on Google Play"
          width={width}
          height={height}
        />
      </a>
    </div>
  );
}
