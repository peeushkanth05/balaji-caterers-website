"use client";

import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";

export function AlertTickerMarquee() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetch("/api/header")
      .then((res) => res.json())
      .then((data) => {
        if (data.alerts) {
          setAlerts(data.alerts);
        }
      })
      .catch(console.error);
  }, []);

  if (closed || alerts.length === 0) return null;

  // Render the highest priority alert ticker
  const activeAlert = alerts[0];

  return (
    <div
      className="relative w-full overflow-hidden text-xs py-2 px-8 flex items-center gap-3 font-semibold select-none border-b border-black/5 z-50"
      style={{ backgroundColor: activeAlert.bgColor, color: activeAlert.textColor }}
    >
      <div className="flex-shrink-0 flex items-center gap-1.5 z-10 pl-2" style={{ backgroundColor: activeAlert.bgColor }}>
        <Megaphone className="w-3.5 h-3.5 animate-pulse" />
        <span className="text-[9px] uppercase font-extrabold tracking-wider bg-black/10 px-2 py-0.5 rounded">
          Latest Alert
        </span>
      </div>

      {/* Marquee scroll zone */}
      <div className="flex-1 overflow-hidden relative w-full flex items-center">
        <div
          className="whitespace-nowrap inline-block pr-[50%]"
          style={{
            animation: `marqueeAnim ${activeAlert.speed}s linear infinite`,
          }}
        >
          {activeAlert.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {activeAlert.text}
        </div>
      </div>

      <button
        onClick={() => setClosed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-transform bg-black/10 hover:bg-black/20 p-1 rounded-full z-10"
        title="Dismiss Alert"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Inject pure CSS for marquee scrolling keyframe */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeAnim {
              0% {
                transform: translate3d(100%, 0, 0);
              }
              100% {
                transform: translate3d(-100%, 0, 0);
              }
            }
          `,
        }}
      />
    </div>
  );
}
