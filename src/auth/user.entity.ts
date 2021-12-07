import { Artist } from 'src/artists/artist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Artist, (artist) => artist.user, { eager: true })
  // eager is set to true so when user is fetched also all artists associated with user will be fetched
  artists: Artist[];
}
