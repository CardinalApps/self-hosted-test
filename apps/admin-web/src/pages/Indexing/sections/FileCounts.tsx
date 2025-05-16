import { useEffect } from 'react'
import { useAppDispatch } from '@cardinalapps/ui/src/hooks/useAppDispatch'
import { useAppSelector } from '@cardinalapps/ui/src/hooks/useAppSelector'

import H3 from '@cardinalapps/ui/src/components/typography/H3'
import Card from '@cardinalapps/ui/src/components/layout/Card'

import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'
import { indexingSelectors } from '@cardinalapps/ui/src/store/slices/indexing'
import fetchTotalFileCounts from '@cardinalapps/ui/src/store/slices/indexing/thunks/fetchTotalFileCounts'

import { formatWithCommas } from '@cardinalapps/ui/src/lib/formatting/number'

import i18n from '../i18n.json'
import '../styles.css'

function FileCounts() {
  const dispatch = useAppDispatch()
  const { lang } = useAppSelector(settingsSelectors.current)
  const totalMusicFilesIndexed = useAppSelector(indexingSelectors.totalMusicFilesIndexed)
  const totalPhotoFilesIndexed = useAppSelector(indexingSelectors.totalPhotoFilesIndexed)
  const totalMovieFilesIndexed = useAppSelector(indexingSelectors.totalMovieFilesIndexed)
  const totalTVFilesIndexed = useAppSelector(indexingSelectors.totalTVFilesIndexed)

  /**
   * On page load, fetch the total file counts.
   */
  useEffect(() => {
    dispatch(fetchTotalFileCounts())
  }, [])

  return (
    <Card className={'card'}>
      <header>
        <H3 className={`title`}>{i18n['counts.title'][lang]}</H3>
      </header>
      <ul className={'list'}>
        <li>
          <strong>
            <i className="far fa-file-audio" />
            {i18n['counts.songs'][lang]}
          </strong>
          <span>{formatWithCommas(totalMusicFilesIndexed)} {i18n['files'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-file-image" />
            {i18n['counts.photos'][lang]}
          </strong>
          <span>{formatWithCommas(totalPhotoFilesIndexed)} {i18n['files'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-file-video" />
            {i18n['counts.movies'][lang]}
          </strong>
          <span>{formatWithCommas(totalMovieFilesIndexed)} {i18n['files'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-file-video" />
            {i18n['counts.tv'][lang]}
          </strong>
          <span>{formatWithCommas(totalTVFilesIndexed)} {i18n['files'][lang]}</span>
        </li>
      </ul>
    </Card>
  )
}

export default FileCounts
