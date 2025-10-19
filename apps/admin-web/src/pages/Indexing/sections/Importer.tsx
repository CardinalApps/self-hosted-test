import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import ms from 'ms'

import H5 from '@cardinalapps/ui/src/components/typography/H5'
import Card from '@cardinalapps/ui/src/components/layout/Card'
import Loading from '@cardinalapps/ui/src/components/layout/Loading'
import ProgressBar from '@cardinalapps/ui/src/components/layout/ProgressBar'
import ToggleSwitch from '@cardinalapps/ui/src/components/forms/ToggleSwitch'
import { Columns, Column } from '@cardinalapps/ui/src/components/layout/Columns'
import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'
import { toastActions } from '@cardinalapps/ui/src/store/slices/toast'

import homeServerAPI from '@cardinalapps/ui/src/lib/homeserver/homeServerAPI'
import { formatWithCommas } from '@cardinalapps/ui/src/lib/formatting/number'

import { indexingSelectors, indexingActions, SSEIndexingUpdate } from '@cardinalapps/ui/src/store/slices/indexing'

import { useCreateRunMutation, useUpdateCurrentRunStateMutation } from '@cardinalapps/ui/src/store/apis/runs'

import i18n from '../i18n.json'
import '../styles.css'

function Indexer() {
  const dispatch = useDispatch()
  const { lang } = useSelector(settingsSelectors.current)
  const indexingServiceState = useSelector(indexingSelectors.serverState)
  const runStartedAt = useSelector(indexingSelectors.startedAt)
  const numFilesFound = useSelector(indexingSelectors.filesFound)
  const numFilesIndexed = useSelector(indexingSelectors.filesIndexed)
  const numFilesSkipped = useSelector(indexingSelectors.filesSkipped)
  const numFilesErrored = useSelector(indexingSelectors.filesErrored)
  const musicFound = useSelector(indexingSelectors.musicFound)
  const musicIndexed = useSelector(indexingSelectors.musicIndexed)
  const musicSkipped = useSelector(indexingSelectors.musicSkipped)
  const musicErrored = useSelector(indexingSelectors.musicErrored)
  const photosFound = useSelector(indexingSelectors.photosFound)
  const photosIndexed = useSelector(indexingSelectors.photosIndexed)
  const photosSkipped = useSelector(indexingSelectors.photosSkipped)
  const photosErrored = useSelector(indexingSelectors.photosErrored)
  const moviesFound = useSelector(indexingSelectors.moviesFound)
  const moviesIndexed = useSelector(indexingSelectors.moviesIndexed)
  const moviesSkipped = useSelector(indexingSelectors.moviesSkipped)
  const moviesErrored = useSelector(indexingSelectors.moviesErrored)
  const tvFound = useSelector(indexingSelectors.tvFound)
  const tvIndexed = useSelector(indexingSelectors.tvIndexed)
  const tvSkipped = useSelector(indexingSelectors.tvSkipped)
  const tvErrored = useSelector(indexingSelectors.tvErrored)
  const [startedAtCounter, setStartedAtCounter] = useState(i18n['run.status.not-started'][lang])
  const [indexMusic, setIndexMusic] = useState(true)
  const [indexPhotos, setIndexPhotos] = useState(true)
  const [indexMovies, setIndexMovies] = useState(false)
  const [indexTV, setIndexTV] = useState(false)
  const [createRun, createRunResult] = useCreateRunMutation()
  const [updateCurrentRunState, updateCurrentRunStateResult] = useUpdateCurrentRunStateMutation()

  /**
   * When the big power button is clicked.
   */
  const handlePowerButtonClick = () => {
    if (indexingServiceState === 'idle' || indexingServiceState === 'completed') {
      createRun({
        indexMusic,
        indexPhotos,
        indexMovies,
        indexTV,
      })
    } else if (indexingServiceState === 'indexing') {
      updateCurrentRunState({ action: 'pause' })
        .then(() => {
          //console.log('after pause')
        })
    } else if (indexingServiceState === 'paused') {
      updateCurrentRunState({ action: 'resume' })
    }
  }

  /**
   * When the big power button is clicked (again).
   */
  const handleStopButtonClick = () => {
    updateCurrentRunState({ action: 'stop' })
  }

  /**
   * Format time ago.
   */
  const timeAgo = (fromMs) => {
    if (typeof fromMs === 'number') {
      return `${ms((Date.now() - fromMs), { long: true })}`
    } else {
      return i18n['run.status.not-started'][lang]
    }
  }

  /**
   * Fetch the current indexing state on page load.
   */
  useEffect(() => {
    homeServerAPI('/index/state')
      .then((res: SSEIndexingUpdate) => {
        dispatch(indexingActions.setServerState(res))
      })
      .catch(() => {
        console.error('Could not fetch indexing state')
      })
  }, [])

  /**
   * Handle the createRun query.
   */
  useEffect(() => {
    if (createRunResult.isError) {
      dispatch(toastActions.addToQueue({
        type: 'danger',
        ttl: 10000,
        title: i18n['run.error.cannot-start'][lang],
        showClose: true,
      }))
    }
    if (updateCurrentRunStateResult.isError) {
      dispatch(toastActions.addToQueue({
        type: 'danger',
        ttl: 10000,
        title: i18n['run.error.general-error'][lang],
        showClose: true,
      }))
    }
  }, [createRunResult.status, updateCurrentRunStateResult.status])

  /**
   * Run the real time indexing counter.
   */
  useEffect(() => {
    setStartedAtCounter(timeAgo(runStartedAt))

    const interval = setInterval(() => setStartedAtCounter(timeAgo(runStartedAt)), 1000)
    return () => clearInterval(interval)
  }, [runStartedAt])

  return (
    <Card className={'importerCard'} padding={'thin'}>
      <Columns flexWrap="small">
        <Column className={'runSettingsCol'} cols={4} smallCols={12}>
          <div className={'importerButton'}>
            <div className={'buttonBox'}>
              <button
                type="button"
                className={clsx(
                  'importButton',
                  indexingServiceState === 'indexing' ? 'running' : '',
                  indexingServiceState === 'paused' ? 'paused' : '',
                )}
                onClick={handlePowerButtonClick}
              >
                <i className="fas fa-power-off" />
              </button>
              <Loading className={'spinny'} speed={'1.4'} />
            </div>
          </div>
          <div className={'controlLabel'}>
            {indexingServiceState === 'idle' && <H5 className={'title'}>{i18n['status.title.begin'][lang]}</H5>}
            {indexingServiceState === 'indexing' && <H5 className={'title'}>{i18n['status.title.pause'][lang]}</H5>}
            {indexingServiceState === 'paused' && <H5 className={'title'}>{i18n['status.title.resume'][lang]}</H5>}
            {indexingServiceState === 'completed' && <H5 className={'title'}>{i18n['status.title.begin'][lang]}</H5>}
          </div>
          <div className={'info'}>
            <div className={'indexingRow'}>
              <strong>{i18n['status.current-status'][lang]}</strong>
              {indexingServiceState === 'idle' &&
                <span>{i18n['state.idle'][lang]}</span>
              }
              {indexingServiceState === 'indexing' &&
                <span>{i18n['state.indexing'][lang]}</span>
              }
              {indexingServiceState === 'paused' &&
                <span>
                  {i18n['state.paused'][lang]}
                  <button
                    className={'stopRun'}
                    title={i18n['stop-run.title-attr'][lang]}
                    onClick={handleStopButtonClick}
                  >
                    <i className="far fa-stop-circle" />
                  </button>
                </span>
              }
              {indexingServiceState === 'completed' && numFilesIndexed >= 1 &&
                <span>
                  {i18n['state.completed'][lang]}
                  <i className={`fas fa-check importCompletedIcon`} />
                </span>
              }
              {indexingServiceState === 'completed' && numFilesIndexed === 0 &&
                <span>
                  {i18n['state.completed.no-files-found'][lang]}
                </span>
              }
            </div>
            <div className={'indexingRow'}>
              <strong>{i18n['status.elapsed'][lang]}</strong>
              <span>{startedAtCounter}</span>
            </div>
            <div className={'indexingRow'}>
              <strong>{i18n['options.index-music'][lang]}</strong>
              <span>
                <ToggleSwitch
                  name="index_music"
                  value={indexMusic}
                  disabled={indexingServiceState === 'indexing' || indexingServiceState === 'paused'}
                  onChange={(val) => setIndexMusic(val)}
                />
              </span>
            </div>
            <div className={'indexingRow'}>
              <strong>{i18n['options.index-photos'][lang]}</strong>
              <span>
                <ToggleSwitch
                  name="index_photos"
                  value={indexPhotos}
                  disabled={indexingServiceState === 'indexing' || indexingServiceState === 'paused'}
                  onChange={(val) => setIndexPhotos(val)}
                />
              </span>
            </div>
            <div className={'indexingRow'} title="Coming soon">
              <strong>{i18n['options.index-movies'][lang]}</strong>
              <span>
                <ToggleSwitch
                  name="index_movies"
                  value={indexMovies}
                  disabled={true}
                  onChange={(val) => setIndexMovies(val)}
                />
              </span>
            </div>
            <div className={'indexingRow'} title="Coming soon">
              <strong>{i18n['options.index-tv'][lang]}</strong>
              <span>
                <ToggleSwitch
                  name="index_tv"
                  value={indexTV}
                  disabled={true}
                  onChange={(val) => setIndexTV(val)}
                />
              </span>
            </div>
          </div>
        </Column>
        <Column className={'progressCol'} cols={8} smallCols={12}>
          <div className={'progressItems'}>
            <p>
              <strong>{i18n['status.total-files-found'][lang]}</strong>
              <span>{formatWithCommas(numFilesFound)}</span>
            </p>
            <p>
              <strong>{i18n['status.total-files-indexed'][lang]}</strong>
              <span>{formatWithCommas(numFilesIndexed)}</span>
            </p>
            <p>
              <strong>{i18n['status.total-files-skipped'][lang]}</strong>
              <span>{formatWithCommas(numFilesSkipped)}</span>
            </p>
            <p>
              <strong>{i18n['status.total-files-errored'][lang]}</strong>
              <span>{formatWithCommas(numFilesErrored)}</span>
            </p>
          </div>
          <div className={'progressBar'}>
            <H5>{i18n['status.progress.music'][lang]}</H5>
            <ProgressBar
              current={(musicIndexed + musicSkipped + musicErrored) || 0}
              total={musicFound}
              showCount={true}
            />
          </div>
          <div className={'progressBar'}>
            <H5>{i18n['status.progress.photos'][lang]}</H5>
            <ProgressBar
              current={(photosIndexed + photosSkipped + photosErrored) || 0}
              total={photosFound}
              showCount={true}
            />
          </div>
          <div className={'progressBar'}>
            <H5>{i18n['status.progress.movies'][lang]}</H5>
            <ProgressBar
              current={(moviesIndexed + moviesSkipped + moviesErrored) || 0}
              total={moviesFound}
              showCount={true}
            />
          </div>
          <div className={'progressBar'}>
            <H5>{i18n['status.progress.tv'][lang]}</H5>
            <ProgressBar
              current={(tvIndexed + tvSkipped + tvErrored) || 0}
              total={tvFound}
              showCount={true}
            />
          </div>
        </Column>
      </Columns>
    </Card>
  )
}

export default Indexer
