export interface IUser {
    id: string
    name: string
    email: string
    number: number
    createdAt: Date
    updatedAt: Date
}

export interface IGame {
    id: string
    user_id: string
    name: string
    description: string
    price: number
    image: string
    link: string
    createdAt: Date
    updatedAt: Date
}

export interface ICreateGame {
    name: string
    description: string
    price: number
    image: string
    link: string
    file: File | null
}

export interface IUpdateGame {
    id: string
    name: string
    description: string
    price: number
    image: string
    link: string
    file: File | null
}