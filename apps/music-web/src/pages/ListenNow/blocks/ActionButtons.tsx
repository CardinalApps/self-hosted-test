import { useAppSelector } from '@cardinalapps/ui/src/hooks/useAppSelector'
import Button from '@cardinalapps/ui/src/components/interaction/Button'

import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'

import i18n from '../i18n.json'

function ActionButtons() {
  const { lang } = useAppSelector(settingsSelectors.current)

  return (
    <div className="listen-now-block" data-block="action-buttons">
      <Button
        action
        icon="fas fa-random"
      >
        {i18n['action-buttons.true-shuffle'][lang]}
      </Button>
    </div>
  )
}

export default ActionButtons
