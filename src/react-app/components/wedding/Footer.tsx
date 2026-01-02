import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Mail } from "lucide-react";
import { coupleInfo } from "../../data/weddingData";
import { useLanguage } from "../../contexts/LanguageContext";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <footer
      ref={ref}
      className="py-16 px-4 bg-charcoal text-cream"
      role="contentinfo"
    >
      <div className="container-wedding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Thank You Message */}
          <p className="text-sm tracking-widest uppercase text-cream/60 mb-4">
            {t("footer.thankYou")}
          </p>

          {/* Couple Names */}
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            {coupleInfo.partner1} & {coupleInfo.partner2}
          </h2>

          {/* Heart */}
          <div className="flex justify-center mb-6">
            <Heart
              className="w-6 h-6 text-blush fill-blush animate-pulse-soft"
              aria-hidden="true"
            />
          </div>

          {/* Hashtag */}
          <p className="font-display italic text-xl text-gold mb-8">
            {coupleInfo.hashtag}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="mailto:Nidal.Anouk.wedding@email.com"
              className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-cream/40">
            {t("footer.madeWith")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
