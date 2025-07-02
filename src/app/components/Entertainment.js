'use client';

import { useState, useEffect } from 'react';
import { Radio, Calendar, Ticket, Bookmark, X, PlayCircle, Star, Film, Mic, Gamepad2, Brush, Globe, BrainCircuit, Heart, CloudDrizzle, Headset } from 'lucide-react';

// --- Sample Data for All Categories ---

const liveEvents = [
  { id: 'live-1', title: 'LASU Innvation Hub OPen Day', artist: 'Don', time: 'Live Now', image: 'https://static.wixstatic.com/media/b672a6_b26f9ef5200546f9b3434bd949033f52~mv2.jpg/v1/fill/w_1905,h_829,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b672a6_b26f9ef5200546f9b3434bd949033f52~mv2.jpg', description: 'Come and watch how young lasu tech innovators tend to chnage teh world with thier ideas' },
  { id: 'live-2', title: 'Nollywood Premiere: "Cyber City"', artist: 'Funke Akindele', time: 'Starts in 30 Mins', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Be the first to see the new blockbuster sci-fi thriller. Join the cast and crew for the exclusive virtual red carpet and screening.' },
];

const pastEvents = [
  { id: 'past-1', title: 'Lagos Fashion Week 2024', artist: 'Top Designers', image: 'https://images.unsplash.com/photo-1550963942-452a817294ba?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Rewatch the stunning runway shows from the most anticipated fashion event of the year. All collections, all designers, on demand.' },
  { id: 'past-2', title: 'The Comedians\' Roundtable', artist: 'Basketmouth & Bovi', image: 'https://images.unsplash.com/photo-1576568699713-a3cdde596632?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A hilarious, no-holds-barred conversation with Nigeria\'s kings of comedy. Access the full, unedited recording now.' },
  { id: 'past-3', title: 'Art X Lagos Showcase', artist: 'Various Artists', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Explore a virtual gallery of the groundbreaking contemporary art featured at this year\'s Art X Lagos exhibition.' },
];

const immersiveFilms = [
    { id: 'film-1', title: 'A Day in Makoko', image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Okoh_collins_photography_landscape_shots_all_over_Nigeria.jpg', description: 'A 360-degree documentary that puts you in the heart of the vibrant floating community of Makoko, Lagos.' },
    { id: 'film-2', title: 'Spirit of the Serpent', image: 'https://i0.wp.com/freescience.info/wp-content/uploads/2024/12/snakes-in-african-folklore-guardians-of-the-spirit-83399-featured_1_0.jpg?w=1000&ssl=1', description: 'An animated folk tale that unfolds around you, bringing ancient myths to life in a visually stunning world.' },
    { id: 'film-3', title: 'Jos: The Origin', image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/A_Rock_at_West_Side%2C_Rukuba_Road_Jos%2C_Plateau_state%2C_Nigeria.jpg', description: 'Explore the breathtaking landscapes of Jos Plateau in this cinematic VR experience.' },
    { id: 'film-4', title: 'Afro-Futurist Dream', image: 'https://sdmntprukwest.oaiusercontent.com/files/00000000-7eb8-6243-b2e5-dee1e338949f/raw?se=2025-07-02T06%3A49%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=d5152e8d-68d9-5357-9cdd-2d0aee86aef0&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-02T05%3A35%3A49Z&ske=2025-07-03T05%3A35%3A49Z&sks=b&skv=2024-08-04&sig=dwF2cv2J0juwotzR9qKKoWfl8zZAsC/vcWDqYdCv5TI%3D', description: 'A sci-fi short film that imagines Lagos in 2077. Fly through a city of towering wonders and technological marvels.' },
    { id: 'film-5', title: 'Underwater Lagos', image: 'https://checkyeti.imgix.net/images/prod/products/26607/try-scuba-diving-in-lagos-for-beginners-with-we-dive-lagos-hero-image?auto=format,compress&fit=crop&format=jpeg&jpeg-progressive=true&fit=crop&w=846&h=436&dpr=1u', description: 'A speculative documentary showing the lost wonders hidden beneath the Lagos Lagoon.' },
];

const interactiveMusic = [
    { id: 'music-1', title: 'Create with Sarz', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Step into the producer\'s seat. Mix and match stems to create your own version of a hit song in this interactive studio.' },
    { id: 'music-2', title: 'The Cavemen: Forest Session', image: 'https://img.pikbest.com/photo/20241001/view-of-summer-forest-ai-generated-_10915652.jpg!bwr800', description: 'An intimate, volumetric performance in a lush, virtual forest. Walk around the band as they play.' },
    { id: 'music-3', title: 'Rema\'s Rave Galaxy', image: 'https://www.rollingstone.com/music/music-pictures/rema-afro-rave-new-york-photos-1235075486/', description: 'A rhythm game set in a vibrant alien world, featuring the biggest tracks from Rema.' },
    { id: 'music-4', title: 'Sounds of the Market', image: 'https://artlogic-res.cloudinary.com/w_2000,h_2000,c_limit,f_auto,fl_lossy,q_auto:good/artlogicstorage/flowers/images/view/d6e61cfae956da6e1836c5ffe731dc4dj.jpg', description: 'An ambient soundscape experience. Isolate and explore the unique sounds of Balogun Market.' },
    { id: 'music-5', title: 'Highlife VR', image: 'https://bing.com/th/id/BCO.5eb48a44-28c5-4d51-8820-32b26382b9a8.png', description: 'Travel back to a 1960s ballroom and enjoy a classic highlife band performance.' },
];

const vrArcade = [
    { id: 'game-1', title: 'Danfo Racer VR', image: 'https://bing.com/th/id/BCO.c46def6d-3853-4371-bf11-d459de385929.png', description: 'Navigate the chaotic streets of Lagos in this thrilling and hilarious VR racing game.' },
    { id: 'game-2', title: 'Oduduwa\'s Challenge', image: 'https://bing.com/th/id/BCO.40316662-3842-46ce-b2f2-5e009e19a492.png', description: 'A puzzle-adventure game based on Yoruba mythology. Solve ancient riddles to gain mythical powers.' },
    { id: 'game-3', title: 'Sokoto Skies', image: 'https://bing.com/th/id/BCO.bd1a8090-2541-41c4-be4a-abbd9b4ce497.png', description: 'A serene hot air balloon exploration game over the beautiful landscapes of northern Nigeria.' },
    { id: 'game-4', title: 'Market Mayhem', image: 'https://bing.com/th/id/BCO.9404c293-4d73-4dac-9f36-4ce2143a6329.png', description: 'A fun, fast-paced game where you manage a busy market stall, serving customers and haggling prices.' },
    { id: 'game-5', title: 'Aso-Oke Weaver', image: 'https://bing.com/th/id/BCO.1e4cf58b-49e7-446d-98e2-29e36c57816f.png', description: 'A relaxing simulation game where you learn the traditional art of Aso-Oke weaving with haptic feedback.' },
];

const virtualGalleries = [
    { id: 'art-1', title: 'Ben Enwonwu: A Retrospective', image: 'https://images.unsplash.com/photo-1579543916053-96b1b5e28a30?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Walk through a curated digital museum dedicated to the works of the legendary Nigerian artist.' },
    { id: 'art-2', title: 'Nike Art Gallery VR Tour', image: 'https://images.unsplash.com/photo-1578326161453-2c700938a5b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'An immersive, room-scale tour of the famous Nike Art Gallery, with artist commentary.' },
    { id: 'art-3', title: 'Sculpting in Gravity', image: 'https://images.unsplash.com/photo-1605206978583-1a8936990d0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A collection of impossible, zero-gravity digital sculptures that you can manipulate and view from any angle.' },
    { id: 'art-4', title: 'Street Art of Lagos', image: 'https://images.unsplash.com/photo-1628872411267-5927354a2055?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A virtual tour showcasing the most vibrant and powerful street art and graffiti across Lagos.' },
    { id: 'art-5', title: 'The Bronze Age: Benin Kingdom', image: 'https://images.unsplash.com/photo-1633454392070-51b6a7ac27c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Explore a recreation of the ancient Benin Kingdom and get up close with its legendary bronze works.' },
];

const immersiveTravel = [
    { id: 'travel-1', title: 'Idanre Hills Climb', image: 'https://images.unsplash.com/photo-1604280392372-d596637315e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Experience the breathtaking ascent of Idanre Hills with a virtual guide explaining its history and significance.' },
    { id: 'travel-2', title: 'Kajuru Castle Tour', image: 'https://images.unsplash.com/photo-1598851463167-1510e4a7b4f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A private, 360-degree tour of the stunning German-style castle nestled in Kaduna.' },
    { id: 'travel-3', title: 'Yankari Game Reserve Safari', image: 'https://images.unsplash.com/photo-1498662912423-525d8b4e4b51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Go on a virtual safari and encounter elephants, baboons, and more in their natural habitat.' },
    { id: 'travel-4', title: 'Calabar Carnival Experience', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Feel the energy of Africa\'s biggest street party. Join a band and dance through the streets of Calabar.' },
    { id: 'travel-5', title: 'Abeokuta\'s Olumo Rock', image: 'https://images.unsplash.com/photo-1627893931835-a6e5a40a233b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Explore the ancient caves and climb to the peak of this historic landmark in this immersive tour.' },
];

const educationalExperiences = [
    { id: 'edu-1', title: 'The Human Cell', image: 'https://images.unsplash.com/photo-1579154341544-2393a8a7259f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Shrink down and journey inside a human cell. An interactive biology lesson like never before.' },
    { id: 'edu-2', title: 'Night Sky over a Village', image: 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Learn about constellations and celestial navigation from an elder in a serene, light-pollution-free environment.' },
    { id: 'edu-3', title: 'Architects of Ancient Empires', image: 'https://images.unsplash.com/photo-1555938814-15b8cf04e392?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Walk through realistic reconstructions of the great walls of Kano and the palaces of the Oyo Empire.' },
    { id: 'edu-4', title: 'Learn Yoruba in VR', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'An interactive language learning experience where you converse with AI-powered characters in a virtual market.' },
    { id: 'edu-5', title: 'The Physics of Sound', image: 'https://images.unsplash.com/photo-1518609867239-5561a8a25d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Visualize sound waves and experiment with frequencies in a reactive, audio-visual sandbox.' },
];

const wellnessAndMeditation = [
    { id: 'well-1', title: 'Sunrise on Obudu Plateau', image: 'https://images.unsplash.com/photo-1596763428946-a550a2569e3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A guided morning meditation session set against the stunning, 360-degree vista of a sunrise at Obudu Mountain Resort.' },
    { id: 'well-2', title: 'Rainforest Sound Bath', image: 'https://images.unsplash.com/photo-1442570468985-f63ed5de9086?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Immerse yourself in the therapeutic sounds of a Nigerian rainforest. Perfect for relaxation and focus.' },
    { id: 'well-3', title: 'The Quiet Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A serene, private beach where you can practice mindfulness exercises or simply watch the waves.' },
    { id: 'well-4', title: 'Breathing with the Tides', image: 'https://images.unsplash.com/photo-1542261725-b96a94164b32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A guided breathing exercise synchronized with the ebb and flow of the ocean tide in a beautiful mangrove.' },
    { id: 'well-5', title: 'Star Gazing Meditation', image: 'https://images.unsplash.com/photo-1536746283858-a25a2b161475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A calming journey through the cosmos, with a soft voice guiding you to a state of deep relaxation.' },
];

const allCategories = [
    { name: "My List", icon: Star, dataKey: 'myList', accentColor: 'text-yellow-400', shadowColor: 'hover:shadow-yellow-400/20', borderColor: 'hover:border-yellow-400/50' },
    { name: "Immersive Films", icon: Film, data: immersiveFilms, accentColor: 'text-rose-400', shadowColor: 'hover:shadow-rose-400/20', borderColor: 'hover:border-rose-400/50' },
    { name: "Interactive Music Videos", icon: Mic, data: interactiveMusic, accentColor: 'text-purple-400', shadowColor: 'hover:shadow-purple-400/20', borderColor: 'hover:border-purple-400/50' },
    { name: "VR Arcade", icon: Gamepad2, data: vrArcade, accentColor: 'text-green-400', shadowColor: 'hover:shadow-green-400/20', borderColor: 'hover:border-green-400/50' },
    { name: "Virtual Art Galleries", icon: Brush, data: virtualGalleries, accentColor: 'text-orange-400', shadowColor: 'hover:shadow-orange-400/20', borderColor: 'hover:border-orange-400/50' },
    { name: "360° Travel & Tourism", icon: Globe, data: immersiveTravel, accentColor: 'text-blue-400', shadowColor: 'hover:shadow-blue-400/20', borderColor: 'hover:border-blue-400/50' },
    { name: "Educational Experiences", icon: BrainCircuit, data: educationalExperiences, accentColor: 'text-teal-400', shadowColor: 'hover:shadow-teal-400/20', borderColor: 'hover:border-teal-400/50' },
    { name: "Wellness & Meditation", icon: Heart, data: wellnessAndMeditation, accentColor: 'text-pink-400', shadowColor: 'hover:shadow-pink-400/20', borderColor: 'hover:border-pink-400/50' },
    { name: "Past Live Events", icon: Calendar, data: pastEvents, accentColor: 'text-cyan-400', shadowColor: 'hover:shadow-cyan-400/20', borderColor: 'hover:border-cyan-500/50' },
];


// --- Event Modal Component ---

const EventModal = ({ event, onClose, onToggleSave, isSaved }) => {
    if (!event) return null;
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-2xl m-4 relative transform animate-slide-up">
                <button onClick={onClose} className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 transition-colors rounded-full p-2 z-10 shadow-lg"><X size={24} /></button>
                <div className="relative h-64 rounded-t-2xl overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-6 text-4xl font-black text-white tracking-tighter">{event.title}</h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-300 mb-6">{event.description}</p>
                    <div className="flex justify-between items-center gap-4">
                        <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                            <PlayCircle size={20} /> {event.time ? 'Attend Now' : 'Watch Now'}
                        </button>
                        <button onClick={() => onToggleSave(event)} className={`${isSaved ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'} text-white font-bold p-3 rounded-lg transition-all duration-300 transform hover:scale-105`}>
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};


// --- Main Page Component ---

export default function EntertainmentPage({ onBack }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myList, setMyList] = useState([]);

  // Load saved list from local storage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('myList');
    if (saved) {
      setMyList(JSON.parse(saved));
    }
  }, []);

  // Save list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const handleToggleSave = (event) => {
    setMyList(prevList => {
      const isSaved = prevList.some(item => item.id === event.id);
      if (isSaved) {
        return prevList.filter(item => item.id !== event.id);
      } else {
        return [...prevList, event];
      }
    });
  };

  const isEventSaved = (eventId) => myList.some(item => item.id === eventId);

  const allContent = [...liveEvents, ...pastEvents, ...immersiveFilms, ...interactiveMusic, ...vrArcade, ...virtualGalleries, ...immersiveTravel, ...educationalExperiences, ...wellnessAndMeditation];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 pb-28">
      <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
        &larr; Back to Main Gallery
      </button>

      {/* Live Events Section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <Radio className="text-red-500 animate-pulse" size={32} />
          <h2 className="text-4xl font-bold tracking-tight">Live Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {liveEvents.map(event => (
            <div key={event.id} className="bg-slate-800/40 rounded-xl overflow-hidden group cursor-pointer border border-transparent hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/20" onClick={() => setSelectedEvent(event)}>
              <div className="relative h-56">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">{event.time}</div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <p className="text-sm text-gray-300">{event.artist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Dynamic Categories Section --- */}
      {allCategories.map(category => {
          const items = category.dataKey === 'myList' ? myList : category.data;
          if (items.length === 0 && category.dataKey === 'myList') {
              return (
                  <section key={category.name} className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                          <category.icon className={category.accentColor} size={32} />
                          <h2 className="text-3xl font-bold tracking-tight">{category.name}</h2>
                      </div>
                      <div className="text-center py-10 px-6 bg-slate-800/40 rounded-lg border border-dashed border-slate-700">
                          <Bookmark size={48} className="mx-auto text-slate-500 mb-4" />
                          <h3 className="text-xl font-semibold">Your List is Empty</h3>
                          <p className="text-slate-400">Click the bookmark icon on any content to save it here for later.</p>
                      </div>
                  </section>
              )
          }

          return (
              <section key={category.name} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                      <category.icon className={category.accentColor} size={32} />
                      <h2 className="text-3xl font-bold tracking-tight">{category.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {items.map(event => (
                      <div key={event.id} className={`bg-slate-800/40 rounded-xl overflow-hidden group cursor-pointer border border-transparent ${category.borderColor} transition-all duration-300 shadow-md ${category.shadowColor}`} onClick={() => setSelectedEvent(event)}>
                        <div className="relative h-64">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <PlayCircle size={64} className="text-white/80 transform group-hover:scale-110 transition-transform"/>
                          </div>
                          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/90 to-transparent w-full">
                            <h3 className="text-lg font-bold text-white leading-tight">{event.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </section>
          )
      })}

      {/* VR Device Advisory Section */}
      <section className="mt-20 mb-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-800 to-slate-800/60 border border-cyan-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-cyan-900/20">
              <Headset className="text-cyan-400 w-24 h-24 md:w-32 md:h-32 flex-shrink-0 animate-pulse" strokeWidth={1.5}/>
              <div>
                  <h2 className="text-2xl font-bold mb-3 tracking-tight">Optimized for Virtual Reality</h2>
                  <p className="text-slate-300">
                      For the most immersive experience, all videos and interactive content on this platform are designed to be viewed with a
                      <b className="text-white"> Left and Right (L/R) virtual reality device.</b>
                      Step inside the story and experience entertainment in a whole new dimension.
                  </p>
              </div>
          </div>
      </section>


      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onToggleSave={handleToggleSave}
        isSaved={selectedEvent ? isEventSaved(selectedEvent.id) : false}
      />
    </div>
  );
}
