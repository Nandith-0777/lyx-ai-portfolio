import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { NavBar } from "@/components/site/NavBar";
import { Reveal } from "@/components/site/Reveal";
import { LyxChat } from "@/components/site/LyxChat";
import { person, projects, skillGroups, stats, summary, timeline } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nandith Narayanan — AI/ML Engineer & Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Nandith Narayanan, AI & ML student building LLM, RAG and computer vision projects. Ask Lyx, his AI assistant, anything about his work.",
      },
      { property: "og:title", content: "Nandith Narayanan — AI/ML Engineer & Portfolio" },
      {
        property: "og:description",
        content:
          "AI & ML student building LLM, RAG and computer vision projects. Ask Lyx, his AI portfolio assistant.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Section({
  id,
  eyebrow,
  title,
  children,
  tinted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={tinted ? "bg-surface" : undefined}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-32">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="headline mt-3 max-w-3xl text-[clamp(1.9rem,7vw,3.25rem)]">{title}</h2>
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen">
      <NavBar />

      <main>
        {/* Hero — Lyx front and centre */}
        <section id="lyx" className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 h-[640px] bg-[radial-gradient(55%_55%_at_50%_35%,var(--accent),transparent_70%)] opacity-80"
          />
          <div
            aria-hidden
            className="grid-fade pointer-events-none absolute inset-x-0 top-0 h-[720px]"
          />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -left-24 top-24 size-[420px] rounded-full bg-primary/25"
          />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -right-24 top-56 size-[380px] rounded-full"
            style={{ background: "color-mix(in oklab, var(--spark) 30%, transparent)", animationDelay: "3s" }}
          />
          <div className="relative mx-auto max-w-5xl px-5 pt-28 pb-16 sm:pt-40 sm:pb-24">
            <div className="text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card/70 px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground shadow-elevated backdrop-blur">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  {person.location}
                  <span className="h-3 w-px bg-hairline" />
                  Open to AI/ML internships
                </span>
                <h1 className="headline mt-6 text-[clamp(2.4rem,10vw,5.5rem)]">
                  Nandith Narayanan.
                </h1>
                <p className="headline text-gradient mt-1.5 text-[clamp(1.5rem,6.5vw,3.25rem)]">
                  Don&apos;t read the résumé. Ask it.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mx-auto mt-6 max-w-[46ch] text-balance text-[16.5px] leading-[1.7] text-muted-foreground sm:mt-7 sm:text-[18px]">
                  {summary}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <div
                  aria-hidden
                  className="mx-auto mt-9 h-px w-28 bg-gradient-to-r from-transparent via-hairline to-transparent sm:mt-11"
                />
              </Reveal>
            </div>


            <Reveal delay={200}>
              <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
                <LyxChat />
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-1 rounded-full border border-hairline bg-card px-5 py-3 text-[15px] font-medium transition-colors hover:border-primary sm:px-6"
                >
                  See the work
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-6"
                >
                  <Mail className="size-4" /> Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 text-center sm:mt-20 sm:grid-cols-3 sm:gap-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="headline text-3xl sm:text-4xl">{s.value}</dt>
                    <dd className="mt-2 text-[13px] leading-snug text-muted-foreground">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Work */}
        <Section
          id="work"
          eyebrow="Selected work"
          title="Projects that people actually use."
          tinted
        >
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 90}>
                <article className="flex h-full flex-col rounded-3xl border border-hairline bg-card p-6 shadow-elevated transition-transform duration-500 hover:-translate-y-1 sm:rounded-4xl sm:p-8">
                  <p className="eyebrow">{p.tag}</p>
                  <h3 className="headline mt-2 text-2xl">{p.name}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed">{p.impact}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-5 text-[14px] font-medium text-primary">
                    {p.github && (
                      <a
                        className="inline-flex items-center gap-1 hover:underline"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repository <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        className="inline-flex items-center gap-1 hover:underline"
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Toolkit" title="From tensors to interfaces.">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 80}>
                <div className="border-t border-hairline pt-6">
                  <h3 className="text-[15px] font-semibold tracking-tight">{g.title}</h3>
                  <ul className="mt-4 space-y-2 text-[15px] text-muted-foreground">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Journey */}
        <Section id="journey" eyebrow="Journey" title="Learning, shipping, leading." tinted>
          <div className="space-y-10 sm:space-y-12">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="grid gap-3 border-t border-hairline pt-6 sm:pt-8 md:grid-cols-[200px_1fr] md:gap-4">
                  <p className="text-[13px] text-muted-foreground">{t.period}</p>
                  <div>
                    <h3 className="headline text-xl">{t.title}</h3>
                    <p className="mt-1 text-[15px] text-muted-foreground">{t.org}</p>
                    <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>


        {/* Contact */}
        <section id="contact" className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-32">
            <Reveal>
              <p className="eyebrow">Currently</p>
              <h2 className="headline mt-3 text-[clamp(1.9rem,7vw,3.5rem)]">
                Looking for an AI/ML internship.
              </h2>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Mail className="size-4" /> {person.email}
                </a>

                <a
                  href={person.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium transition-colors hover:border-primary"
                >
                  <Github className="size-4" /> GitHub
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium transition-colors hover:border-primary"
                >
                  <Linkedin className="size-4" /> LinkedIn
                </a>

              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nandith Narayanan. {person.location}.</p>
          <p>Answers by Lyx are generated from verified portfolio data.</p>
        </div>
      </footer>
    </div>
  );
}
