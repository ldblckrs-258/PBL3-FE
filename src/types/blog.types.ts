import { AuthorProps } from './user'

export interface BlogCardProps {
	id: number
	title: string
	type: string
	image: string
	author: string
	created_at: string
}

export type BlogDetailType = {
	id: number
	title: string
	type: string
	image: string
	description: string
	author: {
		id: number
		name: string
		avatar: string
	}
	created_at: string
	content: string
}

export interface HomeBlogProps {
	id: number
	type: string
	title: string
	image: string
	author: string
	created_at: string
}

export interface BlogLineProps {
	id: number
	title: string
	type: string
	image: string
	created_at: string
	views: number
	introduction: string
	author: AuthorProps
}
