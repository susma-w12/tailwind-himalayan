// app/services/page.tsx
import { ServiceShowcase, Service } from "@/components/SeviceShowcaseCard";

const services: Service[] = [
  {
    id: "1",
    title: "Software Development",
    description:
      "Custom web and mobile apps built with modern frameworks, designed to scale with your business.",
    image: "/services/software.jpg",
    href: "/services/software-development",
    category: "Development",
  },
  {
    id: "2",
    title: "Cloud & DevOps",
    description:
      "CI/CD pipelines, infrastructure as code, and cloud migrations that keep your releases fast and reliable.",
    image: "/services/cloud.jpg",
    href: "/services/cloud-devops",
    category: "Infrastructure",
  },
  {
    id: "3",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces and design systems that look great and are easy to use.",
    image: "/services/uiux.jpg",
    href: "/services/ui-ux-design",
    category: "Design",
  },
  {
    id: "4",
    title: "Digital Marketing",
    description:
      "SEO, paid campaigns, and analytics that bring in the right traffic and turn it into customers.",
    image: "/services/digital-marketing.jpg",
    href: "/services/digital-marketing",
    category: "Marketing",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f3f1] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-3xl font-extrabold text-slate-900">
          What We Can Do Best
        </h1>
        <p className="mt-2 mb-10 text-center text-sm uppercase tracking-wide text-slate-500">
          Some genius services we provide
        </p>

        <ServiceShowcase services={services} />
      </div>
    </main>
  );
}