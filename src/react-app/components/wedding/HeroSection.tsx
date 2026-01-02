import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { coupleInfo, weddingDetails } from "../../data/weddingData";
import { CountdownTimer } from "./CountdownTimer";
import { useLanguage } from "../../contexts/LanguageContext";
import heroBg from "../../assets/hero-bg.jpg";

export function HeroSection() {
  const { t } = useLanguage();

  const handleScrollToDetails = () => {
    const element = document.querySelector("#details");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wedding text-center px-4 py-20">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          {t("hero.weddingOf")}
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="divider-elegant mb-8"
        />

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-2"
        >
          {coupleInfo.partner1}
        </motion.h1>

        {/* Heart Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center my-4"
        >
          <Heart
            className="w-8 h-8 text-blush-dark fill-blush animate-pulse-soft"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8"
        >
          {coupleInfo.partner2}
        </motion.h1>

        {/* Date and Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-2 mb-8"
        >
          <p className="text-lg md:text-xl font-display italic text-foreground">
            {weddingDetails.ceremony.date}
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            {weddingDetails.ceremony.venue}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10"
        >
          <a
            href="#rsvp"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-romantic"
          >
            {t("hero.saveTheDate")}
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          onClick={handleScrollToDetails}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={t("hero.scrollDown")}
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
