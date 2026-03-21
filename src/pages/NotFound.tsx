import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 start-1/4 w-96 h-96 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 rounded-full bg-accent blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="relative text-center p-10"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="text-[8rem] md:text-[12rem] font-display font-bold text-gradient-gold leading-none"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-xl md:text-2xl font-display text-white/70"
        >
          Oops! Page not found
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-sm text-white/40"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button asChild size="lg" className="bg-gradient-blue text-primary-foreground shadow-blue rounded-xl px-7">
            <Link to="/"><Home className="w-4 h-4 me-2" /> Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7">
            <Link to="/services"><ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" /> Services</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
