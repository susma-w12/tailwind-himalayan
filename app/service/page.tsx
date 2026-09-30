import ServiceCard from "@/components/ServiceCard";

const cards = [
  {
    title: "Street & Highway",
    href: "#",
    video: "/cards/street.mp4",
    hoverVideo: "/cards/street-hover.mp4",
  },
  {
    title: "Parking Lots",
    href: "#",
    video: "/cards/parking.mp4",
    hoverVideo: "/cards/parking-hover.mp4",
  },
  {
    title: "Jetvac",
    href: "#",
    video: "/cards/jetvac.mp4",
    hoverVideo: "/cards/jetvac-hover.mp4",
  },
];

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] py-16 md:py-24">
      <section className="mx-auto w-full max-w-335 px-6 lg:px-12">
        
        {/* 3-Column Card Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}