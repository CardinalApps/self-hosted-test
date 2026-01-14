import { CapabilityAssignments, hasCapabilities } from "./capabilities"
import { getCloudRole, CloudRoleNames } from "./contexts/cardinal-cloud"

type ExpressRequestDuck = {
  auth: {
    userId: string,
  },
  user: {
    role: string
  }
}

type ExpressResponseDuck = {
  auth: {
    userId: string,
  },
  status: (code: number) => ExpressResponseDuck
  send: () => void
}

type ExpressNextFunctionDuck = () => void

/**
 * Express middleware that enforces authentication and RBAC.
 */
export const createRBACMiddleware = function<Caps>(capabilities: Caps[]) {
  return (req: ExpressRequestDuck, res: ExpressResponseDuck, next: ExpressNextFunctionDuck) => {
    if (!req?.auth || !req?.user) {
      return res.status(401).send()
    }

    const userRole = getCloudRole(req.user.role as CloudRoleNames)

    if (!userRole) {
      return res.status(401).send()
    }

    if (!hasCapabilities<Caps>(capabilities, userRole.capabilities as CapabilityAssignments<Caps>)) {
      return res.status(403).send()
    }

    next()
  }
}
