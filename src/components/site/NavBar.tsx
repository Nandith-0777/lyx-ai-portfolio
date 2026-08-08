import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#lyx", label: "Ask Lyx" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 glass transition-colors duration-300 ${
        scrolled ? "border-b border-hairline" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5 text-[13px]">
        <a href="#top" className="font-semibold tracking-tight">
          Nandith
        </a>
        <ul className="flex items-center gap-5 text-muted-foreground sm:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
