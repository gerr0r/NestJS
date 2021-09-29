import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  findArtists(@Query() dto: FindArtistDto): Artist[] {
    if (Object.keys(dto).length === 0)
      return this.artistService.getAllArtists();
    return this.artistService.findArtists(dto);
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  addArtist(@Body() dto: AddArtistDto): Artist {
    return this.artistService.addArtist(dto);
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
