/**
 * Google Analytics & Conversion Tracking Setup
 * Add this to your index.html <head> section
 */

// Google Analytics 4 Configuration
export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Replace with your GA4 ID

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Lead generation events
export const trackLead = (source: string, propertyTitle?: string) => {
  event({
    action: 'generate_lead',
    category: 'Lead Generation',
    label: propertyTitle || source,
    value: 1
  })
}

// Property view tracking
export const trackPropertyView = (propertyTitle: string, propertyId: number) => {
  event({
    action: 'view_property',
    category: 'Property',
    label: propertyTitle,
    value: propertyId
  })
}

// Contact tracking
export const trackContact = (method: 'whatsapp' | 'phone' | 'form') => {
  event({
    action: 'contact_click',
    category: 'Contact',
    label: method,
    value: 1
  })
}

// WhatsApp click tracking
export const trackWhatsApp = () => {
  trackContact('whatsapp')
}

// Phone click tracking
export const trackPhoneCall = () => {
  trackContact('phone')
}

// Form submission tracking
export const trackFormSubmit = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'Form',
    label: formName,
    value: 1
  })
}

/**
 * Add this to your index.html <head> section:
 * 
 * <!-- Google Analytics -->
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'G-XXXXXXXXXX');
 * </script>
 * 
 * <!-- Meta Pixel Code (Facebook) -->
 * <script>
 *   !function(f,b,e,v,n,t,s)
 *   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
 *   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 *   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
 *   n.queue=[];t=b.createElement(e);t.async=!0;
 *   t.src=v;s=b.getElementsByTagName(e)[0];
 *   s.parentNode.insertBefore(t,s)}(window, document,'script',
 *   'https://connect.facebook.net/en_US/fbevents.js');
 *   fbq('init', 'YOUR_PIXEL_ID');
 *   fbq('track', 'PageView');
 * </script>
 * <noscript><img height="1" width="1" style="display:none"
 *   src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
 * /></noscript>
 */
