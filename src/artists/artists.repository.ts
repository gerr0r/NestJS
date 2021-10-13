import { EntityRepository, Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { AddArtistDto } from './dto/add-artist.dto';

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist> {
  async addArtist(dto: AddArtistDto): Promise<Artist> {
    const { name, origin, active = true } = dto;

    const artist = this.create({
      name,
      origin,
      active
    });

    await this.save(artist);
    return artist;
  }
}
