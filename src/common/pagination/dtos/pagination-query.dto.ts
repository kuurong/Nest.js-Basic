import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive() //숫자 +인지
  @Type(() => Number)
  limit?: number = 10; //default

  @IsOptional()
  @IsPositive() //숫자 +인지
  @Type(() => Number)
  page?: number = 1;
}
