import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { venueLocation } from "../../data/weddingData";
import { useLanguage } from "../../contexts/LanguageContext";

export function VenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  // Simple embedded map using OpenStreetMap as fallback
  const osmMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${venueLocation.lng - 0.01}%2C${venueLocation.lat - 0.01}%2C${venueLocation.lng + 0.01}%2C${venueLocation.lat + 0.01}&layer=mapnik&marker=${venueLocation.lat}%2C${venueLocation.lng}`;

  return (
    <section
      id="venue"
      ref={ref}
      className="section-padding bg-gradient-sage"
      aria-labelledby="venue-title"
    >
      <div className="container-wedding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="venue-title"
            className="font-display text-3xl md:text-5xl text-foreground mb-4"
          >
            {t("venue.title")}
          </h2>
          <div className="divider-sage mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("venue.subtitle")}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto ${isRTL ? "lg:grid-flow-dense" : ""}`}>
          {/* Venue Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`order-2 ${isRTL ? "lg:order-2 lg:col-start-2" : "lg:order-1"}`}
          >
            <div className="card-elegant">
              <div className={`flex items-start gap-4 mb-6 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {venueLocation.name}
                  </h3>
                  <p className="text-muted-foreground">{venueLocation.address}</p>
                </div>
              </div>

              <p className={`text-muted-foreground mb-6 leading-relaxed ${isRTL ? "text-right" : ""}`}>
                {t("venue.description")}
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <a
                  href={venueLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-romantic flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  {t("venue.getDirections")}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-outline-romantic flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  {t("venue.openInMaps")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`order-1 ${isRTL ? "lg:order-1 lg:col-start-1" : "lg:order-2"}`}
          >
            <div className="rounded-lg overflow-hidden shadow-elegant aspect-[4/3]">
              <iframe
                src={osmMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${venueLocation.name}`}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Interactive map powered by OpenStreetMap
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
