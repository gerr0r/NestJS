import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.model';

import { v4 as generateID } from 'uuid';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  addArtist(dto: AddArtistDto): Artist {
    const { name, origin, active = true } = dto;

    const artist: Artist = {
      id: generateID(),
      name,
      origin,
      active
    };

    this.artists.push(artist);
    return artist;
  }

  delArtist(id: string): void {
    const preLength = this.artists.length;
    this.artists = this.artists.filter((artist) => artist.id !== id);
    if (this.artists.length === preLength)
      throw new NotFoundException('Artist not found. Delete fialed');
  }

  modArtistActiveState(id: string, active: boolean) {
    const artist = this.getArtistById(id);
    artist.active = active;
    return artist;
  }

  findArtists(dto: FindArtistDto): Artist[] {
    const { active, name, origin } = dto;
    let artists = this.artists;

    if (active) artists = artists.filter((artist) => artist.active === active);
    if (name) artists = artists.filter((artist) => artist.name.includes(name));
    if (origin)
      artists = artists.filter((artist) => artist.origin.includes(origin));
    return artists;
  }
}
