import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRefs = useRef<HTMLParagraphElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label typewriter effect
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading word reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body paragraphs staggered fade
      bodyRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: 'smooth',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Image 3D flip in
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: -30, transformPerspective: 1000 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.5,
            ease: 'expo.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats fade in
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'smooth',
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

  const addToBodyRefs = (el: HTMLParagraphElement | null) => {
    if (el && !bodyRefs.current.includes(el)) {
      bodyRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Floating Decorative Shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-white/5 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
      <div className="absolute bottom-40 left-10 w-20 h-20 border border-white/5 rotate-45 animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Section Label */}
            <span ref={labelRef} className="section-label block mb-6 opacity-0">
              Обо мне
            </span>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight opacity-0"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Мало проектов —
              <br />
              <span className="text-gray-400">много внимания</span>
            </h2>

            {/* Body Text */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p ref={addToBodyRefs} className="opacity-0">
                Долгое время монтаж был моим хобби — создавала видео для себя, экспериментировала, 
                искала свой стиль. Теперь готова делать это для вас. Свежий взгляд без устоявшихся 
                шаблонов и бюрократии крупных студий.
              </p>
              <p ref={addToBodyRefs} className="opacity-0">
                Не беру 10 проектов одновременно — максимум 4 в месяц, чтобы у каждого было достаточно времени и внимания. Ваш ролик не уйдёт на аутсорс и не застрянет в очереди — я работаю с каждым кадром лично, пока результат не начнёт работать.
              </p>
              <p ref={addToBodyRefs} className="opacity-0">
                Работаю в Premiere Pro и After Effects. Цена ниже рыночной, потому что я только 
                начинаю коммерческий путь. Но качество — на уровне. Проверьте сами.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10 opacity-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  до <span className="stat-number" data-target="4">0</span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Проектов в месяц</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="stat-number text-3xl sm:text-4xl font-bold text-white mb-1" data-target="100">
                  0
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">% внимания</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <span className="stat-number" data-target="500">0</span>+
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Часов практики</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative" style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="relative opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-white/5 rounded-lg blur-2xl animate-pulse-glow" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/about-portrait.jpg"
                  alt="Viktorenkova - Видеомонтажер"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-white/20 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
