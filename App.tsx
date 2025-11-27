import React, { useEffect, useState } from 'react';
import { 
  MapPin, Globe, Code2, Cpu, Sparkles, Terminal, User, Heart, X, 
  ArrowUpRight, ExternalLink, ChevronRight, ChevronLeft, Github,
  Camera, Gamepad2, Music, Plane, Coffee, Book, ArrowLeft
} from 'lucide-react';
import { LiquidBackground } from './components/LiquidBackground';
import { GlassCard } from './components/GlassCard';
import { SocialList } from './components/SocialList';
import { NoiseOverlay } from './components/NoiseOverlay';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Project } from './types';

const PROJECTS: Project[] = [
  {
    title: "Spatial Dashboard",
    description: "A high-performance analytics platform featuring real-time data visualization using WebGL and WebSocket connections. Designed for monitoring complex distributed systems with an immersive spatial interface.",
    tags: ["React", "Three.js", "WebGL", "Socket.io"],
    image: "https://picsum.photos/800/600?random=1",
    link: "https://demo.com"
  },
  {
    title: "Nexus AI Chat",
    description: "Next-gen conversational interface with voice processing and emotional sentiment analysis. Features a fluid UI that adapts to the conversation tone using generative UI principles.",
    tags: ["Next.js", "OpenAI", "Tailwind", "Framer Motion"],
    image: "https://picsum.photos/800/600?random=2",
    link: "#"
  },
  {
    title: "Nebula Configurator",
    description: "Real-time 3D product customization tool for the automotive industry. Supports ray-tracing approximations in the browser and seamless state management for complex configurations.",
    tags: ["R3F", "Zustand", "PostgreSQL", "AWS"],
    image: "https://picsum.photos/800/600?random=3",
    link: "#"
  }
];

