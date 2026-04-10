import { create } from 'zustand';
import axios from 'axios';

// Gunakan variabel dari .env, dengan fallback ke localhost jika env tidak terbaca
const api = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api' 
});

export interface Menu {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  orderIndex: number;
  children?: Menu[];
}

interface MenuState {
  menus: Menu[];
  selectedMenu: Partial<Menu> | null;
  fetchMenus: () => Promise<void>;
  setSelectedMenu: (menu: Partial<Menu> | null) => void;
  saveMenu: (menu: Partial<Menu>) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  menus: [],
  selectedMenu: null,

  fetchMenus: async () => {
    try {
      const response = await api.get('/menus');
      set({ menus: response.data });
    } catch (error) {
      console.error("Gagal mengambil data menu", error);
    }
  },

  setSelectedMenu: (menu) => set({ selectedMenu: menu }),

  saveMenu: async (menu) => {
    try {
      if (menu.id && menu.id !== 'new') {
        // Jika ada ID (bukan 'new'), lakukan Update (PUT)
        await api.put(`/menus/${menu.id}`, { name: menu.name });
      } else {
        // Jika tidak ada ID atau 'new', lakukan Create (POST)
        await api.post('/menus', { name: menu.name, parentId: menu.parentId || null });
      }
      // Refresh data menu setelah sukses save
      await get().fetchMenus();
      // Reset form
      set({ selectedMenu: null });
    } catch (error) {
      console.error("Gagal menyimpan menu", error);
      throw error;
    }
  }
}));