import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { toBoolean } from '../../../utils/transformers'

export class UpdateUserDto {
  @Transform(toBoolean)
  @IsBoolean()
  @IsOptional()
  enabled?: boolean

  @IsString()
  @IsOptional()
  password?: string
}
