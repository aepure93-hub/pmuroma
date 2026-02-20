import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    const analyticsConsent = localStorage.getItem('analytics-consent');
    
    if (analyticsConsent === 'true') {
      // Initialize Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer!.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure'
      });
    }
  }, []);

  const trackEvent = (action: string, category: string, label?: string) => {
    const analyticsConsent = localStorage.getItem('analytics-consent');
    
    if (analyticsConsent === 'true' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  const trackPageView = (path: string) => {
    const analyticsConsent = localStorage.getItem('analytics-consent');
    
    if (analyticsConsent === 'true' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
      });
    }
  };

  return { trackEvent, trackPageView };
};
