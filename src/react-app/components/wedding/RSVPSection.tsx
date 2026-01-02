import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Heart } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useLanguage } from "../../contexts/LanguageContext";
import emailjs from "emailjs-com";

/* ---------------- Schema ---------------- */

const rsvpSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  attendance: z.enum(["yes", "no"], {
    required_error: "Please select your attendance",
  }),
  guestCount: z.string().optional(),
  dietaryRestrictions: z.string().max(500).optional(),
  message: z.string().max(1000).optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

/* ---------------- Component ---------------- */

export function RSVPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  });

  const attendance = watch("attendance");

  /* ---------------- Submit ---------------- */

  const onSubmit = async (data: RSVPFormData) => {
    try {
      await emailjs.send(
          "wedding_mail_service",   // EmailJS Gmail service
          "template_0htfydc",  // EmailJS template
          {
            name: data.name,
            email: data.email,
            attendance: data.attendance,
            guestCount: data.guestCount || "N/A",
            dietaryRestrictions: data.dietaryRestrictions || "None",
            message: data.message || "No message",
          },
          "MsbgMFDXTBEGgz2xE"
      );

      setIsSubmitted(true);

      toast({
        title: t("rsvp.success.title"),
        description:
            data.attendance === "yes"
                ? t("rsvp.success.message")
                : t("rsvp.success.declined"),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send RSVP. Please try again.",
        variant: "destructive",
      });
    }
  };

  /* ---------------- UI ---------------- */

  return (
      <section
          id="rsvp"
          ref={ref}
          className="section-padding bg-gradient-romantic"
          aria-labelledby="rsvp-title"
      >
        <div className="container-wedding">

          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
          >
            <h2
                id="rsvp-title"
                className="font-display text-3xl md:text-5xl text-foreground mb-4"
            >
              {t("rsvp.title")}
            </h2>
            <div className="divider-sage mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("rsvp.subtitle")}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto"
          >
            {isSubmitted ? (
                <div className="card-elegant text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl mb-4">
                    {t("rsvp.success.title")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("rsvp.success.message")}
                  </p>
                  <Heart className="w-6 h-6 text-blush-dark mx-auto animate-pulse-soft" />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`card-elegant space-y-6 ${isRTL ? "text-right" : ""}`}
                >

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("rsvp.form.name")} *
                    </label>
                    <input
                        {...register("name")}
                        className={`input-romantic ${isRTL ? "text-right" : ""}`}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("rsvp.form.email")} *
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`input-romantic ${isRTL ? "text-right" : ""}`}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                    )}
                  </div>

                  {/* Attendance */}
                  <fieldset>
                    <legend className="text-sm font-medium mb-3">
                      {t("rsvp.form.attending")} *
                    </legend>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" value="yes" {...register("attendance")} />
                        {t("rsvp.form.yes")}
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" value="no" {...register("attendance")} />
                        {t("rsvp.form.no")}
                      </label>
                    </div>
                  </fieldset>

                  {/* Guests */}
                  {attendance === "yes" && (
                      <select {...register("guestCount")} className="input-romantic">
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                  )}

                  {/* Dietary */}
                  {attendance === "yes" && (
                      <input
                          {...register("dietaryRestrictions")}
                          className="input-romantic"
                          placeholder={t("rsvp.form.dietaryPlaceholder")}
                      />
                  )}

                  {/* Message */}
                  <textarea
                      {...register("message")}
                      className="input-romantic min-h-[100px]"
                  />

                  {/* Submit */}
                  <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-romantic w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                        "Sending..."
                    ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("rsvp.form.submit")}
                        </>
                    )}
                  </button>
                </form>
            )}
          </motion.div>
        </div>
      </section>
  );
}
