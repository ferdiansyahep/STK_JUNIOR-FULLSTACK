import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Import TypeOrmModule
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { Menu } from './entities/menu.entity'; // <-- 2. Import Entity Menu

@Module({
  // 3. Tambahkan imports array ini
  imports: [TypeOrmModule.forFeature([Menu])], 
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}