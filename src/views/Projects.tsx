import React, {useState} from 'react';
import {Search, Filter, MapPin, Heart, ListFilter} from 'lucide-react';
import {mockProjects} from '../data/mockData';
import {Link} from 'react-router-dom';
import {cn} from '../lib/utils';
import {motion} from 'motion/react';

const FILTER_OPTIONS = [
  {label: '区域', key: 'area'},
  {label: '价格', key: 'price'},
  {label: '用途', key: 'usage'},
  {label: '排序', key: 'sort'},
];

export function ProjectsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['p2']));

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

  return (
    <div className="pb-20 flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 shadow-sm border-b border-slate-100">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索项目名称" 
              className="w-full bg-slate-100 border-none px-10 py-2.5 rounded-xl text-sm placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="flex bg-white">
          {FILTER_OPTIONS.map((opt) => (
            <button key={opt.key} className="flex-1 py-3 text-xs font-bold text-slate-500 flex items-center justify-center gap-1 uppercase tracking-tight active:text-primary transition-colors">
              {opt.label} <ListFilter size={12} className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="p-4 space-y-5">
        {mockProjects.filter(p => p.name.includes(searchTerm)).map((project) => (
          <motion.div
            layout
            key={project.id}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
          >
            <Link to={`/project/${project.id}`} className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
              <div className="relative h-52">
                <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <button 
                  onClick={(e) => toggleFavorite(e, project.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
                >
                  <Heart 
                    size={18} 
                    fill={favorites.has(project.id) ? "currentColor" : "none"} 
                    className={favorites.has(project.id) ? "text-red-500" : "text-slate-400"} 
                  />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-1.5 leading-none">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] px-2 py-1 bg-primary/80 backdrop-blur-sm text-white rounded font-bold uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-primary transition-colors">{project.name}</h3>
                  <div className="text-[10px] text-primary-light bg-blue-50 px-2 py-1 rounded-sm font-black border border-blue-100">
                    {project.listingCount} 套房源
                  </div>
                </div>
                
                <div className="flex items-center text-slate-400 text-[11px] mb-4 font-medium italic">
                  <MapPin size={12} className="mr-1 opacity-70" />
                  <span>{project.location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">建筑体量</span>
                    <span className="text-xs font-black text-slate-700">{project.totalArea}</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">参考均价</span>
                    <span className="text-xs font-black text-primary">{project.rentRange.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
