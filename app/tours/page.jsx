import { ToursListing } from "@/components/ToursListing";

export const metadata = {
  title: "Georgia Tours & Bespoke Itineraries",
  description:
    "Browse signature tours curated by Must See Georgia across Tbilisi, Kakheti, Svaneti, and beyond.",
};

export default function ToursPage() {
  return (
    <section>
      <div className="container space-y-12">
        <div className="space-y-4">
          <span className="badge">Signature tours</span>
          <h1 className="text-4xl font-display font-semibold  ">
            Georgia itineraries tailored to your pace
          </h1>
          <p className="max-w-2xl text-base  ">
            Mix and match experiences across mountains, wine valleys, and the
            Black Sea coast. Use our filters to find journeys that match your
            style, then connect with us to tailor every detail.
          </p>
        </div>
        <ToursListing />
      </div>
    </section>
  );
}
