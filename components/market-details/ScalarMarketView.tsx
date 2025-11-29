"use client"
import { Market } from "@/types/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ScalarMarketViewProps {
	market: Market
}

export default function ScalarMarketView({ market }: ScalarMarketViewProps) {
	const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
	const [amount, setAmount] = useState("")
	const [position, setPosition] = useState<"long" | "short" | null>(null)

	// Use market data for the current value
	const [currentValue] = useState(() => 50 + (market.id % 30))

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

			{/* Range Display */}
			<div className="mb-6 p-4 bg-zinc-800 rounded-lg">
				<div className="flex justify-between text-sm text-gray-400 mb-2">
					<span>Min</span>
					<span className="text-white font-semibold">Current: 50</span>
					<span>Max</span>
				</div>
				<div className="relative h-2 bg-zinc-700 rounded-full overflow-hidden">
					<div
						className="absolute h-full bg-gradient-to-r from-green-500 to-blue-500"
						style={{ width: `${currentValue}%` }}
					/>
				</div>
				<div className="flex justify-between text-xs text-gray-500 mt-1">
					<span>0</span>
					<span>100</span>
				</div>
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

			{/* Position Selection */}
			<div className="mb-6">
				<label className="block text-sm text-gray-400 mb-3">Select Position</label>
				<div className="grid grid-cols-2 gap-3">
					<button
						onClick={() => setPosition("long")}
						className={`p-4 rounded-lg border-2 transition ${
							position === "long"
								? "border-green-500 bg-green-500/10"
								: "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
						}`}>
						<div className="text-center">
							<div className="text-2xl mb-1">📈</div>
							<div className="font-semibold text-white">Long</div>
							<div className="text-xs text-gray-400">Bet Higher</div>
						</div>
					</button>

					<button
						onClick={() => setPosition("short")}
						className={`p-4 rounded-lg border-2 transition ${
							position === "short"
								? "border-red-500 bg-red-500/10"
								: "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
						}`}>
						<div className="text-center">
							<div className="text-2xl mb-1">📉</div>
							<div className="font-semibold text-white">Short</div>
							<div className="text-xs text-gray-400">Bet Lower</div>
						</div>
					</button>
				</div>
			</div>

			{/* Action Button */}
			<Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6" disabled={!position}>
				{activeTab === "buy" ? "Buy Shares" : "Sell Shares"}
			</Button>

			{/* Summary */}
			<div className="mt-6 pt-6 border-t border-zinc-800 space-y-2 text-sm">
				<div className="flex justify-between text-gray-400">
					<span>Position</span>
					<span className="text-white font-semibold capitalize">{position || "None"}</span>
				</div>
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
