import { number } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStore = {
    user : string
    name : string
    email : string
    phone_number : number
    password : string
    address : string
    city : string
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: '',
            name: '',
            email: '',
            phone_number: 0,
            password: '',
            address: '',
            city: '',
        }),
        {
            name: 'user-storage',
        }
    )
)