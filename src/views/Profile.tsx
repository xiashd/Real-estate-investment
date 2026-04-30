import React from 'react';
import {Settings, Heart, ShieldCheck, ChevronRight, Camera, LogOut} from 'lucide-react';
import {cn} from '../lib/utils';

export function ProfileView() {
  const user = {
    name: '张先生',
    phone: '138****0001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Profile Section */}
      <div className="bg-white px-6 pt-16 pb-10 rounded-b-[50px] shadow-sm border-b border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">管理中心</h1>
          <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-[32px] object-cover shadow-2xl shadow-primary/20 border-4 border-white" />
            <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">{user.name}</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">{user.phone}</p>
            <div className="flex gap-2 mt-3">
              <span className="text-[9px] px-2.5 py-1 bg-primary text-white rounded-full font-black uppercase tracking-tighter shadow-sm shadow-primary/20">认证用户</span>
              <span className="text-[9px] px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full font-black uppercase tracking-tighter">客户经理</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-5 space-y-4">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
          <MenuItem icon={<Heart size={18} />} title="我的收藏" subtitle="快速访问已收藏的房源" />
          <MenuItem icon={<ShieldCheck size={18} />} title="服务与隐私" border={false} />
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 mt-8">
           <button className="w-full flex items-center justify-center gap-2 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
             <LogOut size={16} />
             退出登录系统
           </button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[9px] text-slate-300 tracking-[0.4em] font-black uppercase">V 1.0.4 • 三箭房产资产管理</p>
      </div>
    </div>
  );
}

function MenuItem({icon, title, subtitle, border = true}: {icon: React.ReactNode, title: string, subtitle?: string, border?: boolean}) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-6 active:bg-slate-50 transition-colors",
      border && "border-b border-slate-100"
    )}>
      <div className="flex items-center gap-5">
        <div className="w-11 h-11 bg-slate-50 text-primary rounded-2xl flex items-center justify-center shadow-inner border border-slate-100">
          {icon}
        </div>
        <div className="text-left">
          <div className="text-sm font-black text-slate-800 tracking-tight">{title}</div>
          {subtitle && <div className="text-[10px] text-slate-400 mt-0.5 font-medium uppercase tracking-tight">{subtitle}</div>}
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-200" />
    </button>
  );
}
