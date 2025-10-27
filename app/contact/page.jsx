const faqs = [
  {
    question: 'Do you design fully bespoke itineraries?',
    answer:
      'Absolutely. The itineraries you see here are inspiration. Share your wish list and we will craft a tailor-made journey aligned with your timing, budget, and interests.'
  },
  {
    question: 'When is the best time to visit Georgia?',
    answer:
      'Spring (April–June) and autumn (September–October) offer temperate weather for both mountain hikes and vineyard experiences. Winter is perfect for wellness and ski escapes.'
  },
  {
    question: 'Can you accommodate dietary requirements?',
    answer:
      'Yes. We partner with chefs and hosts who can craft menus for vegan, vegetarian, gluten-free, and other dietary preferences—just let us know in advance.'
  }
];

export const metadata = {
  title: 'Contact Must See Georgia',
  description: 'Connect with our concierge team to start planning your bespoke journey in Georgia.'
};

export default function ContactPage() {
  return (
    <section>
      <div className="container space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <span className="badge">Let’s collaborate</span>
            <h1 className="text-4xl font-display font-semibold text-slate-900">Tell us about your ideal Georgian escape</h1>
            <p className="text-base text-slate-600">
              Complete the form to share your travel moodboard. Our concierge will be in touch within one business day to begin
              curating your custom itinerary.
            </p>
            <form className="card space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-600">
                  Full name
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-600">
                  Email
                  <input
                    type="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                Preferred travel dates
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                  placeholder="e.g. 10–20 September 2024"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                Group size
                <input
                  type="number"
                  min="1"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                  placeholder="2"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                Describe your travel style
                <textarea
                  rows="4"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                  placeholder="Wine tastings, boutique design hotels, moderate hikes..."
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                Submit enquiry
              </button>
            </form>
          </div>
          <aside className="card space-y-6 bg-slate-50/70">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Visit our atelier</h2>
              <p className="mt-2 text-sm text-slate-600">
                12 Ioane Shavteli Street, Old Tbilisi<br />
                Monday–Friday · 10:00–18:00 GET
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Call us</h3>
              <p className="mt-2 text-sm text-slate-600">+995 (32) 123 4567</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</h3>
              <p className="mt-2 text-sm text-slate-600">hello@mustseegeorgia.com</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Frequently asked</h3>
              <ul className="space-y-4">
                {faqs.map((faq) => (
                  <li key={faq.question} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
                    <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
