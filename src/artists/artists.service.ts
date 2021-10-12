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

  // getAllArtists(): Artist[] {
  //   return this.artists;
  // }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.repository.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async addArtist(dto: AddArtistDto): Promise<Artist> {
    const { name, origin, active = true } = dto;
    const artist = this.repository.create({
      name,
      origin,
      active
    });

    await this.repository.save(artist);
    return artist;
  }

  // delArtist(id: string): void {
  //   const preLength = this.artists.length;
  //   this.artists = this.artists.filter((artist) => artist.id !== id);
  //   if (this.artists.length === preLength)
  //     throw new NotFoundException('Artist not found. Delete fialed');
  // }
  // modArtistActiveState(id: string, active: boolean) {
  //   const artist = this.getArtistById(id);
  //   artist.active = active;
  //   return artist;
  // }
  // findArtists(dto: FindArtistDto): Artist[] {
  //   const { active, name, origin } = dto;
  //   let artists = this.artists;
  //   if (active) artists = artists.filter((artist) => artist.active === active);
  //   if (name) artists = artists.filter((artist) => artist.name.includes(name));
  //   if (origin)
  //     artists = artists.filter((artist) => artist.origin.includes(origin));
  //   return artists;
  // }
}
