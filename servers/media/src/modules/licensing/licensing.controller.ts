import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiSecurity,
} from '@nestjs/swagger'

import { LicensingService } from './licensing.service'
import { SeatsService } from '../user/seats.service'

import { AuthGuard } from '../../guards/auth.guard'
import { ApiSecurityTypes } from '../../guards/types'

@Controller('/licensing')
export class LicensingController {
  constructor(
    private readonly licensingService: LicensingService,
    private readonly seatsService: SeatsService,
  ) {}

  /**
   * Returns information about the current number of seats.
   */
  @Get('/seats')
  @UseGuards(AuthGuard)
  @ApiTags('Licensing')
  @ApiSecurity(ApiSecurityTypes.LOCAL_USER_JWT)
  async getSeats(): Promise<{ used: number, total: number }> {
    const license = await this.licensingService.getServerLicense()
    const usedSeats = await this.seatsService.countSeatedUsers()
    return {
      total: license.provides.seats,
      used: usedSeats,
    }
  }
}
