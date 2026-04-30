import React, {useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {mockListings, mockProjects} from '../data/mockData';
import {MapPin, Heart, Share2, ChevronLeft, Building2, User, Phone, CheckCircle2, Ruler, LayoutGrid, Wind, Zap} from 'lucide-react';
import {cn} from '../lib/utils';

export function ListingDetailView() {
  const {id} = useParams();
  const navigate = useNavigate();
  const listing = mockListings.find(l => l.id === id);
  const project = mockProjects.find(p => p.id === listing?.projectId);
  const [isFavorite, setIsFavorite] = useState(listing?.isFavorite || false);

  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Header Banner Carousel */}
      <div className="relative h-[250px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-5 pt-12">
          <button onClick={() => navigate(-1)} className="w-11 h-11 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button className="w-11 h-11 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20">
              <Share2 size={20} />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={cn(
                "w-11 h-11 backdrop-blur-xl rounded-2xl flex items-center justify-center transition-colors border",
                isFavorite ? "bg-red-500 text-white border-red-400" : "bg-white/10 text-white border-white/20"
              )}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-10 left-6 right-6">
           <h1 className="text-2xl font-black text-white mb-2 tracking-tight">{listing.name}</h1>
           <div className="flex gap-2">
             {listing.tags.map((tag, i) => (
                <span key={i} className="text-[9px] px-2.5 py-1 bg-primary text-white rounded-sm font-black uppercase tracking-tighter flex items-center gap-1">
                  {tag.includes('空调') ? <Wind size={10} /> : <Zap size={10} />}
                  {tag}
                </span>
             ))}
           </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200 border border-slate-100 mb-5">
           <div className="flex justify-between items-end mb-6">
             <div className="flex flex-col">
               <span className="text-[9px] text-slate-400 mb-1.5 uppercase tracking-[0.2em] font-bold">意向租金</span>
               <span className="text-xl font-black text-primary leading-none uppercase">{listing.rent}</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-[9px] text-slate-400 mb-1.5 uppercase tracking-[0.2em] font-bold">房源面积</span>
               <span className="text-base font-black text-slate-800 leading-none uppercase">{listing.area}</span>
             </div>
           </div>
           <div className="pt-5 border-t border-slate-50 flex items-start gap-3">
             <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-primary flex-shrink-0 border border-slate-100">
                <MapPin size={16} />
             </div>
             <div className="text-xs text-slate-500 leading-relaxed font-bold italic">{listing.location}</div>
           </div>
        </div>

        {/* Listing Details Table */}
        <Section title="房源参数">
          <div className="grid grid-cols-2 gap-y-5 gap-x-10">
            <InfoItem label="所属项目" value={project?.name} />
            <InfoItem label="楼层房号" value={listing.floorRoom} />
            <InfoItem label="房屋类型" value={listing.type} />
            <InfoItem label="土地性质" value={listing.nature} />
            <InfoItem label="装修情况" value={listing.decoration} />
            <InfoItem label="物业费用" value={listing.propertyFee} />
          </div>
          <div className="mt-8 pt-6 border-t border-slate-50">
            <div className="text-[9px] text-slate-400 mb-3 font-black uppercase tracking-[0.3em] text-center">房源详细简介</div>
            <p className="text-xs text-slate-400 leading-relaxed text-left pl-4 border-l-2 border-primary/20 italic">{listing.description}</p>
          </div>
        </Section>

        {/* Consulting Agent */}
        <Section title="咨询信息">
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner">
                <User size={24} />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-slate-800 tracking-tight">{listing.agent?.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold font-mono">{listing.agent?.phone}</div>
              </div>
            </div>
            <a href={`tel:${listing.agent?.phone}`} className="w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <Phone size={18} />
            </a>
          </div>
        </Section>
      </div>

      {/* Floating Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-md mx-auto p-5 pb-8">
          <Link to={`/recommend?listingId=${listing.id}`} className="w-full h-16 bg-primary hover:bg-primary-dark text-white rounded-[24px] flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 group uppercase tracking-[0.2em] font-black transition-all active:scale-[0.98]">
            <CheckCircle2 size={24} />
            确认提交推荐
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({title, children}: {title: string, children: React.ReactNode}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-5 overflow-hidden relative">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(30,58,138,0.3)]" />
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoItem({label, value}: {label: string, value?: string}) {
  return (
    <div className="space-y-1.5">
      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">{label}</div>
      <div className="text-xs font-black text-slate-700 truncate">{value || '--'}</div>
    </div>
  );
}
