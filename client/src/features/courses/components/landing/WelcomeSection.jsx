import { ArrowUpRightIcon, ShieldCheckIcon } from "@/shared/components/icons";
import {
  AppLink,
  Container,
  PhotoFrame,
  Reveal,
  SectionEyebrow,
} from "@/shared/components/ui";
import { legal } from "@/shared/config/footer";

// "Melbourne's Best RTO ( Registered Training organization)" → main line + quieter aside (same words).
const splitTitle = (title) => {
  const at = title.indexOf("(");
  return at > 0
    ? [
        title.slice(0, at).trim(),
        `(${title
          .slice(at + 1)
          .replace(")", "")
          .trim()})`,
      ]
    : [title];
};
// First sentence as a lead, the rest as body copy (verbatim text, only split for emphasis).
const splitLead = (text) => {
  const at = text.indexOf(". ");
  return at > 0 ? [text.slice(0, at + 1), text.slice(at + 2)] : [text];
};
const ids = legal.ids.filter((id) => /RTO|CRICOS/.test(id));

// Landing intro: framed photo with a floating accreditation badge | eyebrow, two-tier title, lead + body, CTA.
export function WelcomeSection({ welcome, enquire }) {
  const [title, aside] = splitTitle(welcome.title);
  const paragraphs = welcome.paragraphs ?? splitLead(welcome.text);

  return (
    <section
      aria-labelledby="welcome-title"
      className="relative overflow-hidden bg-surface py-16 md:py-24"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal from="left" className="relative">
          <PhotoFrame
            accent="muted"
            image={{
              ...welcome.image,
              sizes: "(min-width: 1024px) 580px, 100vw",
            }}
            aspect="aspect-4/3"
          />
          <div className="absolute -bottom-2 left-4 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-white shadow-elevated sm:left-6 md:-bottom-4">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10">
              <ShieldCheckIcon className="size-5" />
            </span>
            <span className="grid font-condensed text-sm leading-tight tracking-wide">
              {ids.map((id) => (
                <span key={id}>{id}</span>
              ))}
            </span>
          </div>
        </Reveal>

        <Reveal from="right" delay={100} className="min-w-0">
          <SectionEyebrow accent="muted">{welcome.eyebrow}</SectionEyebrow>
          <h2
            id="welcome-title"
            className="mt-5 text-3xl leading-[1.1] text-balance md:text-5xl"
          >
            {title}
            {aside && (
              <span className="mt-2 block text-xl font-semibold text-secondary-muted md:text-2xl">
                {aside}
              </span>
            )}
          </h2>
          <div className="mt-7 max-w-xl space-y-4 border-l-2 border-secondary/15 pl-5">
            {paragraphs.map((t, i) => (
              <p
                key={t.slice(0, 24)}
                className={
                  i === 0
                    ? "text-lg leading-relaxed font-medium text-secondary"
                    : "leading-relaxed text-secondary"
                }
              >
                {t}
              </p>
            ))}
          </div>
          <AppLink
            href={enquire.href}
            className="group btn-shine mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
          >
            {enquire.label}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </AppLink>
        </Reveal>
      </Container>
    </section>
  );
}
