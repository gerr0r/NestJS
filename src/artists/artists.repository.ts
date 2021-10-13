import { EntityRepository, Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

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

  async findArtist(dto: FindArtistDto): Promise<Artist[]> {
    const { active, name, origin } = dto;

    const query = this.createQueryBuilder('artist');

    if (active) query.andWhere('artist.active = :active', { active });
    if (name) query.andWhere('artist.name iLIKE :name', { name: `%${name}%` });
    if (origin)
      query.andWhere('artist.origin iLIKE :origin', { origin: `%${origin}%` });

    const artists = query.getMany();
    return artists;
  }
}
