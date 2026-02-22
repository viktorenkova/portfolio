import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Volume2, 
  Wand2, 
  Film 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Scissors,
    title: 'Монтаж',
    description: 'Не просто склейка, а история с ритмом. Ваш ролик будет держать внимание от первого до последнего кадра.',
  },
  {
    icon: Palette,
    title: 'Цвет',
    description: 'Подберу настроение для вашего видео. От естественности до кино — то, что усилит впечатление.',
  },
  {
    icon: Sparkles,
    title: 'Графика',
    description: 'Титры, логотипы, анимация. Всё выдержано в одном стиле и не отвлекает от главного.',
  },
  {
    icon: Volume2,
    title: 'Звук',
    description: 'Чистая речь, музыка в тему, отсутствие шумов. Звук, который работает на ваш ролик.',
  },
  {
    icon: Wand2,
    title: 'VFX',
    description: 'Уберу лишнее, добавлю нужное. Хромакей, стабилизация, эффекты — всё аккуратно и по делу.',
  },
  {
    icon: Film,
    title: 'Под ключ',
    description: 'От сырых кадров до готового видео. Один человек, одна цена, один ответственный за результат.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'smooth',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered pop animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Icon draw animation
      const icons = cardsRef.current?.querySelectorAll('.service-icon');
      icons?.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.5 + index * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-40 right-20 w-24 h-24 border border-white/5 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '7s' }} />
      <div className="absolute bottom-20 left-40 w-16 h-16 border border-white/5 animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span ref={labelRef} className="section-label block mb-6 opacity-0">
            Услуги
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white opacity-0"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Чем я занимаюсь
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            // Staggered vertical offsets
            const offsetY = [0, 40, 20, -20, 20, -40][index] || 0;

            return (
              <div
                key={service.title}
                className="service-card group relative opacity-0 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
                style={{ transform: `translateY(${offsetY}px)` }}
              >
                {/* Icon */}
                <div className="service-icon w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-5 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
