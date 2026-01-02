import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion.tsx";
import { useLanguage } from "../../contexts/LanguageContext";

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  // Get FAQ items from translations
  const faqItems = t("faq.items") as unknown as Array<{ question: string; answer: string }>;

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding bg-background"
      aria-labelledby="faq-title"
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
            id="faq-title"
            className="font-display text-3xl md:text-5xl text-foreground mb-4"
          >
            {t("faq.title")}
          </h2>
          <div className="divider-sage mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {Array.isArray(faqItems) && faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-elegant border-none px-6 py-2"
              >
                <AccordionTrigger className={`text-left font-display text-lg text-foreground hover:text-primary hover:no-underline py-4 ${isRTL ? "text-right flex-row-reverse" : ""}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground pb-4 leading-relaxed ${isRTL ? "text-right" : ""}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
