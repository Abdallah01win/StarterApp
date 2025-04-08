import type { Notification, Options } from './index'

export enum UserTypes {
  SUPERADMIN,
  ADMIN,
  ACCOUNTANT
}

export type userTypeOptions = Options<UserTypes>

export interface User {
  readonly id: number
  name: string
  email: string
  type: UserTypes
  created_at: string
}

export interface InitUser extends Omit<User, 'created_at'> {
  permissions?: string[]
  notifications: Notification[]
}

export type UserFilters = {
  name?: string
  type?: string
}
