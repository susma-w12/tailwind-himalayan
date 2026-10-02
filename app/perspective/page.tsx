import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";

const items = [
  {
    src: "/perspective-carousel/city.jpg",
    title: "urban exploration",
  },
  {
    src: "/perspective-carousel/night.jpg",
    title: "night scene",
  },
  {
    src: "/perspective-carousel/flowers.jpg",
    title: "yellow wildflowers",
  },
  {
    src: "/perspective-carousel/fuji.jpg",
    title: "street with mount fuji",
  },
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