'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus } from 'lucide-react'; 
import { Menu, useMenuStore } from '../store/useMenuStore'; 

export default function MenuItem({ item, isExpandAll }: { item: Menu, isExpandAll: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedMenu, setSelectedMenu } = useMenuStore(); 

  const hasChildren = item.children && item.children.length > 0;
  const expanded = isExpandAll || isOpen;
  const isActive = selectedMenu?.id === item.id;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 py-2 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors"
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-4" />
          )}
        </button>

        <span
          className={`cursor-pointer transition-colors text-sm ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-black'}`}
          onClick={() => setSelectedMenu(item)}
        >
          {item.name}
        </span>

        {/* Tombol (+) Biru hanya muncul saat item diklik/aktif atau di-hover */}
        <button
          className={`ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMenu({ id: 'new', name: '', parentId: item.id, depth: item.depth + 1 });
          }}
          title="Tambah Sub-Menu"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>

      {expanded && hasChildren && (
        <div className="ml-[9px] pl-5 border-l border-gray-200 relative">
          {item.children!.map((child) => (
             <div key={child.id} className="relative">
                {/* Garis Horizontal tipis (L-Shape) */}
                <div className="absolute w-4 border-t border-gray-200 left-[-20px] top-[18px]"></div>
                <MenuItem item={child} isExpandAll={isExpandAll} />
             </div>
          ))}
        </div>
      )}
    </div>
  );
}