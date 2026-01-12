import { Role } from "../roles"

/**
 * Master list of all Cloud aspects.
 */
export const CloudAspects = [
  'CurrentUser',
  'AAAACloudAspect',
] as const

export type CloudAspect = typeof CloudAspects[number]

/**
 * Master list of all Cloud capabilities.
 */
export const CloudCapabilities = [
  'CurrentUser.Read',
  'CurrentUser.Update',
  'AAAACloudAspect.Update',
] as const

export type CloudCapability = typeof CloudCapabilities[number]

/**
 * Master list of all roles and their capabilities.
 */
export enum CloudRoleName {
  ADMINISTRATIOR = 'admin', // For legacy reasons, this does not match the media-server "administrator" slug
  USER = 'user',
}

export const CloudRoles: Record<`${CloudRoleName}`, Role> = {
  [CloudRoleName.ADMINISTRATIOR]: {
    assignable: true,
    revocable: true,
    maxUsers: null,
    name: CloudRoleName.ADMINISTRATIOR,
    capabilities: [
      '*.*',
    ],
  },
  [CloudRoleName.USER]: {
    assignable: true,
    revocable: true,
    maxUsers: null,
    name: CloudRoleName.ADMINISTRATIOR,
    capabilities: [
      'CurrentUser.Read',
    ],
  },
} as const

/**
 * A type with all role slugs.
 */
export type CloudRoleNames = keyof typeof CloudRoles
