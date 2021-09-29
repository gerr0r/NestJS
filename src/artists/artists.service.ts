import { Injectable } from '@nestjs/common';
import { Artist } from './artist.model';

import { v4 as generateID } from 'uuid';
import { AddArtistDto } from './dto/add-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  addArtist(addArtistDto: AddArtistDto): Artist {
    const { name, origin, active = true } = addArtistDto;

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
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
