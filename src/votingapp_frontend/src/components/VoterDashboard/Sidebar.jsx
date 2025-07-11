import React, { useState } from 'react';
import { Home, Volume2, Settings, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Volume2, label: 'Notifikasi & Broadcast', href: '/notifikasi-broadcast' },
  { icon: Settings, label: 'Pengaturan Sistem', href: '/pengaturan-sistem' },
];

export function Sidebar({ className }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    navigate('/'); // redirect to homepage
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        aria-label="Toggle menu"
        className="fixed top-4 left-4 z-40 rounded-md bg-cream p-2 shadow-md lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity lg:hidden',
          open ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 max-w-[80%] bg-cream border-r border-gray-300 p-4 transition-transform ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:w-[374px] lg:max-w-none lg:p-6',
          className
        )}
      >
        <nav className="flex flex-col h-full">
          <ul className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-dark-gray',
                      'font-poppins text-lg font-medium'
                    )}
                  >
                    <Icon className="h-6 w-6 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Logout button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors font-poppins text-lg font-medium"
            >
              <LogOut className="h-6 w-6" />
              Logout
            </button>
          </div>

          {/* Version */}
          <div className="mt-4 text-center text-xs text-gray-500">v1.0.0</div>
        </nav>
      </aside>
    </>
  );
}
