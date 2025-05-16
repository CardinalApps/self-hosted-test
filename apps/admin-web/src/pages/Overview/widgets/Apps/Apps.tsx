import { useSelector } from 'react-redux'

import BrandLogo from '@cardinalapps/ui/src/components/layout/BrandLogo'

import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'
import { BrandLogoIcon } from '@cardinalapps/ui/src/components/layout/BrandLogo/BrandLogo'

import i18n from './i18n.json'
import './styles.css'

function Apps() {
  const { lang, open_apps_in_new_tab } = useSelector(settingsSelectors.current)

  return (
    <div className={'apps'}>
      {['music', 'photos', 'cinema'].map((appName: BrandLogoIcon) => {
        return (
          <div className={'app'} key={appName}>
            <a href={`/${appName}`} target={open_apps_in_new_tab ? '_blank' : undefined} title={i18n[`app.title.${appName}`][lang]}>
              <BrandLogo className={'brandLogo'} icon={appName} size="s" />
              <p className={'name'}>{i18n[`app.name.${appName}`]['en']}</p>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default Apps
