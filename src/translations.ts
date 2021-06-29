import { translateMonth } from "./components/ChronoUnitStack/ChronoUnitStack";
import { toDayOfWeek } from "./components/DaysOfMonthCalendar/DaysOfMonthCalendar";

export type TranslationItem =
  | { type: "dayOfWeek"; value: number }
  | { type: "month"; value: number }
  | { type: "chronoUnitHeader"; value: string };

export type TranslatingFunction<T extends TranslationItem = TranslationItem> = {
  (item: T): string;
};

export const defaultTranslations = (locale: string) => {
  const headersTranslations = {
    year: {
      hr: "Godina",
      en: "Year",
      pl: "Rok",
    },
    month: {
      hr: "Mjesec",
      en: "Month",
      pl: "Miesiąc",
    },
    dayOfMonth: {
      hr: "Dan u mjesecu",
      en: "Day of month",
      pl: "Dzień miesiąca",
    },
    hour: {
      hr: "Čas",
      en: "Hour",
      pl: "Godzina",
    },
    minute: {
      hr: "Minuta",
      en: "Minute",
      pl: "Minuta",
    },
  };
  return (item: TranslationItem) => {
    if (item.type === "dayOfWeek") {
      return toDayOfWeek(locale, item.value);
    }
    if (item.type === "month") {
      return translateMonth(locale, item.value);
    }
    if (item.type === "chronoUnitHeader") {
      const translations = headersTranslations[item.value];
      if (!translations) {
        return `??${item}??`;
      }
      const translation = translations[locale.substring(0, 2)];
      if (!translation) {
        return `??${item}??`;
      }
      return translation;
    }
    return `??${item}??`;
  };
};
