export type User = {
  id: number
  username: string
  email: string
  active: boolean
  role: Role
  createdAt: Date
  updatedAt: Date
}

export enum Role {
  administrator = 'administrator',
  manager = 'manager',
  operator = 'operator',
}
