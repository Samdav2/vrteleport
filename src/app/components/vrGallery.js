// src/components/VrGallery.js
'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { UploadCloud, Bot, Film, Image as ImageIcon, School, Plane, Clapperboard, HeartPulse, X, Calendar, Radio, Users, GraduationCap } from 'lucide-react';

// Import the new EntertainmentPage component
import EntertainmentPage from './Entertainment';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const initialMedia = [
  { id: 1, type: 'image', src: 'https://raw.githubusercontent.com/aframevr/aframe/master/examples/boilerplate/panorama/puydesancy.jpg', title: 'Puy de Sancy, France', category: 'Tourism' },
  { id: 2, type: 'image', src: './images/img2.jpg', title: 'Sechelt, Canada', category: 'Tourism' },
  { id: 5, type: 'image', src: './images/img3.jpg', title: 'Balloon Ride', category: 'Entertainment' },
  { id: 3, type: 'image', src: './images/img5.jpg', title: 'Paris, France', category: 'Education' },
  { id: 6, type: 'video', src: 'https://cdn.coverr.co/videos/coverr-calm-waves-of-the-sea-that-break-on-the-shore-of-the-beach-5153/1080p.mp4', title: 'Calm Ocean Waves', category: 'Healthcare' },
  { id: 4, type: 'image', src: 'https://raw.githubusercontent.com/aframevr/aframe/v1.0.4/examples/boilerplate/panorama/cubes.jpg', title: 'Abstract Cubes', category: 'Entertainment' },
];

const categories = [
  { name: 'All', icon: null },
  { name: 'Education', icon: <School size={20} /> },
  { name: 'Tourism', icon: <Plane size={20} /> },
  { name: 'Entertainment', icon: <Clapperboard size={20} /> },
  { name: 'Healthcare', icon: <HeartPulse size={20} /> },
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 w-full max-w-lg m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-5 border-b border-slate-800">
          <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
      <style jsx>{`@keyframes fade-in-scale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards ease-out; }`}</style>
    </div>
  );
};

