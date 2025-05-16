import { useSelector } from 'react-redux'

import AppPage from '../../AppPage'

import WrittenText from '../../../../typography/WrittenText'

import { homeServerSelectors } from '../../../../../store/slices/homeServer'

import { PAGE_LAYOUT } from '../../../../../store/slices/layout'

function SSEPage() {
  const latestEvent = useSelector(homeServerSelectors.latestEvent)

  return (
    <AppPage layout={PAGE_LAYOUT.standard} pageTitle="Feature: Server-side events">
      <WrittenText>
        <p>Latest server side event:</p>
        <pre>
          {JSON.stringify(latestEvent, null, 2)}
        </pre>
      </WrittenText>
    </AppPage>
  )
}

export default SSEPage
