import * as CookieConsent from "../vendor/cookieconsent/cookieconsent.esm.js";

const META_PIXEL_ID = "4122708018035255";
const CLARITY_PROJECT_ID = "ykghxxlzzj";
let metaPixelLoaded = false;
let clarityLoaded = false;

const hasMarketingConsent = () => CookieConsent.acceptedCategory("marketing");
const hasAnalyticsConsent = () => CookieConsent.acceptedCategory("analytics");

const loadClarity = () => {
  if (clarityLoaded || !hasAnalyticsConsent()) return;

  clarityLoaded = true;
  window.clarity = window.clarity || function clarityQueue() {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };

  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  script.dataset.consentService = "microsoft-clarity";
  document.head.appendChild(script);
};

const revokeClarityConsent = () => {
  if (!window.clarity) return;
  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });
};

const loadMetaPixel = () => {
  if (metaPixelLoaded || !hasMarketingConsent()) return;

  metaPixelLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset.consentService = "meta-pixel";
  document.head.appendChild(script);

  window.fbq = window.fbq || function metaPixelQueue() {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = window.fbq.queue || [];
  window.fbq("consent", "grant");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  if (document.body.dataset.metaContent === "consultation") {
    window.fbq("track", "ViewContent", {
      content_category: "consulenza_pmu",
      content_name: "Consulenza trucco permanente Roma",
    });
  }
};

const revokeMetaConsent = () => {
  if (window.fbq) window.fbq("consent", "revoke");
};

const syncConsent = () => {
  if (hasAnalyticsConsent()) loadClarity();
  else revokeClarityConsent();

  if (hasMarketingConsent()) loadMetaPixel();
  else revokeMetaConsent();
};

CookieConsent.run({
  revision: 2,
  cookie: {
    name: "pmuroma_consent",
    expiresAfterDays: 180,
    sameSite: "Lax",
  },
  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "bottom center",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      enabled: false,
      readOnly: false,
      services: {
        microsoft_clarity: {
          label: "Microsoft Clarity",
          onAccept: loadClarity,
          onReject: revokeClarityConsent,
          cookies: [{ name: /^_clck$|^_clsk$|^CLID$|^ANONCHK$|^MR$|^MUID$|^SM$/ }],
        },
      },
    },
    marketing: {
      enabled: false,
      readOnly: false,
      services: {
        meta_pixel: {
          label: "Meta Pixel",
          onAccept: loadMetaPixel,
          onReject: revokeMetaConsent,
          cookies: [{ name: /^_fbp|_fbc$/ }],
        },
      },
    },
  },
  language: {
    default: "it",
    translations: {
      it: {
        consentModal: {
          title: "La tua privacy conta",
          description:
            "Usiamo strumenti tecnici indispensabili. Solo con il tuo consenso attiviamo Microsoft Clarity per analizzare l'uso del sito e Meta Pixel per misurare le campagne. Puoi rifiutare senza limitazioni.",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Rifiuta",
          showPreferencesBtn: "Personalizza",
          footer: '<a href="/privacy">Privacy</a><a href="/cookie">Cookie</a>',
        },
        preferencesModal: {
          title: "Preferenze privacy",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Rifiuta",
          savePreferencesBtn: "Salva preferenze",
          closeIconLabel: "Chiudi",
          serviceCounterLabel: "Servizi",
          sections: [
            {
              title: "Scelte disponibili",
              description:
                "Puoi modificare o revocare il consenso in qualsiasi momento dal link “Preferenze cookie” nel footer.",
            },
            {
              title: "Tecnici necessari",
              description:
                "Servono a ricordare questa scelta e a garantire il funzionamento essenziale del sito.",
              linkedCategory: "necessary",
            },
            {
              title: "Analisi dell'esperienza",
              description:
                "Microsoft Clarity crea statistiche, mappe di calore e registrazioni delle interazioni per migliorare il sito. Il progetto usa il mascheramento completo dei contenuti ed è disattivato finché non accetti.",
              linkedCategory: "analytics",
            },
            {
              title: "Misurazione pubblicitaria",
              description:
                "Meta Pixel misura visite e azioni sul sito. È disattivato finché non scegli di accettarlo.",
              linkedCategory: "marketing",
            },
            {
              title: "Maggiori informazioni",
              description:
                'Consulta la <a href="/cookie">Cookie Policy</a> o scrivi a <a href="mailto:info@pmuroma.it">info@pmuroma.it</a>.',
            },
          ],
        },
      },
    },
  },
  onConsent: syncConsent,
  onChange: syncConsent,
});

const footerNav = document.querySelector(".site-footer nav");
if (footerNav && !footerNav.querySelector("[data-cookie-settings]")) {
  const settingsButton = document.createElement("button");
  settingsButton.type = "button";
  settingsButton.className = "footer-link-button";
  settingsButton.dataset.cookieSettings = "";
  settingsButton.textContent = "Preferenze cookie";
  footerNav.appendChild(settingsButton);
}

document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
  button.addEventListener("click", () => CookieConsent.showPreferences());
});

document.querySelectorAll("[data-meta-event], [data-track]").forEach((link) => {
  link.addEventListener("click", () => {
    if (hasAnalyticsConsent() && window.clarity) {
      window.clarity("event", link.dataset.track === "whatsapp" ? "whatsapp_click" : "outbound_click");
    }
    if (!hasMarketingConsent() || !window.fbq) return;
    const eventName = link.dataset.metaEvent || (link.dataset.track === "whatsapp" ? "Contact" : "ViewContent");
    window.fbq("track", eventName, {
      contact_channel: link.dataset.contactChannel || link.dataset.track || "website",
      page_path: window.location.pathname,
    });
  });
});
