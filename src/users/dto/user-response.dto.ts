import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;

  @Exclude()
  password?: string; // Exclude password from serialization

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
