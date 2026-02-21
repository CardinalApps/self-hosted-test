import { DataSource, ViewColumn, ViewEntity } from "typeorm"
import { MusicTrack } from "../music-track/music-track.entity"
import { File } from '../indexing/entities/file.entity'
import { MusicTrackMetadata } from "../music-track/music-track-metadata.entity"

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('music_track_metadata.metaValue', 'releaseName')
      .addSelect(
        `JSON_GROUP_ARRAY(JSON_OBJECT(
          'id', files.id,
          'absolutePath', files.absolutePath
        ))`,
        'files',
      )
      .from(MusicTrackMetadata, 'music_track_metadata')
      .innerJoin(MusicTrack, 'music_tracks', 'music_tracks.id = music_track_metadata.trackId')
      .innerJoin(File, 'files', 'files.id = music_tracks.fileId')
      .where("music_track_metadata.metaKey = 'album'")
      .groupBy('music_track_metadata.metaValue'),
})
export class MusicReleasesView {
  @ViewColumn()
  releaseName: string

  @ViewColumn()
  files: File[]
}
