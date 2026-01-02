import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import { weddingDetails } from "../../data/weddingData";
import { useLanguage } from "../../contexts/LanguageContext";

export function DetailsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="details"
      ref={ref}
      className="section-padding bg-gradient-sage"
      aria-labelledby="details-title"
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
            id="details-title"
            className="font-display text-3xl md:text-5xl text-foreground mb-4"
          >
            {t("details.title")}
          </h2>
          <div className="divider-sage mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("details.subtitle")}
          </p>
        </motion.div>

        {/* Details Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Ceremony Card */}
          <motion.article variants={itemVariants} className="card-elegant">
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl text-foreground">
                {t("details.ceremony")}
              </h3>
            </div>
            <div className={`space-y-4 text-muted-foreground ${isRTL ? "text-right" : ""}`}>
              <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Clock className="w-5 h-5 mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">{weddingDetails.ceremony.date}</p>
                  <p>{weddingDetails.ceremony.time}</p>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="w-5 h-5 mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">{weddingDetails.ceremony.venue}</p>
                  <p className="text-sm">{weddingDetails.ceremony.address}</p>
                </div>
              </div>
              <p className="pt-2 border-t border-border text-sm italic">
                {weddingDetails.ceremony.description}
              </p>
            </div>
          </motion.article>

          {/* Reception Card */}
          <motion.article variants={itemVariants} className="card-elegant">
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl text-foreground">
                {t("details.reception")}
              </h3>
            </div>
            <div className={`space-y-4 text-muted-foreground ${isRTL ? "text-right" : ""}`}>
              <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Clock className="w-5 h-5 mt-0.5 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">{weddingDetails.reception.date}</p>
                  <p>{weddingDetails.reception.time}</p>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="w-5 h-5 mt-0.5 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">{weddingDetails.reception.venue}</p>
                  <p className="text-sm">{weddingDetails.reception.address}</p>
                </div>
              </div>
              <p className="pt-2 border-t border-border text-sm italic">
                {weddingDetails.reception.description}
              </p>
            </div>
          </motion.article>
        </motion.div>

        {/* Dress Code */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <div className="card-elegant inline-block">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Shirt className="w-6 h-6 text-primary" aria-hidden="true" />
              <h3 className="font-display text-xl text-foreground">{t("details.dressCode")}</h3>
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {weddingDetails.dressCode}
            </p>
            <p className="text-sm text-muted-foreground">
              {weddingDetails.dressCodeDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
