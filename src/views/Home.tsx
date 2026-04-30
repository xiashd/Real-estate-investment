import React, {useState} from 'react';
import {Search, MapPin, Heart, ChevronRight, Star} from 'lucide-react';
import {mockProjects, mockListings} from '../data/mockData';
import {Link} from 'react-router-dom';
import {motion, AnimatePresence} from 'motion/react';
import {cn} from '../lib/utils';

export function HomeView() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'new'>('recommended');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const banners = [
    {id: 1, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', title: '智能建筑，共筑未来'},
    {id: 2, img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200', title: '优质写字楼，火热招商中'}
  ];

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="h-44 w-full overflow-hidden relative">
        <div className="flex h-full animate-scroll group">
           {banners.map((banner) => (
             <div key={banner.id} className="min-w-full h-full relative">
               <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6">
                 <h2 className="text-white text-lg font-bold tracking-tight">{banner.title}</h2>
                 <p className="text-blue-100/70 text-[10px] mt-1 uppercase tracking-widest">Construction Asset Operations</p>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Quick Stats/Brand */}
      <div className="p-4 flex items-center gap-3 bg-white mb-2 shadow-sm border-b border-slate-100">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
          筑
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800 tracking-tight">三箭房产招商管理</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">房产资产运营管理平台</p>
        </div>
      </div>

      {/* Recommended Projects with Tabs */}
      <div className="mt-2 bg-white min-h-[400px]">
        <div className="px-4 pt-4 pb-2 border-b border-slate-50 flex items-center justify-between">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('recommended')}
              className={cn(
                "relative pb-2 transition-colors text-xs uppercase tracking-tight",
                activeTab === 'recommended' ? "text-primary font-bold" : "text-slate-400"
              )}
            >
              好房推荐
              {activeTab === 'recommended' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              className={cn(
                "relative pb-2 transition-colors text-xs uppercase tracking-tight",
                activeTab === 'new' ? "text-primary font-bold" : "text-slate-400"
              )}
            >
              新上房源
              {activeTab === 'new' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
          <Link to="/projects" className="text-[11px] text-slate-400 flex items-center font-medium bg-slate-50 px-2 py-1 rounded">
            更多项目 <ChevronRight size={12} className="ml-1" />
          </Link>
        </div>

        <div className="p-4 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              className="space-y-4"
            >
              {(activeTab === 'recommended' ? mockListings : [...mockListings].reverse()).map((listing) => (
                <Link to={`/listing/${listing.id}`} key={listing.id} className="block group">
                  <div className="flex gap-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-3 hover:shadow-md transition-all active:scale-[0.99]">
                    <div className="relative w-28 h-28 flex-shrink-0">
                      <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover rounded-xl" />
                      <button 
                        onClick={(e) => toggleFavorite(e, listing.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                      >
                        <Heart size={14} fill={favorites.has(listing.id) ? "currentColor" : "none"} className={favorites.has(listing.id) ? "text-red-500" : ""} />
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">{listing.name}</h3>
                      </div>
                      <div className="flex items-center text-slate-400 text-[10px] mb-2 font-medium">
                        <MapPin size={10} className="mr-1 opacity-60" />
                        <span>{listing.location} · {listing.area}</span>
                      </div>
                      <div className="flex gap-1.5 mt-auto mb-2 overflow-hidden">
                        {listing.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-sm font-bold uppercase tracking-tighter">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-primary font-black text-sm">{listing.rent}</div>
                        <div className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded">待招商</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Building2Icon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12h12" />
      <path d="M6 17h12" />
      <path d="M10 22v-4h4v4" />
    </svg>
  );
}
