import { useSelector } from 'react-redux'

import AppPage from '../../AppPage'

import H3 from '../../../../typography/H3'

import { indexingSelectors } from '../../../../../store/slices/indexing'
import { PAGE_LAYOUT } from '../../../../../store/slices/layout/constants'

function IndexingPage() {
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
  return (
    <AppPage layout={PAGE_LAYOUT['standard']} pageTitle="Libraries slice">
      <H3>Current Progress</H3>
      <ul>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Started at:</span> {runStartedAt || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Current state:</span> {indexingServiceState || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Files found:</span>  {numFilesFound || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Files indexed:</span> {numFilesIndexed || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Files skipped:</span> {numFilesSkipped || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Files errored:</span> {numFilesErrored || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Music found:</span> {musicFound || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Music indexed:</span> {musicIndexed || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Music skipped:</span> {musicSkipped || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Music errored:</span> {musicErrored || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Photos found:</span> {photosFound || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Photos indexed:</span> {photosIndexed || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Photos skipped:</span> {photosSkipped || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Photos errored:</span> {photosErrored || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Movies found:</span> {moviesFound || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Movies indexed:</span> {moviesIndexed || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Movies skipped:</span> {moviesSkipped || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>Movies errored:</span> {moviesErrored || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>TV found:</span> {tvFound || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>TV indexed:</span> {tvIndexed || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>TV skipped:</span> {tvSkipped || '(undefined)'}</li>
        <li><span style={{ minWidth: 150, display: 'inline-block' }}>TV errored:</span> {tvErrored || '(undefined)'}</li>
      </ul>
    </AppPage>
  )
}

export default IndexingPage
