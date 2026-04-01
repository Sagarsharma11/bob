"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";

const WHATSAPP_NUMBER = "917366986973"; 

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "Batsman", 
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [];
    lines.push(`🏏 *New Player Interest — Blasters of Bharat*`);
    lines.push(`━━━━━━━━━━━━━━━━━━`);
    lines.push(`👤 *Player Details*`);
    lines.push(`Name: ${formData.name}`);
    lines.push(`Phone: ${formData.phone}`);
    lines.push(`Role: ${formData.role}`);
    if (formData.message) {
      lines.push(`Message/Experience: ${formData.message}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━`);
    lines.push(`_Sent via blastersofbharat.com_`);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-950 min-h-[75vh]">
      <Container>
        <div className="max-w-5xl rounded-md mx-auto bg-white dark:bg-gray-900 rounded-4xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-5">
          
          {/* Image Section */}
          <div className="relative h-64 md:h-auto md:col-span-2">
            <Image
              src="/images/bob_turnament2.jpeg"
              alt="Blasters of Bharat Tournament"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8">
              <span className="text-4xl mb-4 shadow-sm">🏆</span>
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight shadow-sm">Play with passion.</h2>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm font-medium">
                Join a community of weekend warriors playing competitive cricket across Bangalore grounds.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="md:col-span-3 flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-8 pb-10 text-white text-center relative overflow-hidden">
              {/* Decorative elements behind text */}
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30 shadow-xl">
                  <span className="text-3xl">🤝</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Join Our Team</h1>
                <p className="text-orange-50 dark:text-gray-100 font-medium max-w-md mx-auto leading-relaxed text-sm md:text-base">
                  Ready to step onto the pitch? Fill out the form below and we'll connect on WhatsApp.
                </p>
              </div>
            </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                placeholder="e.g. Virat Kohli"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                placeholder="WhatsApp Number"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Playing Role *
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicket-keeper">Wicket-keeper</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Experience / Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all resize-none placeholder-gray-400"
                placeholder="Tell us a bit about your cricket experience..."
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  fill="currentColor"
                  className="transition-transform group-hover:scale-110"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Send on WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
      </Container>
    </div>
  );
}
