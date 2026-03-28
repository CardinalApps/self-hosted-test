import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsIn } from 'class-validator'

import { Pagination } from '../../../dtos/pagination.dto'
import { toString } from '../../../utils/transformers'
import { QueueType } from './CreatePlaybackQueue'

enum AllowedMusicTracksOrderBy {
  'createdAt' = 'createdAt',
}

class QueuePagination extends Pagination {
  @Transform(({ value }) => String(value))
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AllowedMusicTracksOrderBy))
  sort?: AllowedMusicTracksOrderBy = AllowedMusicTracksOrderBy.createdAt
}

export class QueryPlaybackQueuesDto extends QueuePagination {
  @Transform(toString)
  @IsOptional()
  @IsIn(['static', 'dynamic'])
  type?: QueueType
}
