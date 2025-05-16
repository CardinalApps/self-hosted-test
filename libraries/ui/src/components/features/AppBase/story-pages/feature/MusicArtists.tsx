import AppPage from '../../AppPage'

import P from '../../../../typography/P'
import Loading from '../../../../layout/Loading'
import MusicArtist from '../../../../interaction/MusicArtist'

import { PAGE_LAYOUT } from '../../../../../store/slices/layout'
import { useGetMusicArtistsQuery } from '../../../../../store/apis/musicArtists'

function MusicReleasesPage() {
  const {
    data: musicArtistsResponse,
    isLoading: musicArtistsLoading,
    error: musicArtistsError = {},
  } = useGetMusicArtistsQuery({
    take: 12,
    skip: 0,
    order: 'asc',
    tracks: true,
    releases: true,
  })
  const [musicArtists = []] = musicArtistsResponse || []

  return (
    <AppPage layout={PAGE_LAYOUT.standard} pageTitle="Feature: Artists">
      <P>This will use releases from your running dev home server.</P>
      {'error' in musicArtistsError && <P>{musicArtistsError?.error}</P>}
      {musicArtistsLoading
        ? <Loading />
        : <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {
              musicArtists.map((artist, i) => {
                return (
                  <MusicArtist
                    key={i}
                    name={artist.name}
                    image="/sample/archspire.jpg"
                    numReleases={artist?.releases.length}
                    numTracks={artist?.tracks?.length}
                  />
                )
              })
            }
          </div>
      }
    </AppPage>
  )
}

export default MusicReleasesPage
