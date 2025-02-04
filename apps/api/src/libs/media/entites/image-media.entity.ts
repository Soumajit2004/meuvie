import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageMedia {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fileName: string;

  @Column()
  url: string;
}
