import { Injectable } from '@nestjs/common';
import { Artist } from './artist.model';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }
}
