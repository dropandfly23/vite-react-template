import { useLanguage } from "../../contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/10 hover:bg-cream/20 transition-colors text-sm font-medium"
      aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
