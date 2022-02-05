import { IProduct } from './productTypes'

export interface ICategory {
  id: number
  name: string
  slug: string
}
export interface IProductCategory extends IProduct {
  category: ICategory
}
