import React, {useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {mockListings, mockProjects} from '../data/mockData';
import {Search, Filter, ChevronLeft, MapPin, ListFilter, ArrowUpDown} from 'lucide-react';
import {cn} from '../lib/utils';
import {motion} from 'motion/react';

export function ProjectListingListView() {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === projectId);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'area' | 'default'>('default');

  const listings = mockListings.filter(l => l.projectId === projectId && l.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === 'price') return parseFloat(a.rent) - parseFloat(b.rent);
    if (sortBy === 'area') return parseFloat(a.area) - parseFloat(b.area);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md px-5 pt-16 pb-6 shadow-sm border-b border-slate-100 relative z-30">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 active:scale-95 transition-all">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">{project?.name}</h1>
            <p className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase tracking-widest mt-1.5 italic">
              <MapPin size={10} className="text-primary-light" /> {project?.location}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text" 
              placeholder="搜索房源名称" 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-xs font-medium placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
             onClick={() => setSortBy(sortBy === 'price' ? 'area' : sortBy === 'area' ? 'default' : 'price')}
             className="flex items-center gap-2 px-5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <ArrowUpDown size={14} />
            {sortBy === 'price' ? '价格排序' : sortBy === 'area' ? '面积排序' : '智能排序'}
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="p-5 space-y-5 flex-1">
        {sortedListings.length > 0 ? (
          sortedListings.map((listing, index) => (
            <motion.div
              layout
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.05}}
              key={listing.id}
            >
              <Link to={`/listing/${listing.id}`} className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all p-4 group">
                <div className="flex gap-5">
                  <div className="w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded text-[8px] text-white font-black uppercase tracking-widest">可供招商</div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-black text-sm text-slate-800 line-clamp-1 mb-2 tracking-tight uppercase group-hover:text-primary transition-colors">{listing.name}</h3>
                      <div className="flex flex-wrap gap-1.5 overflow-hidden">
                        {listing.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 bg-blue-50 text-primary-light border border-blue-100 rounded-sm font-black tracking-tighter uppercase whitespace-nowrap">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{listing.area}</div>
                      <div className="text-primary font-black text-sm uppercase">{listing.rent}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-[40px] flex items-center justify-center border border-slate-100 mb-4 shadow-inner">
               <ListFilter size={40} className="opacity-20" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30">暂无匹配房源</span>
          </div>
        )}
      </div>
    </div>
  );
}
