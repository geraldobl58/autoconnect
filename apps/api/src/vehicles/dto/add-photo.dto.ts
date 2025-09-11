import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class AddPhotoDto {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/photo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
