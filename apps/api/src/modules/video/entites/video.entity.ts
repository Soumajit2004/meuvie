import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoMedia } from 'src/libs/media/entites/video-media.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ default: 0 })
  views: number;

  @JoinColumn()
  @OneToOne(() => VideoMedia, { eager: true })
  media: VideoMedia;

  @Column({ default: () => 'NOW()', type: 'datetime' })
  createdAt: Date;
}
