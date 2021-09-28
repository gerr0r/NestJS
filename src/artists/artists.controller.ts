import { Body, Controller, Get, Post } from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Post()
  addArtist(@Body() addArtistDto: AddArtistDto): Artist {
    return this.artistService.addArtist(addArtistDto);
  }
}
