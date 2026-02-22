import { useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  layer: number;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const specialStarRef = useRef({ hue: 0, brightness: 1, pulsePhase: 0 });

  // Generate stars
  const generateStars = useCallback(() => {
    const stars: Star[] = [];
    const starCount = 250;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        layer: Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 3,
      });
    }
    starsRef.current = stars;
  }, []);

  // Draw stars on canvas
  const drawStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse movement
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    const centerX = width / 2;
    const centerY = height / 2;
    const mouseOffsetX = (mouseRef.current.x - centerX) / centerX;
    const mouseOffsetY = (mouseRef.current.y - centerY) / centerY;

    // Update special star animation
    specialStarRef.current.hue = (specialStarRef.current.hue + 0.5) % 360;
    specialStarRef.current.pulsePhase += 0.03;
    specialStarRef.current.brightness = 0.7 + Math.sin(specialStarRef.current.pulsePhase) * 0.3;

    // Draw regular stars
    starsRef.current.forEach((star, index) => {
      // Skip the special star (last one)
      if (index === starsRef.current.length - 1) return;

      const parallaxStrength = star.layer * 8;
      const offsetX = mouseOffsetX * parallaxStrength;
      const offsetY = mouseOffsetY * parallaxStrength;
      
      const x = (star.x / 100) * width + offsetX;
      const y = (star.y / 100) * height + offsetY;
      
      // Twinkle effect
      const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.id) * 0.3 + 0.7;
      const finalOpacity = star.opacity * twinkle;

      // Draw star glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${finalOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw star core
      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
      ctx.fill();
    });

    // Draw special animated star (center-right area)
    const specialStar = starsRef.current[starsRef.current.length - 1];
    const specialParallax = specialStar.layer * 12;
    const specialX = (specialStar.x / 100) * width + mouseOffsetX * specialParallax;
    const specialY = (specialStar.y / 100) * height + mouseOffsetY * specialParallax;
    
    const hue = specialStarRef.current.hue;
    const brightness = specialStarRef.current.brightness;
    
    // Outer glow with color
    const outerGradient = ctx.createRadialGradient(specialX, specialY, 0, specialX, specialY, 40);
    outerGradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${0.4 * brightness})`);
    outerGradient.addColorStop(0.3, `hsla(${hue}, 70%, 60%, ${0.2 * brightness})`);
    outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(specialX, specialY, 40, 0, Math.PI * 2);
    ctx.fillStyle = outerGradient;
    ctx.fill();

    // Middle glow
    const middleGradient = ctx.createRadialGradient(specialX, specialY, 0, specialX, specialY, 15);
    middleGradient.addColorStop(0, `hsla(${hue}, 90%, 80%, ${0.8 * brightness})`);
    middleGradient.addColorStop(0.5, `hsla(${hue}, 80%, 70%, ${0.4 * brightness})`);
    middleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(specialX, specialY, 15, 0, Math.PI * 2);
    ctx.fillStyle = middleGradient;
    ctx.fill();

    // Core with cross rays
    ctx.save();
    ctx.translate(specialX, specialY);
    ctx.rotate(Date.now() * 0.001);
    
    // Draw cross rays
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(0, -25 * brightness);
      ctx.strokeStyle = `hsla(${hue}, 100%, 85%, ${0.6 * brightness})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();

    // Bright core
    ctx.beginPath();
    ctx.arc(specialX, specialY, 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 100%, 95%, ${brightness})`;
    ctx.fill();

    // Sparkle effect
    if (Math.random() > 0.95) {
      const sparkleAngle = Math.random() * Math.PI * 2;
      const sparkleDistance = 30 + Math.random() * 20;
      const sparkleX = specialX + Math.cos(sparkleAngle) * sparkleDistance;
      const sparkleY = specialY + Math.sin(sparkleAngle) * sparkleDistance;
      
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${Math.random() * brightness})`;
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(drawStars);
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current.x = e.clientX;
    targetMouseRef.current.y = e.clientY;
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    generateStars();
    handleResize();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    drawStars();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [generateStars, handleMouseMove, handleResize, drawStars]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Headline 1 clip reveal
      tl.fromTo(
        headline1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
        0.3
      );

      // Subheadline fade up
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // CTA button scale in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        1
      );

      // Accent line draw
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7 },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      if (scrollY < vh * 0.5 && headline1Ref.current && subheadRef.current) {
        const progress = scrollY / (vh * 0.5);
        headline1Ref.current.style.transform = `translateY(${-progress * 80}px)`;
        subheadRef.current.style.transform = `translateY(${-progress * 40}px)`;
        subheadRef.current.style.opacity = String(1 - progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Starfield Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none z-[2]" />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Headlines */}
        <div className="mb-8">
          <h1
            ref={headline1Ref}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0"
            style={{ 
              fontFamily: 'Montserrat, sans-serif',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.8)',
              textShadow: '0 0 30px rgba(255,255,255,0.2)',
              letterSpacing: '0.12em'
            }}
          >
            VIKTORENKOVA
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide mb-12 opacity-0 max-w-2xl mx-auto leading-relaxed"
        >
          Небольшие проекты, но большое внимание к деталям. Качественный монтаж по честной цене
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#portfolio"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 opacity-0"
        >
          Смотреть работы
          <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </a>

        {/* Accent Line */}
        <div
          ref={lineRef}
          className="mt-16 w-24 h-px bg-white/30 mx-auto origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
