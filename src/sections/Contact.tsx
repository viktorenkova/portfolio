import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label slide in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading word cascade
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body fade up
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'smooth',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Email slide in
      gsap.fromTo(
        emailRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Phone slide in
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA button bounce in
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Diagonal Decorative Line */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, transparent 49.5%, rgba(255,255,255,0.03) 49.5%, rgba(255,255,255,0.03) 50.5%, transparent 50.5%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            {/* Section Label */}
            <span ref={labelRef} className="section-label block mb-6 opacity-0">
              Контакты
            </span>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight opacity-0"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Давайте обсудим
              <br />
              <span className="text-gray-400">ваш проект</span>
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-gray-300 leading-relaxed mb-10 max-w-lg opacity-0"
            >
              Расскажите о своём проекте. Первый раз заказываете монтаж? Или ищете альтернативу 
              дорогим студиям? Я найду решение под ваш бюджет — качественно, но без переплат 
              за раскрученное имя и офис в центре.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              {/* Email */}
              <a
                ref={emailRef}
                href="mailto:hello@viktorenkova.com"
                className="group flex items-center gap-4 text-white hover:text-gray-300 transition-colors opacity-0"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Почта</div>
                  <div className="text-lg font-medium relative">
                    hello@viktorenkova.com
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </a>

              {/* Telegram */}
              <a
                ref={phoneRef}
                href="https://t.me/viktorenkova"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white hover:text-gray-300 transition-colors opacity-0"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Telegram</div>
                  <div className="text-lg font-medium relative">
                    @viktorenkova
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - CTA */}
          <div className="flex flex-col items-center lg:items-center justify-center w-full">
            <div className="relative">
              {/* Decorative Circle */}
              <div className="absolute -inset-10 border border-white/10 rounded-full animate-pulse-glow" />
              <div className="absolute -inset-20 border border-white/5 rounded-full" />
              
              {/* CTA Button */}
              <a
                ref={ctaRef}
                href="mailto:hello@viktorenkova.com"
                className="group relative inline-flex items-center gap-4 px-10 py-6 bg-white text-black font-semibold text-lg rounded-full transition-all duration-300 hover:bg-gray-200 hover:scale-105 opacity-0"
                style={{ transform: 'translateZ(5px)' }}
              >
                Написать мне
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </div>

            {/* Decorative Text */}
            <p className="mt-8 text-gray-500 text-sm text-center">
              Цена ниже рынка — качество выше ожиданий
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
