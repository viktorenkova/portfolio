import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Главная', href: '#home' },
  { name: 'Обо мне', href: '#about' },
  { name: 'Портфолио', href: '#portfolio' },
  { name: 'Услуги', href: '#services' },
  { name: 'Контакты', href: '#contact' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Border draw from center
      gsap.fromTo(
        borderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Logo fade + scale
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Nav links staggered fade
      const links = navRef.current?.querySelectorAll('a');
      links?.forEach((link, index) => {
        gsap.fromTo(
          link,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            delay: 0.3 + index * 0.05,
            ease: 'smooth',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Copyright fade
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 bg-black overflow-hidden"
    >
      {/* Top Border */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
        style={{ transform: 'scaleX(0)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div
            ref={logoRef}
            className="opacity-0"
          >
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white font-bold text-xl hover:border-white/50 hover:bg-white/5 transition-all duration-300 hover:rotate-[5deg] hover:scale-105"
            >
              VE
            </a>
          </div>

          {/* Navigation */}
          <nav
            ref={navRef}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="group relative text-sm text-gray-400 hover:text-white transition-colors duration-300 opacity-0"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div
            ref={copyrightRef}
            className="text-center md:text-right opacity-0"
          >
            <p className="text-sm text-gray-500">
              © 2024 Viktorenkova
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Все права защищены
            </p>
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            Создано с любовью • Выполнено с точностью
          </p>
        </div>
      </div>
    </footer>
  );
}
