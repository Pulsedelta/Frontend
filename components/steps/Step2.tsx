import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import { MarketFormData } from "@/types/types"

const Step2_MarketDetails: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target

		if (id === "tradingFee" || id === "liquidity") {
			const finalValue = value === "" ? "" : Number(value)
			handleFormChange(id as keyof MarketFormData, finalValue)
			return
		}

		handleFormChange(id as keyof MarketFormData, value)
	}

	// FIX: Prevent Enter key from submitting the form
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<label htmlFor="question" className="block text-sm font-medium text-foreground mb-2">
					Market Question
				</label>
				<Input
					id="question"
					placeholder="e.g., Will Bitcoin exceed $100k by Q4 2025?"
					value={formData.question}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div>
				<label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
					Description (Optional)
				</label>
				<Textarea
					id="description"
					placeholder="Provide context and rules for the market."
					value={formData.description}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label htmlFor="tradingFee" className="block text-sm font-medium text-foreground mb-2">
						Trading Fee (%)
					</label>
					<Input
						id="tradingFee"
						type="number"
						value={formData.tradingFee}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						min={0}
						max={5}
					/>
				</div>
				<div>
					<label htmlFor="liquidity" className="block text-sm font-medium text-foreground mb-2">
						Initial Liquidity (USDC)
					</label>
					<Input
						id="liquidity"
						type="number"
						placeholder="Enter amount (e.g., 500)"
						value={formData.liquidity}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						min={100}
					/>
				</div>
			</div>
		</div>
	)
}

export default Step2_MarketDetails
