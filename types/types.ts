// Markets
export interface Market {
	id: number
	title: string
	status: "trending" | "ending-soon" | "high-value" | "newest" | "closed"
	type: "Crypto" | "Entertainment" | "Sports" | "Politics" | "Weather" | "Other"
	marketType: "binary" | "multi" | "scalar"
	question: string
	description?: string
	liquidity: string
	volume: string
	duration: string
	participants: number
	outcomes?: MarketOutcome[]
	createdAt?: string
	endsAt?: string
}

export interface MarketTypeCardProps {
	title: string
	description: string
	question: string
	isSelected?: boolean
	onClick?: () => void
}

export interface MarketFiltersProps {
	activeStatus: string
	onStatusChange: (status: string) => void
	activeType: string
	onTypeChange: (type: string) => void
}

export interface MarketCategoryCardProps {
	iconUrl: string
	title: string
	isSelected?: boolean
	onClick?: () => void
}

export interface MarketDetailPageProps {
	params: Promise<{ id: string }>
}

export interface MarketStatsProps {
	market: Market
}

export interface MarketChartProps {
	market: Market
}

export interface MultiOutcomeMarketViewProps {
	market: Market
}

export interface ScalarMarketViewProps {
	market: Market
}

export interface MarketOutcome {
	id: string
	option: string
	percentage?: number
	description?: string
}

export interface MarketFormData {
	marketCategory: string
	marketType: string
	question: string
	description: string
	tradingFee: number
	liquidity: number
	resolutionSource: string
	resolutionDate: string
	outcomes?: MarketOutcome[]
}

export interface MarketStep {
	id: number
	title: string
	description: string
}

export interface CreateMarketContextType {
	formData: MarketFormData
	currentStep: number
	totalSteps: number
	marketSteps: MarketStep[]
	handleFormChange: (field: keyof MarketFormData, value: MarketFormData[keyof MarketFormData]) => void
	handleNext: () => void
	handleBack: () => void
	handleSubmit: (e: React.FormEvent) => void
}

export interface StatCardProps {
	label: string
	value: string
	icon: React.ReactNode
	iconBg: string
}

export interface LiquidityPositionCardProps {
	marketId: number
	question: string
	amount: string
	shares: number
	percentEarned: string
	status: "active" | "closed"
}

export interface ActivityItemProps {
	type: "trade" | "create" | "liquidity" | "resolve"
	description: string
	amount: string
	timestamp: string
	status: "success" | "failed" | "pending"
}

//Users
export interface User {
	id: string
	address: string
	username: string
	avatar?: string
	totalVolume: string
	marketsTraded: number
	marketsCreated: number
	lpValue: string
	joinedAt: string
}

export interface LiquidityPosition {
	id: string
	marketId: number
	question: string
	amount: string
	shares: number
	status: string
	percentEarned: string
}

export interface Activity {
	id: string
	type: "trade" | "create"
	description: string
	amount: string
	timestamp: string
	status: "success" | "failed"
}
