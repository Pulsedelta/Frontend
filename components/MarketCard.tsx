import { TYPE_BADGE_STYLES } from "@/data/constants"
import { Market } from "@/types/types"
import { BarChart3, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function MarketCard({ market }: { market: Market }) {
	return (
		<Link href={`/markets/market/${market.id}`} className="block group">
			<div className="card-wrapper flex flex-col bg-secondary-dark rounded-lg p-4 pt-8 hover:border hover:border-primary shadow-md hover:shadow-primary-light">
				<div className="card-title text-center mb-4 font-bold text-lg">
					<h2>
						<span>Logo</span> PulseDelta Market
					</h2>
				</div>

				{/* Card with Sawtooth Border Background */}
				<div
					className="w-full p-5 sm:p-6 bg-no-repeat bg-center hover:scale-[1.02] transition-transform duration-300"
					style={{
						backgroundImage: "url('/cardImage.png')",
						backgroundSize: "100% 100%",
					}}>
					{/* Category Badge & Participants Row */}
					<div className="flex justify-between items-center mb-4">
						{/* Category Badge */}
						<div
							className={`text-xs font-semibold rounded-full px-3 py-1.5 ${
								TYPE_BADGE_STYLES[market.type] ?? "bg-gray-800 text-gray-300"
							}`}>
							{market.type}
						</div>

						{/* Participants */}
						<div className="flex items-center gap-1.5 text-gray-300">
							<Users width={16} height={16} />
							<span className="text-sm font-medium">{market.participants}</span>
						</div>
					</div>

					{/* Question */}
					<h3 className="text-white text-base sm:text-lg font-bold leading-tight mb-6 line-clamp-2 min-h-[3rem]">
						{market.question}
					</h3>

					{/* Stats Row */}
					<div className="flex justify-between items-center mb-5">
						{/* Liquidity */}
						<div className="flex flex-col items-center">
							<span className="flex items-center gap-1.5 mb-1.5 text-gray-400 text-xs">
								<BarChart3 width={14} height={14} />
								Liquidity
							</span>
							<span className="font-bold text-white text-sm sm:text-base">{market.liquidity}</span>
						</div>

						{/* Volume */}
						<div className="flex flex-col items-center">
							<span className="flex items-center gap-1.5 mb-1.5 text-gray-400 text-xs">
								<BarChart3 width={14} height={14} />
								Volume
							</span>
							<span className="font-bold text-white text-sm sm:text-base">{market.volume}</span>
						</div>

						{/* Duration */}
						<div className="flex flex-col items-center">
							<span className="flex items-center gap-1.5 mb-1.5 text-gray-400 text-xs">
								<Clock width={14} height={14} />
								Duration
							</span>
							<span className="font-bold text-white text-sm sm:text-base">{market.duration}</span>
						</div>
					</div>

					{/* Place Bet Button */}
					<button className="w-full px-4 py-3 rounded-lg bg-primary hover:shadow-md hover:shadow-primary-foreground transition text-white font-bold text-sm sm:text-base">
						Place Bet
					</button>
				</div>
			</div>
		</Link>
	)
}
