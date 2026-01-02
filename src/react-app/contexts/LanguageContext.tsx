import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("wedding-language");
    return (saved as Language) || "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("wedding-language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: {
      home: "Home",
      details: "Details",
      timeline: "Timeline",
      venue: "Venue",
      faq: "FAQ",
      rsvp: "RSVP",
    },
    hero: {
      weddingOf: "The Wedding of",
      saveTheDate: "Save the Date",
      scrollDown: "Scroll to discover our story",
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    details: {
      title: "Wedding Details",
      subtitle: "Join us for our special day",
      ceremony: "The Ceremony",
      reception: "The Reception",
      dressCode: "Dress Code",
    },
    timeline: {
      title: "Our Day",
      subtitle: "A timeline of celebrations",
      events: {
        ceremony: {
          title: "Ceremony",
          description: "Celebrate our union with us in a beautiful garden setting",
        },
        cocktail: {
          title: "Cocktail Hour",
          description: "Enjoy welcome drinks",
        },
        dinner: {
          title: "Dinner",
          description: "Savor a delicious farm-to-table feast",
        },
        firstDance: {
          title: "First Dance",
          description: "Our first dance as a married couple",
        },
        party: {
          title: "Party",
          description: "Party time...",
        },
      },
    },
    venue: {
      title: "The Venue",
      subtitle: "Where we'll celebrate",
      getDirections: "Get Directions",
      openInMaps: "Open in Maps",
      description : "Resting along Morocco’s Atlantic coast, Oualidia is a hidden gem where a peaceful lagoon meets the open sea. Surrounded by natural beauty and infused with the soul of Moroccan coastal life, this serene haven offers a timeless setting to celebrate love, unity, and joy."

    },
    faq: {
      title: "Questions & Answers",
      subtitle: "Everything you need to know",
      items: [
        {
          question: "What time should guests arrive?",
          answer: "We kindly ask that all guests arrive by 3:45 PM to be seated before the ceremony begins at 4:00 PM.",
        },
        {
          question: "Is there parking available?",
          answer: "Yes! Parking will be available at the venue.",
        },
        {
          question: "Can I bring a plus one?",
          answer: "Due to venue capacity, we are only able to accommodate those guests formally invited.",
        },
        {
          question: "What is the dress code?",
          answer: "We request formal attire for our celebration or traditional clothes.",
        },
        {
          question: "Will the ceremony be indoors or outdoors?",
          answer: "The ceremony will be held outdoors in the garden. We have an indoor backup in case of weather.",
        },
        {
          question: "Are children welcome?",
          answer: "Our wedding is an adults-only celebration to give everyone a chance to relax and enjoy. This rule does not apply to Aida",
        },
        {
          question: "What if I have dietary restrictions?",
          answer: "Please let us know in your RSVP, and our catering team will accommodate your needs.",
        },
        {
          question: "Can I take photos during the ceremony?",
          answer: "We kindly ask for an unplugged ceremony. Feel free to take photos during the reception!",
        },
      ],
    },
    rsvp: {
      title: "RSVP",
      subtitle: "We hope you can celebrate with us",
      form: {
        name: "Full Name",
        namePlaceholder: "Enter your full name",
        email: "Email Address",
        emailPlaceholder: "Enter your email",
        attending: "Will you be attending?",
        yes: "Joyfully Accept",
        no: "Regretfully Decline",
        guests: "Number of Guests",
        dietary: "Dietary Restrictions",
        dietaryPlaceholder: "Please list any allergies or dietary requirements",
        message: "Message for the Couple",
        messagePlaceholder: "Share your wishes or any notes...",
        submit: "Send RSVP",
        submitting: "Sending...",
      },
      success: {
        title: "Thank You!",
        message: "Your RSVP has been received. We can't wait to celebrate with you!",
        declined: "We're sorry you can't make it, but thank you for letting us know.",
      },
    },
    footer: {
      thankYou: "Thank You for Being Part of Our Story",
      madeWith: "Made with love for our special day",
    },
    music: {
      clickToPlay: "Click to Play Music",
      nowPlaying: "Now Playing",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      details: "التفاصيل",
      timeline: "البرنامج",
      venue: "المكان",
      faq: "الأسئلة",
      rsvp: "تأكيد الحضور",
    },
    hero: {
      weddingOf: "حفل زفاف",
      saveTheDate: "احفظ الموعد",
      scrollDown: "مرر للأسفل لاكتشاف قصتنا",
    },
    countdown: {
      days: "أيام",
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني",
    },
    details: {
      title: "تفاصيل الزفاف",
      subtitle: "انضموا إلينا في يومنا المميز",
      ceremony: "مراسم الزفاف",
      reception: "حفل الاستقبال",
      dressCode: "قواعد اللباس",
    },
    timeline: {
      title: "برنامج اليوم",
      subtitle: "جدول الاحتفالات",
      events: {
        ceremony: {
          title: "مراسم الزفاف",
          description: "استقبال الضيوف",
        },
        cocktail: {
          title: "المشروبات الترحيبية",
          description: "استمتعوا بالمقبلات والمشروبات الترحيبية",
        },
        dinner: {
          title: "العشاء",
          description: "تذوقوا وليمة شهية",
        },
        firstDance: {
          title: "النشاط",
          description: "الاستمتاع بأجواء الفرح",
        },
        party: {
          title: "الحفلة",
          description: "-",
        },
      },
    },
    venue: {
      title: "مكان الحفل",
      subtitle: "حيث سنحتفل",
      getDirections: "احصل على الاتجاهات",
      openInMaps: "افتح في الخرائط",
      description : "على ضفاف الساحل الأطلسي للمغرب، تتجلى الوليدية كجوهرة مخفية، حيث تعانق البحيرة الهادئة زرقة المحيط. وبين أحضان الطبيعة وروح الساحل المغربي الأصيل، تنسج هذه الواحة الهادئة أجواءً خالدة للاحتفال بالحب والانسجام والفرح."
    },
    faq: {
      title: "الأسئلة والأجوبة",
      subtitle: "كل ما تحتاج معرفته",
      items: [
        {
          question: "ما هو الوقت المناسب لوصول الضيوف؟",
          answer: "نرجو من جميع الضيوف الوصول بحلول الساعة 3:45 مساءً للجلوس قبل بدء المراسم في الساعة 4:00 مساءً.",
        },
        {
          question: "هل يتوفر موقف سيارات؟",
          answer: "نعم! ستتوفر خدمة صف السيارات المجانية في المكان.",
        },
        {
          question: "هل يمكنني إحضار مرافق؟",
          answer: "نظراً لسعة المكان، يمكننا فقط استضافة الضيوف المدعوين رسمياً.",
        },
        {
          question: "ما هو قواعد اللباس؟",
          answer: "نطلب ارتداء الملابس الرسمية. للسيدات فساتين أنيقة، وللرجال بدلات رسمية.",
        },
        {
          question: "هل ستقام المراسم في الداخل أم الخارج؟",
          answer: "ستقام المراسم في الهواء الطلق في الحديقة. لدينا مكان بديل داخلي في حالة سوء الطقس.",
        },
        {
          question: "هل الأطفال مرحب بهم؟",
          answer: "حفل زفافنا مخصص للبالغين فقط لمنح الجميع فرصة للاسترخاء والاستمتاع.",
        },
        {
          question: "ماذا لو كان لدي قيود غذائية؟",
          answer: "يرجى إبلاغنا في تأكيد الحضور، وسيقوم فريق التقديم بتلبية احتياجاتكم.",
        },
        {
          question: "هل يمكنني التقاط صور أثناء المراسم؟",
          answer: "نرجو عدم استخدام الهواتف أثناء المراسم. يمكنكم التقاط الصور خلال حفل الاستقبال!",
        },
      ],
    },
    rsvp: {
      title: "تأكيد الحضور",
      subtitle: "نأمل أن تحتفلوا معنا",
      form: {
        name: "الاسم الكامل",
        namePlaceholder: "أدخل اسمك الكامل",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        attending: "هل ستحضر؟",
        yes: "نعم، بكل سرور",
        no: "للأسف، لا أستطيع",
        guests: "عدد الضيوف",
        dietary: "القيود الغذائية",
        dietaryPlaceholder: "يرجى ذكر أي حساسية أو متطلبات غذائية",
        message: "رسالة للعروسين",
        messagePlaceholder: "شاركنا أمنياتك أو أي ملاحظات...",
        submit: "إرسال التأكيد",
        submitting: "جاري الإرسال...",
      },
      success: {
        title: "شكراً لك!",
        message: "تم استلام تأكيد حضورك. لا نستطيع الانتظار للاحتفال معك!",
        declined: "نأسف لعدم قدرتك على الحضور، لكن شكراً لإعلامنا.",
      },
    },
    footer: {
      thankYou: "شكراً لكونكم جزءاً من قصتنا",
      madeWith: "صُنع بحب ليومنا المميز",
    },
    music: {
      clickToPlay: "اضغط لتشغيل الموسيقى",
      nowPlaying: "يعمل الآن",
    },
  },
};
