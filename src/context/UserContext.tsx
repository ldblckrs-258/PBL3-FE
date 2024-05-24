/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from 'react'

export interface User {
	id: number
	username: string
	email: string
	avatar: string
	role: string
}

export interface UserContextInterface {
	user: User
	setUser: Dispatch<SetStateAction<User>>
}

export const defaultUser = {
	user: {
		id: 0,
		username: '',
		email: '',
		avatar: '',
		role: '',
	},
	setUser: (_user: User) => {},
} as UserContextInterface

export const UserContext = createContext(defaultUser)

export default function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User>(defaultUser.user)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
