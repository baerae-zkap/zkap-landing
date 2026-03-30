interface AppDownloadButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "px-4 py-2.5 text-sm gap-2",
  md: "px-5 py-3 text-base gap-2.5",
  lg: "px-6 py-3.5 text-lg gap-3",
};

const iconSizeMap = {
  sm: 18,
  md: 22,
  lg: 26,
};

function AppleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.382.218-.72.61-.92z" fill="#4285F4" />
      <path d="M17.644 8.148L5.295.618C4.796.33 4.252.25 3.61 1.814L13.793 12l3.851-3.852z" fill="#34A853" />
      <path d="M3.61 22.186c.642 1.564 1.186 1.484 1.685 1.196l12.349-7.53L13.793 12 3.61 22.186z" fill="#EA4335" />
      <path d="M20.244 10.848l-2.6-1.7L13.793 12l3.851 3.852 2.6-1.7c.988-.592.988-2.712 0-3.304z" fill="#FBBC04" />
    </svg>
  );
}

export default function AppDownloadButtons({
  className = "",
  size = "md",
}: AppDownloadButtonsProps) {
  const btnClass = sizeMap[size];
  const iconSize = iconSizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center ${btnClass} bg-white border-2 border-primary-600 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors`}
      >
        <AppleIcon size={iconSize} />
        App Store
      </a>
      <a
        href="https://play.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center ${btnClass} bg-white border-2 border-primary-600 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors`}
      >
        <GooglePlayIcon size={iconSize} />
        Google Play
      </a>
    </div>
  );
}
