export type Stat = {
  current: number
  previous: number
}

export type TopDriversStats = {
  previous: { name: string; total: number }[]
  current: { name: string; total: number }[]
}

export type FuelStats = {
  month: string
  fuel: number
  mileage: number
}[]

export type DashboardStats = {
  revenue: Stat
  invoiced_quantity: Stat
  delivered_quantity: Stat
  ordered_quantity: Stat
  drivers: TopDriversStats
  fuel: FuelStats
}

export type StatCardProps = {
  loading: boolean
  data?: Stat
  title: string
  formatValue?: boolean
  suffix?: string
}
