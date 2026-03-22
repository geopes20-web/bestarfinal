import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";

import { lazy, Suspense } from "react";

import ProtectedRoute from "@/pages/ProtectedRoute";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import ConOnline from "./pages/ConOnline";

// ✅ Lazy Pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const BeforeAfter = lazy(() => import("./pages/BeforeAfter"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminConsultations = lazy(() => import("./pages/admin/AdminConsultations"));
const AdminAppointments = lazy(() => import("./pages/admin/AdminAppointments"));
const AdminSchedule = lazy(() => import("./pages/admin/AdminSchedule"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const Loader = () => (
  <div className="h-screen flex items-center justify-center">
    <span className="text-muted-foreground">Loading...</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>

                {/* 🔐 Admin Login */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* 🔐 Protected Admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminConsultations />} />
                  <Route path="appointments" element={<AdminAppointments />} />
                  <Route path="schedule" element={<AdminSchedule />} />
                </Route>

                {/* 🌍 Public Routes */}
                <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
                <Route path="/before-after" element={<PublicLayout><BeforeAfter /></PublicLayout>} />
                <Route path="/book-appointment" element={<PublicLayout><BookAppointment /></PublicLayout>} />
                <Route path="/consultation" element={<PublicLayout><Consultation /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
                <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
                <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
                <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
                <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
                <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
                <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
                <Route path="/cononline" element={<ConOnline />} />

              </Routes>
            </Suspense>
          </BrowserRouter>

        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;