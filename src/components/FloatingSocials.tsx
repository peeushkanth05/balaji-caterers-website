"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, Linkedin, Twitter, MessageCircle, Share2 } from "lucide-react";

export function FloatingSocials() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/header")
      .then((res) => res.json())
      .then((data) => {
        if (data.socialLinks) {
          setLinks(data.socialLinks);
        }
      })
      .catch(console.error);
  }, []);

  if (links.length === 0) return null;

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "whatsapp":
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Share2 className="w-4 h-4" />;
    }
  };

  const getColors = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return "hover:bg-blue-600 hover:text-white text-blue-600 border-blue-100 hover:border-blue-600";
      case "instagram":
        return "hover:bg-pink-600 hover:text-white text-pink-600 border-pink-100 hover:border-pink-600";
      case "youtube":
        return "hover:bg-red-600 hover:text-white text-red-600 border-red-100 hover:border-red-600";
      case "linkedin":
        return "hover:bg-blue-700 hover:text-white text-blue-700 border-blue-100 hover:border-blue-700";
      case "x":
      case "twitter":
        return "hover:bg-slate-900 hover:text-white text-slate-800 border-slate-200 hover:border-slate-900";
      case "whatsapp":
        return "hover:bg-emerald-600 hover:text-white text-emerald-600 border-emerald-100 hover:border-emerald-600";
      default:
        return "hover:bg-amber-500 hover:text-white text-slate-700 border-slate-200 hover:border-amber-500";
    }
  };

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-200/50 hover:bg-white/95 transition-all">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-white ${getColors(
            link.platform
          )}`}
          title={link.platform}
        >
          {getIcon(link.platform)}
        </a>
      ))}
    </div>
  );
}
