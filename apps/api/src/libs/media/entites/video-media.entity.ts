import { Column, Entity } from 'typeorm';

@Entity()
export class VideoMedia {
  @Column({ primary: true, unique: true })
  key: string;

  @Column()
  originalFileName: string;

  @Column()
  mimeType: string;

  @Column()
  url: string;
}
