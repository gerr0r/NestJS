import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  origin: string;

  @Column()
  active: boolean;

  @ManyToOne(() => User, (user) => user.artists, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