const HOBBIES = [
  { name: 'Photography', icon: Camera, desc: 'Street & Analog', color: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300' },
  { name: 'Gaming', icon: Gamepad2, desc: 'RPG & Strategy', color: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300' },
  { name: 'Music Production', icon: Music, desc: 'Synthwave & Lo-fi', color: 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300' },
  { name: 'Traveling', icon: Plane, desc: 'Exploring Cultures', color: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300' },
];

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeProfileView, setActiveProfileView] = useState<'menu' | 'about' | 'hobbies' | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const featuredProject = PROJECTS[0];
  const activeProject = activeProjectIndex !== null ? PROJECTS[activeProjectIndex] : null;

  const nextProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((prev) => (prev !== null ? (prev + 1) % PROJECTS.length : 0));
    }
  };

  const prevProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((prev) => (prev !== null ? (prev - 1 + PROJECTS.length) % PROJECTS.length : 0));
    }
  };

  return (
    <main className="min-h-screen w-full relative p-4 md:p-8 font-sans selection:bg-blue-500/30 text-slate-800 dark:text-slate-100 flex items-center justify-center transition-colors duration-700">
      <LiquidBackground />
      <NoiseOverlay />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 md:gap-6 auto-rows-[minmax(160px,auto)] md:h-[90vh]">
        
        {/* --- Card 1: Profile Main (2x2) --- */}
        <GlassCard 
          className="md:col-span-2 md:row-span-2 flex flex-col justify-between group cursor-pointer shadow-lg" 
          onClick={() => setActiveProfileView('menu')}
        >
          <div>
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-indigo-600 mb-6 border-4 border-white/30 dark:border-white/10 shadow-xl overflow-hidden group-hover:shadow-blue-500/20 transition-all duration-500">
                  <img 
                    src="https://picsum.photos/200" 
                    alt="Avatar" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium tracking-wide text-slate-600 dark:text-white/70 uppercase backdrop-blur-md flex items-center gap-2 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                Open to work
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white/90 dark:to-white/50">
              Willian Rupert
            </h1>
            <p className="text-lg md:text-xl text-blue-600/80 dark:text-blue-200/80 font-medium">Fullstack Engineer & UI Artisan</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-white/70 max-w-xl group-hover:text-slate-800 dark:group-hover:text-white/90 transition-colors duration-300">
              Crafting spatial experiences on the web. Specialized in merging robust architectures with immersive design to build the next generation of interfaces.
            </p>
          </div>
        </GlassCard>

        {/* --- Card 2: Location/Time (1x1) Matte --- */}
        <GlassCard matte className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-50" />
           <div className="relative z-10">
             <div className="w-12 h-12 mx-auto bg-black/5 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-300">
               <Globe size={24} />
             </div>
             <h3 className="text-xl md:text-2xl font-semibold mb-1 text-slate-800 dark:text-white">Brazil</h3>
             <p className="text-slate-500 dark:text-white/40 text-sm flex items-center justify-center gap-1">
               <MapPin size={12} /> São Paulo, SP
             </p>
           </div>
        </GlassCard>

        {/* --- Card 3: Socials (1x2) Glossy --- */}
        <GlassCard className="md:col-span-1 md:row-span-2">
          <SocialList />
        </GlassCard>

        {/* --- Card 4: Tech Stack (2x1) Matte --- */}
        <GlassCard matte className="md:col-span-2 md:row-span-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="text-purple-600 dark:text-purple-300" size={20} />
            <h3 className="text-sm uppercase tracking-widest text-slate-500 dark:text-white/40 font-bold">Tech Arsenal</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
             {['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'Tailwind', 'PostgreSQL', 'AWS'].map((tech) => (
               <span 
                key={tech} 
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs md:text-sm font-medium text-slate-700 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 transition-all cursor-default shadow-sm"
               >
                 {tech}
               </span>
             ))}
          </div>
        </GlassCard>

        {/* --- Card 5: Featured Project (2x2) --- */}
        <GlassCard 
          className="md:col-span-2 md:row-span-2 p-0 overflow-hidden group cursor-pointer" 
          noPadding
          onClick={() => setActiveProjectIndex(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
          <img 
            src={featuredProject.image}
            alt={featuredProject.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full text-white">
            <div className="flex items-center justify-between">
               <div>
                <span className="inline-block px-3 py-1 mb-3 rounded-lg bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  Featured Project
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredProject.title}</h3>
                <p className="text-white/70 line-clamp-2 max-w-md text-sm md:text-base">
                  {featuredProject.description}
                </p>
               </div>
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shadow-lg shrink-0 ml-4">
                 <ArrowUpRight size={20} />
               </div>
            </div>
          </div>
        </GlassCard>

        {/* --- Card 6: Statistics (1x1) --- */}
        <GlassCard matte className="md:col-span-1 md:row-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="text-green-600 dark:text-green-400" />
              <span className="text-slate-500 dark:text-white/50 text-sm font-medium">Commits 2024</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">1,284</div>
            <div className="h-1 w-full bg-black/5 dark:bg-white/10 mt-4 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 dark:bg-green-400 w-[75%]" />
            </div>
        </GlassCard>

        {/* --- Card 7: Availability (1x1) CTA --- */}
        <GlassCard 
          className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-500/80 to-purple-600/80 dark:from-blue-600/60 dark:to-purple-600/60 flex items-center justify-center cursor-pointer hover:brightness-110 border-white/20 text-center text-white"
          onClick={() => window.location.href = 'mailto:contact@willian.dev'}
        >
           <div className="space-y-2">
             <div className="w-10 h-10 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl">
               <Terminal size={20} />
             </div>
             <h2 className="text-lg font-bold">Let's Talk?</h2>
             <p className="text-xs text-white/80">Schedule a call</p>
           </div>
        </GlassCard>
      </div>

      {/* --- Profile System Modals --- */}
      <AnimatePresence mode="wait">
        
        {/* 1. Main Profile Menu */}
        {activeProfileView === 'menu' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/60 backdrop-blur-md"
            onClick={() => setActiveProfileView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md relative"
            >
               <GlassCard className="p-8 flex flex-col items-center text-center gap-6 shadow-2xl border-white/40 dark:border-white/20 bg-white/80 dark:bg-black/40">
                  <button 
                    onClick={() => setActiveProfileView(null)} 
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="relative">
                     <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-4 border-white dark:border-white/10 shadow-xl" />
                     <div className="absolute -bottom-1 -right-1 bg-white text-black p-1.5 rounded-full shadow-lg">
                       <User size={16} />
                     </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore More</h2>
                    <p className="text-slate-600 dark:text-white/60 text-sm">Dive deeper into my world.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button 
                      onClick={() => setActiveProfileView('hobbies')}
                      className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-full bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                        <Heart size={24} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-white/90">Hobbies</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveProfileView('about')}
                      className="group flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <User size={24} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-white/90">About Me</span>
                    </button>
                  </div>
               </GlassCard>
            </motion.div>
          </motion.div>
        )}

        {/* 2. About Me Page */}
        {activeProfileView === 'about' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/60 backdrop-blur-md"
             onClick={() => setActiveProfileView(null)}
           >
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
               onClick={(e) => e.stopPropagation()}
               className="w-full max-w-2xl"
             >
                <GlassCard className="p-6 md:p-8 relative bg-white/80 dark:bg-neutral-900/60">
                   <div className="flex items-center justify-between mb-8">
                      <button 
                        onClick={() => setActiveProfileView('menu')}
                        className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
                      </button>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                         <User size={16} /> <span className="text-xs font-bold uppercase tracking-wider">About Me</span>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
                      <div className="space-y-6">
                         <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/30 dark:border-white/10 shadow-2xl group">
                            <img src="https://picsum.photos/400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Profile" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                               <h3 className="text-xl font-bold">Willian Rupert</h3>
                               <p className="text-white/70 text-sm">Brazil</p>
                            </div>
                         </div>
                         <div className="p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-white/80">
                               <Coffee size={18} className="text-yellow-500 dark:text-yellow-400" /> Coffee enthusiast
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-white/80">
                               <Book size={18} className="text-blue-500 dark:text-blue-400" /> Continuous learner
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-white/60">
                           Transforming ideas into spatial reality.
                         </h2>
                         <p className="text-slate-600 dark:text-white/70 leading-relaxed text-sm md:text-base">
                            I am a software engineer with a deep passion for UI/UX and 3D web technologies. My journey began with a curiosity for how things work, leading me to master the art of full-stack development.
                         </p>
                         <p className="text-slate-600 dark:text-white/70 leading-relaxed text-sm md:text-base">
                            Today, I specialize in building immersive web applications using React, Three.js, and Framer Motion. I believe the future of the web is spatial, and I'm here to build it.
                         </p>

                         <div className="pt-6 border-t border-black/5 dark:border-white/10">
                            <h4 className="text-sm font-semibold text-slate-400 dark:text-white/50 uppercase tracking-wider mb-4">Core Philosophies</h4>
                            <div className="flex flex-wrap gap-2">
                               {['User-Centric', 'Pixel-Perfect', 'Performance-First', 'Accessible'].map(tag => (
                                 <span 
                                   key={tag} 
                                   className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 hover:border-black/10 dark:hover:border-white/20 transition-all cursor-default"
                                 >
                                   {tag}
                                 </span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </GlassCard>
             </motion.div>
           </motion.div>
        )}

        {/* 3. Hobbies Page */}
        {activeProfileView === 'hobbies' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/60 backdrop-blur-md"
             onClick={() => setActiveProfileView(null)}
           >
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
               onClick={(e) => e.stopPropagation()}
               className="w-full max-w-3xl"
             >
                <GlassCard className="p-8 bg-white/80 dark:bg-neutral-900/60">
                   <div className="flex items-center justify-between mb-8">
                      <button 
                        onClick={() => setActiveProfileView('menu')}
                        className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        <ArrowLeft size={20} /> <span className="text-sm font-medium">Back</span>
                      </button>
                      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                         <Heart size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Passions</span>
                      </div>
                   </div>
                   
                   <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Beyond the Screen</h2>
                      <p className="text-slate-600 dark:text-white/60">The things that fuel my creativity.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {HOBBIES.map((hobby, i) => (
                        <GlassCard 
                          key={i} 
                          matte 
                          className="flex items-center gap-6 p-6 group hover:bg-white/60 dark:hover:bg-white/20 transition-all duration-300 border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20"
                          whileHover={{ scale: 1.03 }}
                        >
                           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${hobby.color} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                              <hobby.icon size={32} />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{hobby.name}</h3>
                              <p className="text-slate-500 dark:text-white/50 text-sm">{hobby.desc}</p>
                           </div>
                        </GlassCard>
                      ))}
                   </div>
                </GlassCard>
             </motion.div>
           </motion.div>
        )}

      </AnimatePresence>

      {/* --- Project Details Modal --- */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveProjectIndex(null)}
          >
            <motion.div
              key={activeProject.title} // Re-animate on project change
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl relative"
            >
              <GlassCard className="p-0 overflow-hidden shadow-2xl border-white/20 dark:border-white/10" noPadding>
                
                {/* Close Button */}
                <button 
                  onClick={() => setActiveProjectIndex(null)} 
                  className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/20 backdrop-blur-md text-white/90 hover:bg-white/20 hover:text-white transition-all border border-white/20"
                >
                  <X size={20} />
                </button>

                {/* Grid Layout for Modal Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  
                  {/* Left: Image Area */}
                  <div className="relative h-64 md:h-auto min-h-[300px] md:min-h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:bg-gradient-to-r" />
                    <motion.img 
                      src={activeProject.image} 
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Navigation Arrows (Over Image) */}
                    <div className="absolute bottom-6 left-6 z-20 flex gap-3">
                       <button 
                        onClick={(e) => { e.stopPropagation(); prevProject(); }}
                        className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white active:scale-95"
                       >
                         <ChevronLeft size={20} />
                       </button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); nextProject(); }}
                        className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white active:scale-95"
                       >
                         <ChevronRight size={20} />
                       </button>
                    </div>
                  </div>

                  {/* Right: Content Area */}
                  <div className="p-6 md:p-10 flex flex-col justify-between bg-white/90 dark:bg-[#050505]/50 backdrop-blur-3xl">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                          Project {activeProjectIndex !== null ? activeProjectIndex + 1 : 1} / {PROJECTS.length}
                        </span>
                      </div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-white/60"
                      >
                        {activeProject.title}
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-white/70 leading-relaxed mb-8 text-base md:text-lg"
                      >
                        {activeProject.description}
                      </motion.p>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-2 mb-8"
                      >
                        {activeProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-slate-600 dark:text-white/60">
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/5 dark:border-white/5">
                      <a 
                        href={activeProject.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold py-3 px-6 rounded-2xl hover:bg-slate-800 dark:hover:bg-blue-50 transition-all shadow-lg active:scale-95 duration-300"
                      >
                        <ExternalLink size={18} />
                        Visit Live
                      </a>
                      <a 
                        href="#" 
                        className="flex-1 flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 text-slate-900 dark:text-white font-medium py-3 px-6 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 transition-all active:scale-95 duration-300"
                      >
                        <Github size={18} />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}