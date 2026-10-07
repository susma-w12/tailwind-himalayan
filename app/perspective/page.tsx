import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";

const items = [
  { src: "/perspective-carousel/city.jpg", title: "urban exploration", description: "Wandering through busy plazas and old streets." },
  { src: "/perspective-carousel/night.jpg", title: "night scene", description: "A full moon behind bare winter branches." },
  { src: "/perspective-carousel/flowers.jpg", title: "yellow wildflowers", description: "A meadow in full bloom." },
  { src: "/perspective-carousel/fuji.jpg", title: "street with mount fuji", description: "Snow-capped Fuji at the end of the road." },
];

export default function PerspectivePage() {
  return (
    <main className="min-h-screen">
      <PerspectiveCarousel
        items={items}
        defaultActiveIndex={2}
        slideWidth={210}
        className="h-140 bg-[#ececec] text-neutral-800"
      />
    </main>
  );
}