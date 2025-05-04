import type { Options } from './index'

export enum UserRoles {
  SUPERADMIN,
  ADMIN,
  USER
}

export type userRoleOptions = Options<UserRoles>

export type User = {
  readonly id: number
  name: string
  email: string
  role: UserRoles
  created_at: string
}

export type UserList = Pick<User, 'id' | 'name'>

export interface InitUser extends Omit<User, 'created_at'> {
  permissions?: string[]
  notifications: any[]
}
