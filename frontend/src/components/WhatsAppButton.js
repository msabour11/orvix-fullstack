import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '966500000000';
  const message = encodeURIComponent('مرحباً ORVIX، أود الاستفسار عن خدماتكم');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-orvix-green rounded-full flex items-center justify-center shadow-lg shadow-orvix-green/30 hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
};

export default WhatsAppButton;
