import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(8)
  @Matches(/.*/, {
    // some regex validation if needed
    message: 'Weak password'
  })
  password: string;
}
