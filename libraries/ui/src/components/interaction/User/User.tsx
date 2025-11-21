import Avatar, { AvatarSize } from '../../layout/Avatar/Avatar'
import { UserType } from '../../../types/user'
import { useAppSelector } from '../../../hooks/useAppSelector'

import i18n from './i18n'
import './User.css'
import { settingsSelectors } from '../../../store/slices/settings'

type UserProps = {
  user?: UserType,
  showName?: boolean,
  showAvatar?: boolean,
  avatarSize?: AvatarSize,
}

/**
 * A user component.
 */
const User = ({
  user,
  showName = true,
  showAvatar = true,
  avatarSize = 'l',
}: UserProps) => {
  const { lang } = useAppSelector(settingsSelectors.current)
  return (
    <div className="user">
      {showAvatar && user?.designation === 'guest_account' &&
        <Avatar size={avatarSize} type="guest" className={'avatar'} />
      }
      {showAvatar && user?.designation !== 'guest_account' && user?.cachedCloudUser?.avatar &&
        <Avatar size={avatarSize} type="guest" className={'avatar'} />
      }
      {!!showName && user?.designation === 'guest_account' && (
        <p className="user-name">{i18n['user.guest'][lang]}</p>
      )}
    </div>
  )
}

export default User
