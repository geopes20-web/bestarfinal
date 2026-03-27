import { motion } from "framer-motion";

const BeforeAfter = () => {
  const images = [1, 2, 3, 4, 5, 6];

  return (
    <div className="pt-[72px]">

      {/* HERO SECTION */}
      <section className="py-20 lg:py-28 bg-gradient-hero text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Before & After Results
            </h1>

            <p className="mt-5 max-w-xl mx-auto text-white/70 text-sm md:text-base">
              نصنع الفرق بثقة، ونحوّل التغيير إلى نتائج ملموسة تعكس أعلى معايير الجودة والاحتراف.
            </p>

            <div className="mt-6 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {images.map((num, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 p-3"
              >
                <div className="bg-black/5 rounded-xl overflow-hidden flex items-center justify-center">

                  <img
                    src={`/images/${num}.jpeg`}
                    alt={`case-${num}`}
                    className="w-full h-[400px] object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </div>
  );
};

export default BeforeAfter;