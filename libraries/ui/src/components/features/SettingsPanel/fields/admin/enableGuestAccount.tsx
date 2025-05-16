import { getSetting } from '@cardinalapps/app-settings/src'

import ToggleSwitch from '../../../../forms/ToggleSwitch'

import Desc from '../../layout/Desc'

const enableGuestAccount = (app, lang) => {
  const fieldFactory = getSetting('enable_guest_account')
  const field = fieldFactory(app, lang)

  return Object.freeze({
    ...field,
    render: ({ value, onChange, user }) => {
      return (
        <>
          <ToggleSwitch
            name={field.slug}
            value={value}
            label={field.label}
            // FIXME get the role from a constant that is shared with the home sever
            disabled={user.role !== 'owner'}
            onChange={onChange}
          />
          {!!field?.description && <Desc type="toggle-switch">{field.description}</Desc>}
        </>
      )
    },
  })
}

export default enableGuestAccount
