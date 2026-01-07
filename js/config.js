// js/config.js
const siteConfig = {
  whatsappNumber: "27764354173",
  phoneNumber: "+27764354173",
  emergencyNumber: "+27813856324",
  email: "info@lowveldinstitute.co.za",
  address: "Bester Brown Building, Paul Kruger Street, Mbombela Central, 1201",
  whatsappMessage:
    "Hello Lowveld Institute, I'd like more information about your programs",
};

// Generate WhatsApp URL
function getWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

// Generate phone link
function getPhoneLink() {
  return `tel:${siteConfig.phoneNumber}`;
}
