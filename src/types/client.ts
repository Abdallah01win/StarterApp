export interface Client {
  readonly id: number
  name: string
  email: string
  phone: string
  address: string
  ice: string
  if: string
  rc: string
  balance: number
  created_at: string
  updated_at: string
}

export type ClientList = Pick<Client, 'id' | 'name'>

export type ClientFilters = {
  name?: string
  address?: string
  min_balance?: number
  max_balance?: number
}
