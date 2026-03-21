import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";

import ConOnline from "./pages/ConOnline";


// 🔐 رجعنا الحماية
import ProtectedRoute from "@/pages/ProtectedRoute";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import BeforeAfter from "./pages/BeforeAfter";
import BookAppointment from "./pages/BookAppointment";
import Consultation from "./pages/Consultation";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BlogPost from "./pages/BlogPost";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminConsultations from "./pages/admin/AdminConsultations";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminSchedule from "./pages/admin/AdminSchedule";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
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
          </BrowserRouter>

        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;