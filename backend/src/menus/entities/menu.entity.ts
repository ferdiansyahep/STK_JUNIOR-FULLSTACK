import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  parentId: string | null;

  @Column({ type: 'int', default: 0 })
  depth: number;

  @Column({ type: 'int', default: 0 })
  orderIndex: number;
}