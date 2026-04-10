// frontend/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import komponen Image Next.js
import { useMenuStore } from '../store/useMenuStore';
import MenuItem from '../components/MenuItem';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Folder, 
  LayoutGrid, 
  Grip
} from 'lucide-react';

export default function Home() {
  const { menus, fetchMenus, selectedMenu, setSelectedMenu, saveMenu } = useMenuStore();
  const [isExpandAll, setIsExpandAll] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [parentName, setParentName] = useState<string>('');

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  useEffect(() => {
    setFormData({ name: selectedMenu?.name || '' });
    if (selectedMenu && selectedMenu.parentId) {
      const parent = menus.find((m) => m.id === selectedMenu.parentId);
      setParentName(parent?.name || '');
    } else {
      setParentName('');
    }
  }, [selectedMenu, menus]);

  const handleSave = async () => {
    if (!formData.name.trim()) return toast.error('Nama menu harus diisi');
    try {
      await saveMenu({ ...selectedMenu, name: formData.name });
      toast.success('Menu berhasil disimpan!');
    } catch (e) {
      toast.error('Gagal menyimpan menu');
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <Toaster position="top-right" />

      {/* SIDEBAR BIRU */}
      <aside className="w-[280px] bg-[#0d47a1] text-white flex flex-col rounded-r-[2rem] my-4 ml-4 overflow-y-auto">
        <div className="p-8 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex-shrink-0">
               <Image 
                  src="/logo stk.svg" 
                  alt="STK Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
               />
            </div>
            <div className="leading-tight text-sm font-bold tracking-wide">
              Solusi<br/>Teknologi<br/>Kreatif
            </div>
          </div>
          <MenuIcon />
        </div>

        <nav className="flex flex-col px-4 gap-2 text-sm font-medium text-blue-100">
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><Folder size={20} /> Systems</a>
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><LayoutGrid size={20} /> System Code</a>
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><LayoutGrid size={20} /> Properties</a>
          <a href="#" className="flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-sm"><LayoutGrid size={20} className="text-blue-600" /> Menus</a>
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><LayoutGrid size={20} /> API List</a>
          
          <div className="my-2 border-t border-blue-700/50" />
          
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><Folder size={20} /> Users & Group</a>
          <a href="#" className="flex items-center gap-4 p-4 hover:bg-blue-800 rounded-2xl transition-colors"><Folder size={20} /> Competition</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-6">
          <Folder size={16} className="text-gray-300" /> / Menus
        </div>

        {/* HEADER TITLE */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#0d47a1] p-3 rounded-full text-white">
            <Grip size={28} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Menus</h1>
        </div>

        <div className="flex gap-16 items-start max-w-6xl">
          
          {/* Menu Three */}
          <div className="flex-1 max-w-[400px]">
            {/* Dropdown Menu */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Menu</label>
              <div className="relative">
                <select className="w-full appearance-none bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium">
                  <option>system management</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Expand / Collapse Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                className="bg-[#1e293b] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors"
                onClick={() => setIsExpandAll(true)}
              >
                Expand All
              </button>
              <button
                className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpandAll(false)}
              >
                Collapse All
              </button>
            </div>
            <div className="pl-2">
              {menus.length === 0 ? (
                <p className="text-gray-400 text-sm">Belum ada data. Buat root menu dari panel kanan.</p>
              ) : (
                menus.map((menu) => (
                  <MenuItem key={menu.id} item={menu} isExpandAll={isExpandAll} />
                ))
              )}
            </div>
          </div>

          {/* Form Detail */}
          <div className="flex-1 max-w-sm pt-4">
            {selectedMenu ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Menu ID</label>
                  <input
                    type="text"
                    disabled
                    value={selectedMenu.id === 'new' ? 'Auto Generated' : selectedMenu.id}
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Depth</label>
                  <input
                    type="text"
                    disabled
                    value={selectedMenu.depth || 0}
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Parent Data</label>
                  <input
                    type="text"
                    disabled
                    value={parentName || 'System'}
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    placeholder="Masukkan nama menu..."
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl text-gray-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-[#0d47a1] hover:bg-blue-800 text-white py-4 rounded-full font-bold transition-colors mt-4 text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400 text-sm">
                <button
                  className="bg-blue-50 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 font-bold transition-colors"
                  onClick={() => setSelectedMenu({ id: 'new', name: '', parentId: null, depth: 0 })}
                >
                  + Create Root Menu
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper icons
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="12" y2="18"></line>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}