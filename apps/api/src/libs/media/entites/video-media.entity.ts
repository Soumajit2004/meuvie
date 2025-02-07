import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VideoMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  url: string;
}
