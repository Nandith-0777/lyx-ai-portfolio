import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { href: "#lyx", label: "Ask Lyx" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled || open
            ? "glass border border-hairline shadow-elevated"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="text-[15px] font-semibold tracking-tight"
        >
          Nandith
        </a>

        <ul className="hidden items-center gap-6 text-[13px] text-muted-foreground md:flex">
          {links.slice(1).map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#lyx"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-3.5" />
            Ask Lyx
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-8 items-center justify-center rounded-full border border-hairline text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-3xl rounded-3xl border border-hairline p-2 shadow-elevated md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[16px] font-medium transition-colors hover:bg-surface"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
