import Navbar from "@/components/navbar";
import HeroScroll from "@/components/hero-scroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroScroll />
    </main>
  );
}