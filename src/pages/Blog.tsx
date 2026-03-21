import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Blog = () => {
  const { t, lang } = useI18n();

  const posts = [
    { titleKey: "blog.post1.title", excerptKey: "blog.post1.excerpt", date: lang === "ar" ? "1 مارس 2025" : "Mar 1, 2025", slug: "fue-hair-transplant-guide", category: lang === "ar" ? "استعادة الشعر" : "Hair Restoration" },
    { titleKey: "blog.post2.title", excerptKey: "blog.post2.excerpt", date: lang === "ar" ? "20 فبراير 2025" : "Feb 20, 2025", slug: "botox-vs-fillers", category: lang === "ar" ? "تجميل" : "Aesthetics" },
    { titleKey: "blog.post3.title", excerptKey: "blog.post3.excerpt", date: lang === "ar" ? "10 فبراير 2025" : "Feb 10, 2025", slug: "recovery-tips", category: lang === "ar" ? "التعافي" : "Recovery" },
    { titleKey: "blog.post4.title", excerptKey: "blog.post4.excerpt", date: lang === "ar" ? "25 يناير 2025" : "Jan 25, 2025", slug: "prp-science", category: lang === "ar" ? "استعادة الشعر" : "Hair Restoration" },
    { titleKey: "blog.post5.title", excerptKey: "blog.post5.excerpt", date: lang === "ar" ? "15 يناير 2025" : "Jan 15, 2025", slug: "skin-rejuvenation-options", category: lang === "ar" ? "العناية بالبشرة" : "Skin Care" },
    { titleKey: "blog.post6.title", excerptKey: "blog.post6.excerpt", date: lang === "ar" ? "5 يناير 2025" : "Jan 5, 2025", slug: "choosing-clinic", category: lang === "ar" ? "دليل" : "Guide" },
    { titleKey: "blog.post7.title", excerptKey: "blog.post7.excerpt", date: lang === "ar" ? "20 ديسمبر 2024" : "Dec 20, 2024", slug: "mesotherapy-skin", category: lang === "ar" ? "العناية بالبشرة" : "Skin Care" },
    { titleKey: "blog.post8.title", excerptKey: "blog.post8.excerpt", date: lang === "ar" ? "10 ديسمبر 2024" : "Dec 10, 2024", slug: "hair-loss-causes", category: lang === "ar" ? "استعادة الشعر" : "Hair Restoration" },
  ];

  return (
    <div className="pt-[72px]">
      
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-hero text-center relative overflow-hidden noise">
        <motion.div
          className="absolute top-1/2 end-1/3 w-72 h-72 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-0 start-1/4 w-56 h-56 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(38 42% 60%), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              {t("page.blog.tag")}
            </span>

            <h1 className="mt-4 mb-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-relaxed">
              {t("page.blog.title1")}{" "}
              <span className="text-gradient-gold">
                {t("page.blog.title2")}
              </span>
            </h1>

            <motion.div
              className="mx-auto w-16 h-1 rounded-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.4 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Cards بدون صور */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="block rounded-xl p-5 bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  
                  {/* Category */}
                  <div className="mb-3">
                    <span className="px-2 py-1 text-[10px] rounded-full bg-primary/10 text-primary font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-[16px] leading-snug text-foreground group-hover:text-primary transition-colors duration-300">
                    {t(post.titleKey)}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {t(post.excerptKey)}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>

                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                      اقرأ →
                    </span>
                  </div>

                </Link>
              </motion.div>

            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Blog;