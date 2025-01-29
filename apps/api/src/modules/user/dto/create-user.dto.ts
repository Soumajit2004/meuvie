import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(4)
  username: string;
}