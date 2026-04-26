export interface User {
  id: number
  fullName: string
  email: string
  roles: Role[]
  authorities: Authority[]
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

interface Permission {
  id: number
  name: string
}

export interface Authority {
  authority: string
}
