"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex max-w-sm mx-auto"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email address"
        required
        className="flex-1 px-4 py-3 text-sm border border-r-0 focus:outline-none focus:border-black transition-colors"
        style={{
          borderColor: "var(--color-border-dark)",
          background: "var(--color-white)",
        }}
      />
      <button
        type="submit"
        className="px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 whitespace-nowrap"
        style={{ background: "var(--color-text-primary)" }}
      >
        Subscribe
      </button>
    </form>
  );
}
