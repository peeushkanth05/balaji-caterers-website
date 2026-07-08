"use client";

import { useEffect, useState } from "react";
import { Megaphone, X, ArrowRight } from "lucide-react";

export function AlertTickerMarquee() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetch("/api/header")
      .then((res) => res.json())
      .then((data) => {
        if (data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts);
        }
      })
      .catch(console.error);
  }, []);

  if (closed || alerts.length === 0) return null;

  // Use the styling of the highest priority active alert
  const primaryAlert = alerts[0];
  const bgColor = primaryAlert.bgColor || "#f59e0b";
  const textColor = primaryAlert.textColor || "#ffffff";
  const baseSpeed = primaryAlert.speed || 30;

  // Calculate speed: if more alerts, increase duration to keep it readable
  const scrollSpeed = baseSpeed * (alerts.length * 0.8);

  // Duplicate items for seamless infinite marquee loop
  const marqueeItems = [...alerts, ...alerts, ...alerts];

  return (
    <div
      className="relative w-full overflow-hidden text-xs py-2 px-8 flex items-center gap-3 font-semibold select-none border-b border-black/5 z-50 transition-all duration-300"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Ticker Icon & Title */}
      <div 
        className="flex-shrink-0 flex items-center gap-1.5 z-10 pl-2 shadow-sm rounded-md" 
        style={{ backgroundColor: bgColor }}
      >
        <Megaphone className="w-3.5 h-3.5 animate-pulse text-current" />
        <span className="text-[9px] uppercase font-extrabold tracking-wider bg-black/10 px-2 py-0.5 rounded text-current">
          Special Offer
        </span>
      </div>

      {/* Smooth scrolling Marquee container */}
      <div className="flex-1 overflow-hidden relative w-full flex items-center">
        <div
          className="whitespace-nowrap inline-block animate-marquee hover:[animation-play-state:paused] cursor-pointer"
          style={{
            animation: `marqueeAnim ${scrollSpeed}s linear infinite`,
          }}
        >
          {marqueeItems.map((item, idx) => {
            const displayContent = (
              <span className="inline-flex items-center gap-1 hover:opacity-85 transition-opacity">
                <span>{item.text}</span>
                {item.redirectUrl && <ArrowRight className="w-3 h-3 inline-block" />}
              </span>
            );

            return (
              <span key={`${item.id}-${idx}`} className="inline-block mx-10 text-current">
                {item.redirectUrl ? (
                  <a
                    href={item.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-current"
                  >
                    {displayContent}
                  </a>
                ) : (
                  displayContent
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setClosed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform bg-black/10 hover:bg-black/20 p-1.5 rounded-full z-10 text-current"
        title="Dismiss Alerts"
      >
        <X className="w-3 h-3 text-current" />
      </button>

      {/* Infinite marquee CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeAnim {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-33.33333%, 0, 0);
              }
            }
          `,
        }}
      />
    </div>
  );
}
