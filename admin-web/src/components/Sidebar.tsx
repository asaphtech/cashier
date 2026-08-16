import Link from 'next/link';
import { Home, Coffee, ClipboardList, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-amber-500">Kopi Tabo</h1>
        <p className="text-slate-400 text-sm">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/menu" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <Coffee size={20} />
          <span>Menu</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors opacity-50 cursor-not-allowed">
          <ClipboardList size={20} />
          <span>Orders</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors opacity-50 cursor-not-allowed">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
            AD
          </div>
          <div>
            <p className="font-medium text-sm">Admin</p>
            <p className="text-xs text-slate-400">admin@kopitabo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
