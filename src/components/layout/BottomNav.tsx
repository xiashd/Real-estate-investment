import React from 'react';
import {Home, Building2, UserCircle, Send} from 'lucide-react';
import {useLocation, Link} from 'react-router-dom';
import {cn} from '../../lib/utils';
import {motion} from 'motion/react';

const navItems = [
  {label: '首页', icon: Home, path: '/'},
  {label: '项目', icon: Building2, path: '/projects'},
  {label: '推荐', icon: Send, path: '/recommend'},
  {label: '我的', icon: UserCircle, path: '/profile'},
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-2 py-1 pb-safe backdrop-blur-md bg-opacity-95">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-colors relative",
                isActive ? "text-primary font-bold" : "text-slate-400"
              )}
            >
              <item.icon size={20} className={cn("mb-1 transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] tracking-tight font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute bottom-0 w-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(30,58,138,0.3)]"
                  transition={{type: 'spring', stiffness: 300, damping: 30}}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
