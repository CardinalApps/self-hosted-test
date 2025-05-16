import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler())
    let userRole

    if (!allowedRoles) {
      throw new InternalServerErrorException(`RolesGuard requires setting @AllowedRoles() on field ${context.getArgs().at(3)?.fieldName}`)
    }

    // Only works with the REST API
    const request = context.switchToHttp().getRequest()

    if (request) {
      userRole = request?.user?.role
    } else {
      throw new Error('Could not get role from request.')
    }

    if (allowedRoles.includes(userRole)) {
      return true
    } else {
      throw new ForbiddenException('Invalid role')
    }
  }
}
