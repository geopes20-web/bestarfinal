import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WhatsAppButton = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 end-6 z-50"
  >
    <Link
      to="/contact"
      className="w-14 h-14 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-lg group"
      aria-label="Contact Us"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
      <span className="absolute -top-1 -end-1 w-4 h-4 bg-destructive rounded-full animate-ping" />
      <span className="absolute -top-1 -end-1 w-4 h-4 bg-destructive rounded-full" />
    </Link>
  </motion.div>
);

export default WhatsAppButton;
