import React, { PropsWithChildren, useState } from 'react'

import H4 from '@cardinalapps/ui/src/components/typography/H4'
import Card from '@cardinalapps/ui/src/components/layout/Card'

import ReloadButton from './widgets/components/ReloadButton'

//import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'

import './styles.css'

type WidgetProps = {
  title: string,
  showReload?: boolean,
}

function Widget({ title, children, showReload = false }: PropsWithChildren<WidgetProps>) {
  const [reload, setReload] = useState(Date.now())
  //const { lang } = useSelector(settingsSelectors.current)

  return (
    <Card
      header={
        <div className={'widgetHeader'}>
          {!!title && <H4>{title}</H4>}
          {!!showReload && <ReloadButton onClick={() => setReload(Date.now())} />}
        </div>
      }
      className={'widget'}
      border={3}
      shadow={null}
    >
      {/* @ts-expect-error */}
      {React.cloneElement(children, { reload })}
    </Card>
  )
}

export default Widget
