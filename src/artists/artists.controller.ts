import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
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

  @Get('/:id')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  addArtist(@Body() addArtistDto: AddArtistDto): Artist {
    return this.artistService.addArtist(addArtistDto);
  }

  @Delete('/:id')
  delArtist(@Param('id') id: string): void {
    this.artistService.delArtist(id);
  }

  @Patch('/:id/active')
  modArtistActiveState(
    @Param('id') id: string,
    @Body('active') active: boolean
  ): Artist {
    return this.artistService.modArtistActiveState(id, active);
  }
}
