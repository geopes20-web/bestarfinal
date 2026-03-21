import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const BlogPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useI18n();

  const posts = [
    { titleKey: "blog.post1.title", date: "Mar 1, 2025", slug: "fue-hair-transplant-guide", category: "Hair Restoration", image: "/images/service-hair.jpg" },
    { titleKey: "blog.post2.title", date: "Feb 20, 2025", slug: "botox-vs-fillers", category: "Aesthetics", image: "/images/before-after-botox-1.jpg" },
    { titleKey: "blog.post3.title", date: "Feb 10, 2025", slug: "recovery-tips", category: "Recovery", image: "/images/before-after-hair-1.jpg" },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 start-0 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, hsl(210 75% 50%), transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{t("blog.tag")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-foreground">
              {t("blog.title1")} <span className="text-gradient-blue">{t("blog.title2")}</span>
            </h2>
            <motion.div
              className="mt-4 w-16 h-1 rounded-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <motion.div whileHover={{ x: 4 }} className="hidden md:block">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline group">
              {t("blog.viewAll")} <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14, type: "spring" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-card group-hover:shadow-elevated transition-shadow duration-500 relative">
                  <img src={post.image} alt={t(post.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />{post.date}
                  <span className="px-2 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] font-semibold">{post.category}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug text-[15px]">
                  {t(post.titleKey)}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
