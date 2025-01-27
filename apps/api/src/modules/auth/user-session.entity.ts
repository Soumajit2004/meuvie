import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSession {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  expiresAt: Date;
}