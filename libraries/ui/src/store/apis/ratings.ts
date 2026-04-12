import { baseHomeServerApi } from './baseHomeServerApi'
import { MusicTrackType } from './musicTracks'

export type RatingType = {
  id: number,
  ratingId: string,
  rating: number,
  track: MusicTrackType,
  createdAt: string,
  updatedAt: string,
}

export const ratingsApi = baseHomeServerApi
  .enhanceEndpoints({
    addTagTypes: ['MusicTrackRatings', 'MusicTracks'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      setRating: builder.mutation<RatingType, { trackId: string, rating: number }>({
        query: (body) => ({
          url: '/ratings',
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['MusicTracks'],
      }),

      deleteRating: builder.mutation<void, { trackId: string }>({
        query: ({ trackId }) => ({
          url: `/ratings/${trackId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['MusicTracks'],
      }),
    }),
  })

export const {
  useSetRatingMutation,
  useDeleteRatingMutation,
} = ratingsApi
