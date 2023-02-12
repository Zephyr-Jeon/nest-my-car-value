import { IsEmail, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
