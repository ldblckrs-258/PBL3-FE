export interface DesListItemProps {
	id: number
	name: string
	address: string
	image: string
	rating: number
	cost: number
	openTime: string
	closeTime: string
	tags: string[]
	favorite: boolean
}

export interface DesInfoProps {
	name: string
	localName: string
	address: string
	images: string[]
	cost: number
	openTime: string
	closeTime: string
	tags: string[]
}

export interface GeneralReviewProps {
	rating: number
	totalReview: number
	detail: {
		[key: number]: number
	}
}

export interface DestinationDetailProps {
	id: number
	information: DesInfoProps
	introduction: string
	googleMapUrl: string
	generalReview: GeneralReviewProps
}

export interface ReviewProps {
	id: number
	author: string
	avatar: string
	rating: number
	comment: string
	created_at: string
}

export interface SortDesProps {
	id: number
	name: string
	address: string
	tags: string[]
	rating: number
	image: string
}