export type Category = {
  id: number
  name: string
  subcategories: Subcategory[]
  createdAt: Date
  updatedAt: Date
}

export type Subcategory = {
  id: number
  name: string
  categoryId: number
  createdAt: Date
  updatedAt: Date
}
