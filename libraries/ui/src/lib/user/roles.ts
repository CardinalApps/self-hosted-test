/**
 * Keep the backend copy of this definition in sync. It is at:
 *
 * /server-auth/src/constants/roles.js
 */
const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  DEVELOPER: 'developer',
  MODERATOR: 'moderator',
  USER: 'user',
  BANNED: 'banned',
}

export default Object.freeze(ROLES)
