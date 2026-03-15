import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'

import { UpdateUserService } from '../modules/user/update-user.service'

/**
 * This middleware reads the request and updates the activityStatus for each
 * active user.
 * 
 * This should run after the JWT middlewares.
 */
@Injectable()
export class UserActivity implements NestMiddleware {
  constructor(
    private readonly updateUserService: UpdateUserService,
  ) {}

  async use(request, response, next: NextFunction): Promise<void> {
    if (request?.user) {
      try {
        // TODO throttle this
        await this.updateUserService.validateAndUpdate(request.user, request.user, {
          activityStatus: 'seen', // TODO make this client-supplied
          activityStatusUpdatedAt: new Date(),
        })
      } catch (err) {
        Logger.error(err)
      }
    }

    next()
  }
}
