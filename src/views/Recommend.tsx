import React, {useState, useEffect} from 'react';
import {mockProjects, mockListings} from '../data/mockData';
import {CheckCircle2, ChevronRight, User, Phone, LayoutGrid, DollarSign} from 'lucide-react';
import {cn} from '../lib/utils';
import {motion} from 'motion/react';
import {useSearchParams} from 'react-router-dom';

export function RecommendView() {
  const [searchParams] = useSearchParams();
  const initialListingId = searchParams.get('listingId');

  const [selectedProjectId, setSelectedProjectId] = useState(mockProjects[0].id);
  const [selectedListingId, setSelectedListingId] = useState(initialListingId || '');
  const [leaseType, setLeaseType] = useState('新签');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [intendedArea, setIntendedArea] = useState('');
  const [intendedRent, setIntendedRent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialListingId) {
      const listing = mockListings.find(l => l.id === initialListingId);
      if (listing) {
        setSelectedProjectId(listing.projectId);
        setSelectedListingId(listing.id);
      }
    }
  }, [initialListingId]);

  const filteredListings = mockListings.filter(l => l.projectId === selectedProjectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setIntendedArea('');
    setIntendedRent('');
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50">
      <div className="bg-primary pt-10 pb-16 px-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <h1 className="text-2xl font-black text-white tracking-tight">客户推荐</h1>
        <p className="text-blue-100 text-[10px] mt-1 uppercase tracking-[0.2em] font-bold">推荐管理中心</p>
      </div>

      <div className="-mt-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="p-6 space-y-6">
            {/* Project Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-widest mb-2">
                <div className="w-1 h-3 bg-primary rounded-full" />
                意向房源信息
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">所属项目</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                    value={selectedProjectId}
                    onChange={(e) => {
                      setSelectedProjectId(e.target.value);
                      setSelectedListingId('');
                    }}
                  >
                    {mockProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">意向房源</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                    value={selectedListingId}
                    onChange={(e) => setSelectedListingId(e.target.value)}
                    required
                  >
                    <option value="">请选择具体房源</option>
                    {filteredListings.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">租赁类型</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['新签', '扩租', '续签'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLeaseType(type)}
                        className={cn(
                          "py-2.5 text-[10px] font-black rounded-lg border transition-all uppercase tracking-tighter font-sans",
                          leaseType === type ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-widest mb-2">
                <div className="w-1 h-3 bg-primary rounded-full" />
                客户基本详情
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="客户名称" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium placeholder:text-slate-300 font-sans"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="tel" 
                    placeholder="联系电话" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium placeholder:text-slate-300 font-sans"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Intent Details */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="意向面积" 
                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-xl text-sm font-black placeholder:text-slate-300 font-sans"
                    value={intendedArea}
                    onChange={(e) => setIntendedArea(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="意向租金" 
                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-xl text-sm font-black placeholder:text-slate-300 font-sans"
                    value={intendedRent}
                    onChange={(e) => setIntendedRent(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-2 font-sans"
            >
              确认提交推荐
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <motion.div 
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl max-w-xs">
            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">推荐成功</h3>
            <p className="text-sm text-gray-500">您的推荐申请已提交至后台服务，我们将尽快跟进处理。</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg text-sm">我知道了</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
