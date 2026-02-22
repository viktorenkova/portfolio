import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoProject {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

const projects: VideoProject[] = [
  {
    id: 1,
    title: 'Urban Rhythms',
    category: 'Commercial',
    description: '30-second brand film capturing fast-paced urban energy',
    thumbnail: '/video-thumb-1.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Echoes of Tomorrow',
    category: 'Music Video',
    description: 'Atmospheric electronic track with cinematic narrative',
    thumbnail: '/video-thumb-2.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    title: "The Artisan's Hands",
    category: 'Documentary',
    description: 'Short-form documentary with intimate storytelling',
    thumbnail: '/video-thumb-3.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 4,
    title: 'Neon Dreams',
    category: 'Fashion Film',
    description: 'High-fashion editorial with bold visual style',
    thumbnail: '/video-thumb-4.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 5,
    title: 'Beyond the Summit',
    category: 'Brand Film',
    description: 'Outdoor adventure brand with epic scale storytelling',
    thumbnail: '/video-thumb-5.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 6,
    title: 'Fragments',
    category: 'Experimental',
    description: 'Personal art project with abstract motion design',
    thumbnail: '/video-thumb-6.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid cards staggered reveal
      const cards = gridRef.current?.querySelectorAll('.video-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.4 + index * 0.1,
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

  const openVideo = (project: VideoProject) => {
    setActiveVideo(project);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 sm:py-32 lg:py-40 bg-black overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span ref={labelRef} className="section-label block mb-6 opacity-0">
            Портфолио
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white opacity-0"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Избранные работы
          </h2>
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="video-card group relative aspect-video rounded-xl overflow-hidden bg-zinc-900 opacity-0 cursor-pointer"
              onClick={() => openVideo(project)}
            >
              {/* Thumbnail */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Category */}
                <span className="text-xs uppercase tracking-wider text-white/60 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="video-title text-xl font-semibold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 delay-75">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/70 mt-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-100">
                  {project.description}
                </p>
              </div>

              {/* Play Button */}
              <div className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-400 group-hover:bg-white/20 group-hover:scale-110 group-hover:backdrop-blur-md">
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-xl border border-white/0 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeVideo}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>

            {/* Video Info */}
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-gray-400">
                {activeVideo.category}
              </span>
              <h3 className="text-2xl font-semibold text-white mt-1">
                {activeVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
