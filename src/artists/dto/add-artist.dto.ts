import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AddArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  origin: string;

  // @IsBoolean()
  active: boolean;
}
