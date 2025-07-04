import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import H4 from '@cardinalapps/ui/src/components/typography/H4'
import BrandLogo from '@cardinalapps/ui/src/components/layout/BrandLogo'
import Button from '@cardinalapps/ui/src/components/interaction/Button'
import { settingsSelectors } from '@cardinalapps/ui/src/store/slices/settings'
import setSetting from '@cardinalapps/ui/src/store/slices/settings/thunks/set'
import Field from '@cardinalapps/ui/src/components/features/SettingsPanel/Field'
import autoCheckForUpdatesFieldFactory from '@cardinalapps/ui/src/components/features/SettingsPanel/fields/admin/autoCheckForUpdates'
import WrittenText from '@cardinalapps/ui/src/components/typography/WrittenText'

import homeServerAPI from '@cardinalapps/ui/src/lib/homeserver/homeServerAPI'

import i18n from '../i18n.json'

/**
 * Custom settings pages for the Media Server.
 */
function Information() {
  const dispatch = useDispatch()
  const { lang, auto_check_for_updates } = useSelector(settingsSelectors.current)
  const [releaseChannel, setReleaseChannel] = useState()
  const [manualCheckResults, setManualCheckResults] = useState()
  const [manualCheckResultsLoading, setManualCheckResultsLoading] = useState(false)
  const [manualCheckResultsError, setManualCheckResultsError] = useState(false)
  const [appVersionsLoading, setAppVersionsLoading] = useState(true)
  const [appVersionsError, setAppVersionsError] = useState(false)
  const [appVersions, setAppVersions] = useState()
  const autoCheckForUpdatesField = autoCheckForUpdatesFieldFactory('admin', lang)

  const manuallyCheckForUpdates = () => {
    setManualCheckResultsLoading(true)
    homeServerAPI('/updates')
      .then((res) => {
        setManualCheckResults(res)
        setManualCheckResultsError(false)
        setManualCheckResultsLoading(false)
      })
      .catch(() => {
        setManualCheckResults()
        setManualCheckResultsError(true)
        setManualCheckResultsLoading(false)
      })
  }

  useEffect(() => {
    homeServerAPI('/versions')
      .then((res) => {
        setAppVersions(res)
        setAppVersionsError(false)
        setAppVersionsLoading(false)
      })
      .catch(() => {
        setAppVersionsError(true)
        setAppVersionsLoading(false)
      })
  }, [])

  useEffect(() => {
    homeServerAPI('/release-channels')
      .then((res) => {
        setReleaseChannel(res?.current)
      })
      .catch(() => {
        setReleaseChannel(undefined)
      })
  }, [])

  return (
    <>
      <Field>
        <H4>{i18n['apps.self-hosted-apps'][lang]}</H4>
        <WrittenText className={'releaseChannel'}>
          <p dangerouslySetInnerHTML={{
            __html: i18n['manually-check-for-updates.release-channel'][lang].replace('{channel}', releaseChannel || '(not set)'),
          }} />
        </WrittenText>
        {!appVersionsLoading && !appVersionsError &&
          <div className={'versions'}>
            {['admin', 'cardinal_music', 'cardinal_photos', 'cardinal_cinema'].map((app) => {
              return (
                <div className={'version'} key={app}>
                  <div>
                    <div className={'icon'}>
                      <BrandLogo icon={app === 'cardinal_home_server' ? 'admin' : app} size="s" />
                    </div>
                    <div>
                      <p className={'appName'}>{i18n[`apps.versions.app.${app}`][lang]}</p>
                      <div className={'semver'}>
                        {app === 'admin'
                          ?
                            <>
                              <p>
                                <span>{i18n['apps.versions.home-server-version-prefix'][lang]}</span>
                                {appVersions?.cardinal_home_server}
                              </p>
                              <p>
                                <span>{i18n['apps.versions.home-server-admin-version-prefix'][lang]}</span>
                                {appVersions?.cardinal_admin_web_app}
                              </p>
                            </>
                          :
                            <>
                              <span>{i18n['apps.versions.web-app-prefix'][lang]}</span>
                              {appVersions?.[`${app}_web_app`]}
                            </>
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <a href={`https://cardinalapps.io/${app.replaceAll('_', '-')}`} className={'webLink'} target="_blank">
                      <i className="fas fa-globe" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        }
        {!appVersionsLoading && appVersionsError && <p>{i18n['apps.error'][lang]}</p>}
      </Field>
      <Field label={i18n['manually-check-for-updates.title'][lang]}>
        {autoCheckForUpdatesField.render({
          value: auto_check_for_updates,
          onChange: (v) => dispatch(setSetting({
            settings: {
              auto_check_for_updates: v,
            },
            app: 'dashboard',
          })),
        })}
        <div className={'manuallyCheckForUpdates'}>
          <Button animation={manualCheckResultsLoading ? 'loading' : undefined} onClick={manuallyCheckForUpdates}>
            {i18n['manually-check-for-updates.button'][lang]}
          </Button>
          {manualCheckResults?.updateIsAvailable &&
            <WrittenText>
              <p className={'results'} dangerouslySetInnerHTML={{ __html: i18n['manually-check-for-updates.available'][lang].replaceAll('{version}', manualCheckResults?.latestVersion) }} />
              <p className={'results'} dangerouslySetInnerHTML={{ __html: i18n['manually-check-for-updates.update.links'][lang].replaceAll('{version}', manualCheckResults?.latestVersion) }} />
            </WrittenText>
          }
          {manualCheckResults?.updateIsAvailable === false &&
            <WrittenText>
              <p className={'results'}>{i18n['manually-check-for-updates.none'][lang]}</p>
            </WrittenText>
          }
          {manualCheckResultsError &&
            <WrittenText>
              {releaseChannel === 'development'
                ? <p className={'results'}>{i18n['manually-check-for-updates.development-mode'][lang]}</p>
                : <p className={'results'}>{i18n['manually-check-for-updates.error'][lang]}</p>
              }
            </WrittenText>
          }
        </div>
      </Field>
    </>
  )
}

export default Information
