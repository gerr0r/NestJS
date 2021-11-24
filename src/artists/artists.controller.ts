import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

@Controller('artists')
@UseGuards(AuthGuard())
export class ArtistsController {
  constructor(private service: ArtistsService) {}

  @Get()
  findArtists(@Query() dto: FindArtistDto): Promise<Artist[]> {
    if (Object.keys(dto).length === 0) return this.service.getAllArtists();
    return this.service.findArtists(dto);
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.service.getArtistById(id);
  }

  @Post()
  addArtist(@Body() dto: AddArtistDto): Promise<Artist> {
    return this.service.addArtist(dto);
  }

  @Delete('/:id')
  delArtist(@Param('id') id: string): Promise<void> {
    return this.service.delArtist(id);
  }

  @Patch('/:id/active')
  modArtistActiveState(
    @Param('id') id: string,
    @Body('active') active: boolean
  ): Promise<Artist> {
    return this.service.modArtistActiveState(id, active);
  }
}
