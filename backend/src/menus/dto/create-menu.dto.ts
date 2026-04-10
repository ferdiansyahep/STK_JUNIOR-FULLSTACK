import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'System Management' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'uuid-parent-kalo-ada' })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}