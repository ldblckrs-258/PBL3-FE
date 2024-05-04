export default interface DestinationType {
	imgs: string[]
	general: General
	introduction: string
	reviews: Reviews
}

interface General {
	id: number
	name: string
	localName: string
	address: string
	rating: number
	cost: number
	openTime: string
	closeTime: string
	tags: string[]
}

interface Reviews {
	total: Total
	list: Review[]
}

interface Total {
	count: number
	average: number
	chart: Chart
}

interface Chart {
	'5': number
	'4': number
	'3': number
	'2': number
	'1': number
}

interface Review {
	id: number
	name: string
	avatar: string
	rating: number
	date: string
	content: string
	like: number
}
