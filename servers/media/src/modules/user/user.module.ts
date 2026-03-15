import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RBACModule } from '../rbac/rbac.module'
import { SettingsModule } from '../settings/settings.module'
import { EventModule } from '../event/event.module'

import { UserService } from './user.service'
import { SeatsService } from './seats.service'
import { LocalUserService } from './local-user.service'
import { CloudUserService } from './cloud-user.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { RoleAssignment } from '../rbac/role-assignment.entity'
import { LicensingController } from './licensing.controller'
import { PublicUserController } from './users-public.controller'
import { UpdateUserService } from './update-user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RoleAssignment]),
    SettingsModule,
    forwardRef(() => RBACModule),
    forwardRef(() => EventModule),
  ],
  exports: [
    TypeOrmModule,
    UserService,
    SeatsService,
    LocalUserService,
    UpdateUserService,
    CloudUserService,
  ],
  providers: [
    UserService,
    UpdateUserService,
    LocalUserService,
    CloudUserService,
    SeatsService,
  ],
  controllers: [
    PublicUserController,
    UserController,
    LicensingController,
  ],
})
export class UserModule {}
