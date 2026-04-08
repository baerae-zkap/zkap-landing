/**
 * Unified exchange card used across all sections.
 * Vertical card: logo top-left, balance bottom-left, brand bg color.
 */

interface ExchangeCardProps {
  label: string;
  color: string;
  logo: string;
  balance?: string;
  sub?: string;
  className?: string;
  style?: React.CSSProperties;
  ghost?: boolean;
  locked?: boolean;
}

export default function ExchangeCard({
  label,
  color,
  logo,
  balance,
  sub,
  className = "",
  style,
  ghost = false,
  locked = false,
}: ExchangeCardProps) {
  if (ghost) {
    return (
      <div
        className={`rounded-2xl ${className}`}
        style={{
          width: 140,
          height: 175,
          backgroundColor: "#eef0f4",
          border: "1px solid #e0e3e8",
          ...style,
        }}
      />
    );
  }

  // Detect light background for text color
  const isLight = color === "#ffffff" || color === "#fff";
  const textColor = isLight ? "#333d4b" : "#ffffff";
  const subColor = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)";

  return (
    <div
      className={`rounded-2xl overflow-hidden relative ${className}`}
      style={{
        width: 140,
        height: 175,
        backgroundColor: color,
        border: isLight ? "1px solid #e0e3e8" : "none",
        ...style,
      }}
    >
      {/* Logo — top left */}
      <div className="absolute top-3 left-3">
        <img
          src={logo}
          alt={label}
          className="w-9 h-9 rounded-lg object-cover"
        />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-3 left-3 right-3">
        {locked ? (
          <div className="text-[13px] font-bold" style={{ color: textColor }}>
            연결하기 →
          </div>
        ) : (
          <>
            {balance && (
              <div className="text-[15px] font-bold leading-tight" style={{ color: textColor }}>
                {balance}
              </div>
            )}
            <div className="text-[11px] font-medium mt-0.5" style={{ color: subColor }}>
              {sub || label}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export type { ExchangeCardProps };
