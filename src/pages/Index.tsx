import { lazy, Suspense } from "react";

import HeroSection from "@/components/home/HeroSection";

// 🔥 Lazy Sections
const CircularServicesSection = lazy(() => import("@/components/home/CircularServicesSection"));
const AboutSection = lazy(() => import("@/components/home/AboutSection"));
const ServicesSection = lazy(() => import("@/components/home/ServicesSection"));
const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const BlogPreviewSection = lazy(() => import("@/components/home/BlogPreviewSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const SectionLoader = () => (
  <div className="py-20 text-center text-muted-foreground">
    Loading...
  </div>
);

const Index = () => {
  return (
    <>
      {/* 🔥 Hero (سريع + مهم للـ LCP) */}
      <HeroSection />

      {/* 🔥 باقي الصفحة Lazy */}
      <Suspense fallback={<SectionLoader />}>
        <CircularServicesSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </Suspense>
    </>
  );
};

export default Index;