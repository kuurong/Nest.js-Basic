import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number) //string인 타입의 프로퍼티가 들어올경우 Number로 자동변환해줌
  id?: number;
}
