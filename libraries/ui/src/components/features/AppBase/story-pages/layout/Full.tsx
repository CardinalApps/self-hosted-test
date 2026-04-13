import AppPage from '../../AppPage'

import WrittenText from '../../../../typography/WrittenText'

import { PAGE_LAYOUT } from '../../../../../store/slices/layout'

function FullPage() {
  return (
    <AppPage layout={PAGE_LAYOUT.full} style={{ backgroundColor: '#a4d8b5', paddingLeft: 120, paddingTop: 40, height: '100%' }}>
      <WrittenText>
        <p>Sample</p>
        <p>Sample</p>
        <p>Sample</p>
        <p>Sample</p>
        <p>Sample</p>
        <p>The <code>full</code> layout provides the most immersive page experience.</p>
        <ul>
          <li><strong>Inherits:</strong> none</li>
          <li>
            <strong>Features:</strong>
            <ul>
              <li>Includes the app header without a solid background when glass is disabled.</li>
              <li>Includes the navigation sidebar, forced in collapsed mode.</li>
              <li>Margins and padding are not handled automatically.</li>
              <li>Scrolling is not handled automatically..</li>
            </ul>
          </li>
        </ul>
      </WrittenText>
    </AppPage>
  )
}

export default FullPage