const BottomNav = ({ onSelect }) => {
    const navItems = [
        { name: 'Events', icon: <Calendar size={24}/> },
        { name: 'Live', icon: <Radio size={24}/> },
        { name: 'Meetings', icon: <Users size={24}/> },
        { name: 'Teaching', icon: <GraduationCap size={24}/> },
    ];
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/50 backdrop-blur-lg border-t border-cyan-500/20 z-40">
            <div className="max-w-5xl mx-auto flex justify-around items-center h-20">
                {navItems.map(item => (
                    <button key={item.name} onClick={() => onSelect(item.name)} className="flex flex-col items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors group">
                        <div className="p-3 rounded-full group-hover:bg-cyan-500/10 transition-colors">
                            {item.icon}
                        </div>
                        <span className="text-xs mt-1 font-semibold">{item.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};


export default function VrGallery() {
  const [media, setMedia] = useState(initialMedia);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVrMode, setIsVrMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const sceneRef = useRef(null);

  const handleMediaSelect = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setIsVrMode(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMediaItem = {
        id: Date.now(),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        src: URL.createObjectURL(file),
        title: file.name,
        category: 'User Uploads',
      };
      setMedia([newMediaItem, ...media]);
      setIsUploadModalOpen(false);
    }
  };

  const handleAiGenerate = (prompt) => {
    console.log("AI Prompt:", prompt);
    alert("AI Generation is a future feature! Your prompt was: " + prompt);
    setIsAiModalOpen(false);
  };

  const handleNavSelect = (selection) => {
    // When a bottom nav item is clicked, we can switch the view.
    // For now, we'll make them all switch to the Entertainment page as an example.
    if (['Events', 'Live', 'Meetings', 'Teaching'].includes(selection)) {
        setActiveCategory('Entertainment');
    }
  };

  const filteredMedia = activeCategory === 'All'
    ? media
    : media.filter(item => item.category === activeCategory);

  if (isVrMode && selectedMedia) {
    return (
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Scene key={selectedMedia.src} mediaUrl={selectedMedia.src} mediaType={selectedMedia.type} sceneRef={sceneRef} />
        <button
          onClick={() => setIsVrMode(false)}
          className="absolute top-5 right-5 bg-red-600/70 text-white font-bold py-2 px-4 rounded-full z-20 backdrop-blur-sm border border-red-500/50 hover:bg-red-500 transition-all"
        >
          Exit VR
        </button>
      </div>
    );
  }

  // Logic to display the EntertainmentPage when its category is active
  if (activeCategory === 'Entertainment') {
      return <EntertainmentPage onBack={() => setActiveCategory('All')} />
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-28"> {/* Added padding-bottom for nav */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-3">
          vrteleport
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Your Portal to Immersive Worlds. Explore, create, and experience reality like never before.
        </p>
      </header>

      {/* Action Hub */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <button onClick={() => setIsAiModalOpen(true)} className="p-6 bg-slate-800/50 rounded-lg border border-cyan-500/30 text-center group hover:bg-slate-800/80 hover:border-cyan-400 transition-all duration-300">
          <Bot className="mx-auto text-cyan-400 group-hover:animate-pulse" size={40} />
          <span className="mt-3 block font-bold text-lg">Generate with AI</span>
        </button>
        <button onClick={() => setIsUploadModalOpen(true)} className="p-6 bg-slate-800/50 rounded-lg border border-cyan-500/30 text-center group hover:bg-slate-800/80 hover:border-cyan-400 transition-all duration-300">
          <UploadCloud className="mx-auto text-cyan-400 group-hover:animate-pulse" size={40} />
          <span className="mt-3 block font-bold text-lg">Upload Media</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
        {categories.map(cat => (
          <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 transition-all duration-300 ${activeCategory === cat.name ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20' : 'bg-slate-800/60 hover:bg-slate-700/80'}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-slate-800/40 rounded-xl overflow-hidden group cursor-pointer border border-transparent hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20" onClick={() => handleMediaSelect(item)}>
            <div className="relative h-56">
              {item.type === 'image' ? <img src={item.src} alt={item.title} className="w-full h-full object-cover"/> : <video src={item.src} className="w-full h-full object-cover" muted loop playsInline></video>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ item.category === 'Education' ? 'bg-blue-500/30 text-blue-300' : item.category === 'Tourism' ? 'bg-green-500/30 text-green-300' : item.category === 'Entertainment' ? 'bg-purple-500/30 text-purple-300' : item.category === 'Healthcare' ? 'bg-red-500/30 text-red-300' : 'bg-gray-500/30 text-gray-300' }`}>
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              </div>
              <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bold text-xl">Enter Scene</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generation Modal */}
      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="Generate Scene with AI">
        <form onSubmit={(e) => { e.preventDefault(); handleAiGenerate(e.target.prompt.value); }}>
          <p className="text-gray-300 mb-4">Describe the 360° world you want to create. Be as descriptive as possible.</p>
          <textarea name="prompt" rows="4" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="e.g., A futuristic city skyline at sunset, with flying cars and neon lights..."></textarea>
          <button type="submit" className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">Generate</button>
        </form>
      </Modal>

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Your Media">
        <div className="text-center">
          <p className="text-gray-300 mb-6">Choose whether to upload a 360° image or a 360° video.</p>
          <div className="flex justify-center gap-4">
            <label htmlFor="image-upload-input" className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-cyan-500/30 text-center group hover:bg-slate-800/80 hover:border-cyan-400 transition-all duration-300 cursor-pointer w-1/2">
              <ImageIcon className="mx-auto text-cyan-400" size={40} />
              <span className="mt-3 block font-bold text-lg">Upload Image</span>
            </label>
            <label htmlFor="video-upload-input" className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-cyan-500/30 text-center group hover:bg-slate-800/80 hover:border-cyan-400 transition-all duration-300 cursor-pointer w-1/2">
              <Film className="mx-auto text-cyan-400" size={40} />
              <span className="mt-3 block font-bold text-lg">Upload Video</span>
            </label>
            <input id="image-upload-input" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            <input id="video-upload-input" type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
      </Modal>

      {/* Bottom Navigation Bar */}
      <BottomNav onSelect={handleNavSelect} />
    </div>
  );
}
