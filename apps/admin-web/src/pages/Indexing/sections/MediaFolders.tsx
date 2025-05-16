import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import H3 from '@cardinalapps/ui/src/components/typography/H3'
import Card from '@cardinalapps/ui/src/components/layout/Card'
import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'

import homeServerAPI from '@cardinalapps/ui/src/lib/homeserver/homeServerAPI'

import i18n from '../i18n.json'
import '../styles.css'

type MediaDirs = {
  music?: string,
  photos?: string,
  movies?: string,
  tv?: string,
}

function MediaFolders() {
  const { lang } = useSelector(settingsSelectors.current)
  const [mediaDirs, setMediaDirs] = useState<MediaDirs>({})

  /**
   * Fetch media directories on page load.
   */
  useEffect(() => {
    homeServerAPI('/index/directories')
      .then((res: MediaDirs) => {
        setMediaDirs(res)
      })
      .catch(() => {
        console.error('Could not fetch media directories')
      })
  }, [])

  return (
    <Card className={'card'}>
      <header>
        <H3 className={'title'}>{i18n['dirs.title'][lang]}</H3>
        <i className="far fa-question-circle" title={i18n['dirs.tooltip-docker'][lang]} />
      </header>
      <ul className={'list'}>
        <li>
          <strong>
            <i className="far fa-folder-open" />
            {i18n['dirs.music'][lang]}
          </strong>
          <span>{mediaDirs?.music ? mediaDirs.music : i18n['dirs.no-dir'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-folder-open" />
            {i18n['dirs.photos'][lang]}
          </strong>
          <span>{mediaDirs?.photos ? mediaDirs.photos : i18n['dirs.no-dir'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-folder-open" />
            {i18n['dirs.movies'][lang]}
          </strong>
          <span>{mediaDirs?.movies ? mediaDirs.movies : i18n['dirs.no-dir'][lang]}</span>
        </li>
        <li>
          <strong>
            <i className="far fa-folder-open" />
            {i18n['dirs.tv'][lang]}
          </strong>
          <span>{mediaDirs?.tv ? mediaDirs.tv : i18n['dirs.no-dir'][lang]}</span>
        </li>
      </ul>
    </Card>
  )
}

export default MediaFolders
