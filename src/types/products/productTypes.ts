export interface IProduct {
  id: number
  category_id: number
  slug: string
  name: string
  description: string
  price: number
  status: string
}

export interface ICategory {
  id: number
  name: string
  slug: string
}
export interface IProductCategory extends IProduct {
  category: ICategory
}
