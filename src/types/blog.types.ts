export type BlogType = {
	id: number
	title: string
	type: string
	image: string
	description: string
	author: string
	created_at: string
}

export interface BlogDetailType extends BlogType {
	content: string
}
