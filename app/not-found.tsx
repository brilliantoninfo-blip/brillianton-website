import { Button } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center bg-ink pt-32 text-white">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div className="frame relative">
        <p className="eyebrow text-sun">404</p>
        <h1 className="display-wide mt-6 text-huge font-extrabold uppercase">
          Off the <span className="italic-serif normal-case text-sun">map.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/70">This page doesn&apos;t exist — but plenty of opportunities do.</p>
        <div className="mt-10">
          <Button href="/" variant="sun">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
