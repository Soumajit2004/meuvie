import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoMedia } from '../../../libs/media/entites/video-media.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ default: 0 })
  views: number;

  @JoinColumn()
  @OneToOne(() => VideoMedia)
  media: VideoMedia;

  @Column({ default: () => 'NOW()', type: 'datetime' })
  createdAt: Date;
}
