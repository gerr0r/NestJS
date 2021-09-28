import { Controller, Get } from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }
}
