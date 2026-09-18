import * as CookieConsent from "../vendor/cookieconsent/cookieconsent.esm.js";

const META_PIXEL_ID = "4122708018035255";
let metaPixelLoaded = false;

const hasMarketingConsent = () => CookieConsent.acceptedCategory("marketing");

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
  if (hasMarketingConsent()) loadMetaPixel();
  else revokeMetaConsent();
};

CookieConsent.run({
  revision: 1,
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
            "Usiamo solo strumenti tecnici indispensabili. Con il tuo consenso possiamo attivare Meta Pixel per misurare le visite e migliorare le campagne. Puoi rifiutare senza limitazioni.",
          acceptAllBtn: "Accetta marketing",
          acceptNecessaryBtn: "Rifiuta",
          showPreferencesBtn: "Personalizza",
          footer: '<a href="/privacy">Privacy</a><a href="/cookie">Cookie</a>',
        },
        preferencesModal: {
          title: "Preferenze privacy",
          acceptAllBtn: "Accetta marketing",
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
    if (!hasMarketingConsent() || !window.fbq) return;
    const eventName = link.dataset.metaEvent || (link.dataset.track === "whatsapp" ? "Contact" : "ViewContent");
    window.fbq("track", eventName, {
      contact_channel: link.dataset.contactChannel || link.dataset.track || "website",
      page_path: window.location.pathname,
    });
  });
});
