import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Photo is required' })
  photo: string;

  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
}
