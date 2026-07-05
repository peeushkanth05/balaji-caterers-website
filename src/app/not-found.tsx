import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-serif font-bold text-amber-500">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-slate-400 text-sm">
          The page or portfolio item you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
