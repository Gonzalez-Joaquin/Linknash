import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import * as en from "./en"
import * as es from "./es"

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: {
      order: [
        "navigator",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain"
      ]
    },
    debug: false, //NEVER DEPLOY WITH DEBUG SET TO TRUE
    fallbackLng: "es",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          links: en.links
        }
      },
      es: {
        translation: {
          links: es.links
        }
      }
    }
  })

export default i18n
