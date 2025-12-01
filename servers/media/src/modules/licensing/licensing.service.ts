import { Injectable } from '@nestjs/common'

import {
  SUBSCRIPTIONS,
  SubscriptionTier,
  getSubscription,
} from '@cardinalapps/products/dist/cjs/subscriptions'

import { UserService } from '../user/user.service'

/**
 * This service handles licensing related logic.
 */
@Injectable()
export class LicensingService {
  constructor(
    private readonly userService: UserService,
  ) {}

  /**
   * Returns the currently applicable server license, which is determined by the
   * subscription tier of the owner. Defaults to Free if there is no owner.
   */
  async getServerLicense(): Promise<SubscriptionTier> {
    const owner = await this.userService.getServerOwner()

    if (!owner) {
      return SUBSCRIPTIONS['free']
    }

    const ownerSubscriptionSlug = owner?.cachedCloudUser?.subscription
    const subscription = getSubscription(ownerSubscriptionSlug)

    if (subscription) {
      return subscription
    } else {
      throw new Error('Could not determine license')
    }
  }
}
