import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Wine, Utensils, Music, Sparkles } from "lucide-react";
import { timelineEvents } from "../../data/weddingData";
import { useLanguage } from "../../contexts/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  wine: Wine,
  utensils: Utensils,
  music: Music,
  sparkles: Sparkles,
};

const eventKeys = ["ceremony", "cocktail", "dinner", "firstDance", "party"];

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="timeline"
      ref={ref}
      className="section-padding bg-background"
      aria-labelledby="timeline-title"
    >
      <div className="container-wedding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="timeline-title"
            className="font-display text-3xl md:text-5xl text-foreground mb-4"
          >
            {t("timeline.title")}
          </h2>
          <div className="divider-sage mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => {
            const IconComponent = iconMap[event.icon] || Heart;
            const isLeft = isRTL ? index % 2 !== 0 : index % 2 === 0;
            const eventKey = eventKeys[index];

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center mb-8 md:mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  } ${isRTL ? "text-right" : ""}`}
                >
                  <div
                    className={`card-elegant inline-block ${
                      isLeft ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-2 ${
                        isLeft ? "md:flex-row-reverse" : ""
                      } ${isRTL && !isLeft ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-sm font-medium text-primary">
                        {event.time}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center md:hidden">
                        <IconComponent
                          className="w-5 h-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-1">
                      {t(`timeline.events.${eventKey}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`timeline.events.${eventKey}.description`)}
                    </p>
                  </div>
                </div>

                {/* Center Icon - Desktop only */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-background border-4 border-primary items-center justify-center z-10 shadow-soft">
                  <IconComponent
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
