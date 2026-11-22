"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/primitives";

const roles = ["Student (Grades 8–12)", "Undergraduate / Postgraduate", "Young professional", "Parent", "School / College"];
const interests = ["Mission QS100", "Future Fellows", "Leadership School Finland 2026", "Institutional partnership", "Webinars & events", "Not sure yet"];

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

export default function ContactForm() {
  const params = useSearchParams();
  const pre = params.get("interest");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: roles[0],
    interest: pre && interests.includes(pre) ? pre : interests[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<"" | "whatsapp" | "email">("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k === "email" || k === "phone" ? "contact" : k]: undefined }));
  };

  const validate = () => {
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!form.email.trim() && !form.phone.trim()) er.contact = "Add an email or a phone number so we can reply.";
    else if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.contact = "That email address doesn't look right.";
    if (form.message.trim().length < 10) er.message = "Tell us a little more (at least 10 characters).";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const body = () =>
    [
      `Hello Brillianton, I'm ${form.name.trim()}.`,
      `I am: ${form.role}`,
      `Interested in: ${form.interest}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      "",
      form.message.trim(),
    ]
      .filter((l): l is string => l !== null)
      .join("\n");

  const send = (via: "whatsapp" | "email") => {
    if (!validate()) return;
    const text = body();
    const url =
      via === "whatsapp"
        ? `${site.whatsapp}?text=${encodeURIComponent(text)}`
        : `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${form.interest}`)}&body=${encodeURIComponent(text)}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self", "noopener");
    setSent(via);
  };

  const field = "mt-2 w-full rounded-2xl bg-white px-5 py-4 text-ink ring-1 ring-ink/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-royal";
  const label = "text-sm font-semibold text-ink";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="rounded-[32px] bg-white/60 p-6 ring-1 ring-ink/5 sm:p-10"
    >
      <h2 className="text-title font-semibold text-ink">Send us a note</h2>
      <p className="mt-2 text-ink/60">Your message opens in WhatsApp or your email app, ready to send — nothing is stored on this website.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={label}>
            Full name
          </label>
          <input id="name" autoComplete="name" value={form.name} onChange={set("name")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {errors.name && (
            <p id="name-err" className="mt-2 text-sm text-[#c0262d]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={field} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone / WhatsApp
          </label>
          <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={field} aria-invalid={!!errors.contact} aria-describedby="contact-help" />
        </div>
        <p id="contact-help" className={`-mt-3 text-sm sm:col-span-2 ${errors.contact ? "text-[#c0262d]" : "text-ink/50"}`}>
          {errors.contact ?? "Email or phone — at least one."}
        </p>
        <div>
          <label htmlFor="role" className={label}>
            I am a
          </label>
          <select id="role" value={form.role} onChange={set("role")} className={field}>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="interest" className={label}>
            Interested in
          </label>
          <select id="interest" value={form.interest} onChange={set("interest")} className={field}>
            {interests.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Your message
          </label>
          <textarea id="message" rows={5} value={form.message} onChange={set("message")} className={`${field} resize-y`} placeholder="Where do you want to go, and where are you today?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
          {errors.message && (
            <p id="message-err" className="mt-2 text-sm text-[#c0262d]">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button type="submit">Send via WhatsApp</Button>
        <Button variant="ghost" className="text-ink" onClick={() => send("email")}>
          Send via email
        </Button>
      </div>
      <p role="status" className="mt-6 min-h-[1.5rem] text-sm text-royal">
        {sent === "whatsapp" && "WhatsApp opened in a new tab with your message — just press send."}
        {sent === "email" && "Your email app should open with your message ready to send."}
      </p>
    </form>
  );
}
