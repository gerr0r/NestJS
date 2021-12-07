import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

import { Artist } from './artist.entity';
import { ArtistsRepository } from './artists.repository';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistsRepository)
    private repository: ArtistsRepository
  ) {}

  async getAllArtists(user: User): Promise<Artist[]> {
    const artists = await this.repository.find({ where: { user } });
    return artists;
  }

  async getArtistById(id: string, user: User): Promise<Artist> {
    const artist = await this.repository.findOne({ where: { id, user } });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  addArtist(dto: AddArtistDto, user: User): Promise<Artist> {
    return this.repository.addArtist(dto, user);
  }

  async delArtist(id: string, user: User): Promise<void> {
    const { affected } = await this.repository.delete({ id, user });
    if (affected === 0)
      throw new NotFoundException('Artist not found. Delete fialed');
  }

  async modArtistActiveState(
    id: string,
    active: boolean,
    user: User
  ): Promise<Artist> {
    const artist = await this.getArtistById(id, user);
    artist.active = active;

    await this.repository.save(artist);
    return artist;
  }

  findArtists(dto: FindArtistDto, user: User): Promise<Artist[]> {
    return this.repository.findArtist(dto, user);
  }
}
