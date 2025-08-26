import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-sm mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="opacity-80">
          © {new Date().getFullYear()} LGH Auto GmbH. Alle Rechte vorbehalten.
        </div>
        <nav className="flex items-center gap-5">
          <Link href="/impressum" className="hover:text-white underline-offset-4 hover:underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-white underline-offset-4 hover:underline">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
