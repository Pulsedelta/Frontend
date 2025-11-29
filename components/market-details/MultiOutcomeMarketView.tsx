"use client"
import { Market } from "@/types/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MultiOutcomeMarketViewProps {
	market: Market
}

export default function MultiOutcomeMarketView({ market }: MultiOutcomeMarketViewProps) {
	const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
	const [amount, setAmount] = useState("")
	const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null)

	const outcomes = market.outcomes || []
	const colors = ["#22C55E", "#EF4444", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"]
	const [outcomePercentages] = useState(() =>
		outcomes.map((outcome) => outcome.percentage || parseFloat((Math.random() * 40 + 10).toFixed(1)))
	)
	return (
		<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-4">
			{/* Tabs */}
			<div className="flex gap-2 mb-6">
				<button
					onClick={() => setActiveTab("buy")}
					className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
						activeTab === "buy" ? "bg-orange-500 text-white" : "bg-zinc-800 text-gray-400 hover:text-white"
					}`}>
					Buy
				</button>
				<button
					onClick={() => setActiveTab("sell")}
					className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
						activeTab === "sell" ? "bg-orange-500 text-white" : "bg-zinc-800 text-gray-400 hover:text-white"
					}`}>
					Sell
				</button>
			</div>

			{/* Amount Input */}
			<div className="mb-6">
				<label className="block text-sm text-gray-400 mb-2">Amount (wDAG)</label>
				<Input
					type="number"
					placeholder="0.00"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="bg-zinc-800 border-zinc-700 text-white"
				/>
			</div>

			{/* Outcome Options */}
			<div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
				{outcomes.map((outcome, index) => (
					<button
						key={outcome.id}
						onClick={() => setSelectedOutcome(outcome.id)}
						className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
							selectedOutcome === outcome.id
								? "border-orange-500 bg-orange-500/10"
								: "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
						}`}>
						<div className="flex items-center gap-2">
							<div
								className="w-3 h-3 rounded-full"
								style={{ backgroundColor: colors[index % colors.length] }}></div>
							<span className="font-semibold text-white">{outcome.option}</span>
						</div>
						<span className="font-bold" style={{ color: colors[index % colors.length] }}>
							{outcomePercentages[index]}%
						</span>
					</button>
				))}
			</div>

			{/* Action Button */}
			<Button
				className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6"
				disabled={!selectedOutcome}>
				{activeTab === "buy" ? "Buy Shares" : "Sell Shares"}
			</Button>

			{/* Summary */}
			<div className="mt-6 pt-6 border-t border-zinc-800 space-y-2 text-sm">
				<div className="flex justify-between text-gray-400">
					<span>Potential Return</span>
					<span className="text-white font-semibold">
						{amount ? `${(parseFloat(amount) * 1.85).toFixed(2)} wDAG` : "0.00 wDAG"}
					</span>
				</div>
				<div className="flex justify-between text-gray-400">
					<span>Trading Fee (0.5%)</span>
					<span className="text-white font-semibold">
						{amount ? `${(parseFloat(amount) * 0.005).toFixed(3)} wDAG` : "0.000 wDAG"}
					</span>
				</div>
			</div>
		</div>
	)
}
