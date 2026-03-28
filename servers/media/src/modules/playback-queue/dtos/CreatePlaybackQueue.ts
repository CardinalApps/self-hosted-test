import { IsArray, IsOptional, IsString } from 'class-validator'
import { Library } from '../../library/library.entity'
import { PlaybackQueueItem } from '../playback-queue-item.entity'

export type QueueType = 'static' | 'dynamic'
export type DynamicQueueType = 'true_shuffle'

export class CreatePlaybackQueueDto {
  @IsString()
  type: QueueType

  @IsString()
  @IsOptional()
  dynamicType?: DynamicQueueType

  @IsArray()
  @IsOptional()
  libraries?: Partial<Library>[]

  @IsArray()
  @IsOptional()
  staticItems?: Partial<PlaybackQueueItem>[]
}
