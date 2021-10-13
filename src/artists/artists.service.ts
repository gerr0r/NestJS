import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  async getAllArtists(): Promise<Artist[]> {
    const artists = await this.repository.find();
    return artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.repository.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  addArtist(dto: AddArtistDto): Promise<Artist> {
    return this.repository.addArtist(dto);
  }

  async delArtist(id: string): Promise<void> {
    const { affected } = await this.repository.delete(id);
    if (affected === 0)
      throw new NotFoundException('Artist not found. Delete fialed');
  }

  async modArtistActiveState(id: string, active: boolean): Promise<Artist> {
    const artist = await this.getArtistById(id);
    artist.active = active;

    await this.repository.save(artist);
    return artist;
  }

  findArtists(dto: FindArtistDto): Promise<Artist[]> {
    return this.repository.findArtist(dto);
  }
}
