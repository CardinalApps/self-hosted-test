import { forwardRef, Module } from '@nestjs/common'

import { LicensingService } from './licensing.service'
import { UserModule } from '../user/user.module'
import { LicensingController } from './licensing.controller'

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  exports: [
    LicensingService,
  ],
  providers: [
    LicensingService,
  ],
  controllers: [LicensingController],
})
export class LicensingModule {}
