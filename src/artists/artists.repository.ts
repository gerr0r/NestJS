import { EntityRepository, Repository } from 'typeorm';
import { Artist } from './artist.entity';

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist> {}
