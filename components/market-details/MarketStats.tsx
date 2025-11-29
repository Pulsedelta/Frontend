import { Market } from "@/types/types"
import { ChartColumn, Clock5, Users, TrendingUp } from "lucide-react"

interface MarketStatsProps {
	market: Market
}

export default function MarketStats({ market }: MarketStatsProps) {
	const stats = [
		{
			icon: <ChartColumn className="w-5 h-5" />,
			label: "Liquidity",
			value: market.liquidity,
		},
		{
			icon: <TrendingUp className="w-5 h-5" />,
			label: "Volume",
			value: market.volume,
		},
		{
			icon: <Users className="w-5 h-5" />,
			label: "Traders",
			value: market.participants.toString(),
		},
		{
			icon: <Clock5 className="w-5 h-5" />,
			label: "Ends in",
			value: market.duration,
		},
	]

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{stats.map((stat, index) => (
				<div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
					<div className="flex items-center gap-2 text-gray-400 mb-2">
						{stat.icon}
						<span className="text-sm">{stat.label}</span>
					</div>
					<p className="text-xl font-bold text-white">{stat.value}</p>
				</div>
			))}
		</div>
	)
}
