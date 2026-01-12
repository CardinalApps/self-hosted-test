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

type AllowedRoles = string[]

/**
 * Express middleware that enforces authentication and RBAC. An empty roles
 * array means that no roles are allowed.
 */
export const createAuthGuard = function(allowedRoles: AllowedRoles = []) {
  return (req: ExpressRequestDuck, res: ExpressResponseDuck, next: ExpressNextFunctionDuck) => {
    // auth and user must be set
    if (!req?.auth || !req?.user) {
      return res.status(401).send()
    }

    // role must be allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send()
    }

    next()
  }
}
