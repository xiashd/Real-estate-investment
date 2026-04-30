import React, {useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {mockProjects} from '../data/mockData';
import {MapPin, Heart, Share2, Building2, LayoutGrid, CheckCircle2, ChevronLeft, Building, Ruler, ArrowUpRight} from 'lucide-react';
import {motion} from 'motion/react';
import {cn} from '../lib/utils';

export function ProjectDetailView() {
  const {id} = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(project?.isFavorite || false);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Header Banner Carousel (Mocked) */}
      <div className="relative h-[320px] overflow-hidden">
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
        <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-10 left-6 right-6 z-10">
           <div className="flex gap-2 mb-3">
             {project.tags.map((tag, i) => (
               <span key={i} className="text-[9px] px-2.5 py-1 bg-primary text-white rounded-sm font-black uppercase tracking-tighter">
                 {tag}
               </span>
             ))}
           </div>
           <h1 className="text-3xl font-black text-white shadow-sm tracking-tighter leading-none">{project.name}</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-slate-900/40" />
      </div>

      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200 border border-slate-100 mb-5">
           <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
             <div className="px-1">
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">建筑面积</div>
               <div className="text-sm font-black text-slate-800">{project.totalArea}</div>
             </div>
             <div className="px-1">
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">参考租金</div>
               <div className="text-sm font-black text-primary">{project.rentRange.split(' ')[0]}</div>
             </div>
             <div className="px-1">
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">在招房源</div>
               <div className="text-sm font-black text-slate-800">{project.listingCount}套</div>
             </div>
           </div>
           
           <div className="mt-6 pt-6 border-t border-slate-50 flex items-start gap-3">
             <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-primary flex-shrink-0 border border-slate-100">
                <MapPin size={16} />
             </div>
             <div className="text-xs text-slate-500 leading-relaxed font-bold italic">{project.location}</div>
           </div>
        </div>

        {/* Project Overview */}
        <Section title="项目概况">
          <div className="space-y-5">
            <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-primary/20 pl-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-2">
              <InfoItem label="所属项目" value={project.subProject} />
              <InfoItem label="管理面积" value={project.managedArea} />
              <InfoItem label="总建筑面积" value={project.buildingArea} />
              <InfoItem label="空置面积" value={project.vacantArea} />
              <InfoItem label="可招商面积" value={project.rentableArea} />
              <InfoItem label="物业价格" value={project.propertyPrice} />
              <InfoItem label="在租房源均价" value={project.avgRent} />
            </div>
          </div>
        </Section>

        {/* Map View */}
        <Section title="项目位置">
          <div className="bg-slate-100 h-44 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-200">
             <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/121.4737,31.2304,12,0/600x300?access_token=pk.mock" alt="map" className="w-full h-full object-cover opacity-20 grayscale" />
             <div className="absolute inset-0 bg-primary/5 flex items-center justify-center flex-col">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-2 text-primary border border-slate-100 animate-pulse">
                <MapPin size={24} fill="currentColor" fillOpacity={0.1} />
               </div>
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] bg-white px-3 py-1.5 rounded-full shadow-sm">在线互动地图</span>
             </div>
          </div>
        </Section>
      </div>

      {/* Floating Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-md mx-auto p-4 pb-8 flex gap-4">
          <Link to={`/project/${project.id}/listings`} className="flex-[0.4] flex flex-col items-center justify-center border border-slate-200 rounded-2xl py-2.5 text-slate-600 bg-slate-50 active:bg-slate-100 transition-all">
            <LayoutGrid size={20} className="mb-0.5" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">房源列表</span>
          </Link>
          <Link to={`/recommend?projectId=${project.id}`} className="flex-1 flex items-center justify-center gap-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest py-3 shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all">
            <CheckCircle2 size={20} />
            <span>推荐客户</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({title, children, className}: {title: string, children: React.ReactNode, className?: string}) {
  return (
    <div className={cn("bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-5 relative overflow-hidden", className)}>
      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 text-slate-800 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoItem({label, value}: {label: string, value?: string}) {
  return (
    <div>
      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">{label}</div>
      <div className="text-xs font-black text-slate-700">{value || '--'}</div>
    </div>
  );
}
