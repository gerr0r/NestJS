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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';
import { FindArtistDto } from './dto/find-artist.dto';

@Controller('artists')
@UseGuards(AuthGuard())
export class ArtistsController {
  constructor(private service: ArtistsService) {}

  @Get()
  findArtists(
    @Query() dto: FindArtistDto,
    @GetUser() user: User
  ): Promise<Artist[]> {
    if (Object.keys(dto).length === 0) return this.service.getAllArtists(user);
    return this.service.findArtists(dto, user);
  }

  @Get('/:id')
  getArtistById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Artist> {
    return this.service.getArtistById(id, user);
  }

  @Post()
  addArtist(@Body() dto: AddArtistDto, @GetUser() user: User): Promise<Artist> {
    return this.service.addArtist(dto, user);
  }

  @Delete('/:id')
  delArtist(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.service.delArtist(id, user);
  }

  @Patch('/:id/active')
  modArtistActiveState(
    @Param('id') id: string,
    @Body('active') active: boolean,
    @GetUser() user: User
  ): Promise<Artist> {
    return this.service.modArtistActiveState(id, active, user);
  }
}
