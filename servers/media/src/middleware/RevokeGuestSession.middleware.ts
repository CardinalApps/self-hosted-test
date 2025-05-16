import { Injectable, NestMiddleware, GoneException } from '@nestjs/common'
import { NextFunction } from 'express'

import { Designations } from '../modules/user/types'
import { SettingsService } from '../modules/settings/settings.service'

import { getJWTFromHeaders } from '../utils/jwt'
import { CardinalApp } from '../utils/apps'

/**
 * Revokes active guest sessions when the option to allow guest accounts is
 * disabled.
 */
@Injectable()
export class RevokeGuestSession implements NestMiddleware {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  async use(request, response, next: NextFunction): Promise<void> {
    const localUserJWT = getJWTFromHeaders(request.headers)

    if (localUserJWT && request.user?.designation === Designations.GUEST_ACCOUNT) {
      const enableGuestAccount = await this.settingsService.get(CardinalApp.ADMIN, 'enable_guest_account')

      if (!enableGuestAccount) {
        throw new GoneException()
      }

      return next()
    }

    next()
  }
}
