import { Role } from "../roles"

/**
 * Master list of all Authentication aspects.
 */
export const Aspects = [
  'CurrentUser',
] as const

export type AuthenticationAspect = typeof Aspects[number]

/**
 * Master list of all Authentication capabilities.
 */
export const AuthCapabilities = [
  'CurrentUser.Read',
  'CurrentUser.Update',
] as const

export type AuthCapability = typeof AuthCapabilities[number]

/**
 * Master list of all roles and their capabilities.
 */
export enum RoleName {
  ADMINISTRATIOR = 'admin', // For legacy reasons, this does not match the media-server "administrator" slug
  USER = 'user',
}

export const AuthRoles: Record<`${RoleName}`, Role> = {
  [RoleName.ADMINISTRATIOR]: {
    assignable: true,
    revocable: true,
    maxUsers: null,
    name: RoleName.ADMINISTRATIOR,
    capabilities: [
      '*.*',
    ],
  },
  [RoleName.USER]: {
    assignable: true,
    revocable: true,
    maxUsers: null,
    name: RoleName.ADMINISTRATIOR,
    capabilities: [
      'CurrentUser.Read',
    ],
  },
} as const

/**
 * A type with all role slugs.
 */
export type RoleNames = keyof typeof AuthRoles
