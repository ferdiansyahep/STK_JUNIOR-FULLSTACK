import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository, IsNull } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    let depth = 0;
    
    if (createMenuDto.parentId) {
      const parent = await this.menuRepo.findOne({ where: { id: createMenuDto.parentId } });
      if (!parent) throw new NotFoundException('Parent menu not found');
      depth = parent.depth + 1;
    }

    // Tentukan urutan terakhir
const siblings = await this.menuRepo.find({ 
  where: { parentId: createMenuDto.parentId ? createMenuDto.parentId : IsNull() } 
});
    const orderIndex = siblings.length;

    const newMenu = this.menuRepo.create({
      ...createMenuDto,
      depth,
      orderIndex,
    });
    
    return this.menuRepo.save(newMenu);
  }

  async findAllTree() {
    const allMenus = await this.menuRepo.find({
      order: { orderIndex: 'ASC' },
    });

    // Helper function untuk merakit flat array menjadi nested JSON Tree
    const buildTree = (menus: Menu[], parentId: string | null = null): any[] => {
      return menus
        .filter((menu) => menu.parentId === parentId)
        .map((menu) => ({
          ...menu,
          children: buildTree(menus, menu.id),
        }));
    };

    return buildTree(allMenus, null);
  }

  async findOne(id: string) {
    const menu = await this.menuRepo.findOne({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    Object.assign(menu, updateMenuDto);
    return this.menuRepo.save(menu);
  }

  async remove(id: string) {
    const menu = await this.findOne(id);
    
    // Cek apakah punya anak
    const children = await this.menuRepo.find({ where: { parentId: id } });
    if (children.length > 0) {
      throw new Error('Cannot delete menu with existing children. Delete children first.');
    }

    return this.menuRepo.remove(menu);
  }
}