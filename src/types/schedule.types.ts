export type ScheduleGeneralType = {
	id: number
	title: string
	description: string
	start_date: string
	total_time: string
	total_budget: number
}

export type MyScheduleItemType = {
	general: ScheduleGeneralType
	status: string
	last_updated: string
	destinations: string[]
}

export type PublicScheduleItemType = {
	general: ScheduleGeneralType
	destinations: string[]
	author: string
}
