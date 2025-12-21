import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MarketFormData } from "@/types/types"

// Default values for the form
const defaultFormData: Partial<MarketFormData> = {
  question: '',
  description: '',
  tradingFee: 0.5,
  liquidity: 0,
  resolutionSource: '',
  resolutionDate: ''
}

interface Step2_MarketDetailsProps {
  formData?: Partial<MarketFormData>;
  onFormChange: (field: keyof MarketFormData, value: any) => void;
}

const Step2_MarketDetails: React.FC<Step2_MarketDetailsProps> = ({ 
  formData: propFormData = {},
  onFormChange 
}) => {
  // Merge provided form data with defaults
  const formData = { ...defaultFormData, ...propFormData };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    onFormChange(id as keyof MarketFormData, value);
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    onFormChange(id as keyof MarketFormData, numValue);
  }

  // FIX: Prevent Enter key from submitting the form
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* Market Question */}
        <div>
          <label htmlFor="question" className="block text-sm font-semibold leading-relaxed mb-2">
            Market Question
          </label>
          <Input
            id="question"
            placeholder="e.g Will Bitcoin reach $100,000 by October 2025?"
            value={formData.question || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold leading-relaxed mb-2">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="e.g BTC higher"
            value={formData.description || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={4}
            className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light resize-none"
          />
        </div>

        {/* Trading Fee and Initial Liquidity - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Trading Fee */}
          <div>
            <label htmlFor="tradingFee" className="block text-sm font-semibold leading-relaxed mb-2">
              Trading Fee (%)
            </label>
            <div className="relative">
              <Input
                id="tradingFee"
                type="number"
                placeholder="0.5%"
                value={formData.tradingFee}
                onChange={handleNumberChange}
                onKeyDown={handleKeyDown}
                min={0}
                max={5}
                step={0.1}
                className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                %
              </span>
            </div>
          </div>

          {/* Initial Liquidity */}
          <div>
            <label htmlFor="liquidity" className="block text-sm font-semibold leading-relaxed mb-2">
              Initial Liquidity (BDAG)
            </label>
            <div className="relative">
              <Input
                id="liquidity"
                type="number"
                placeholder="0.00"
                value={formData.liquidity}
                onChange={handleNumberChange}
                onKeyDown={handleKeyDown}
                min={0}
                step={0.01}
                className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
              />
            </div>
          </div>
        </div>

        {/* Resolution Source and Date - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Resolution Source */}
          <div>
            <label htmlFor="resolutionSource" className="block text-sm font-semibold leading-relaxed mb-2">
              Resolution Source
            </label>
            <Input
              id="resolutionSource"
              placeholder="e.g. CoinGecko, Binance"
              value={formData.resolutionSource || ''}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
            />
          </div>

          {/* Resolution Date */}
          <div>
            <label htmlFor="resolutionDate" className="block text-sm font-semibold leading-relaxed mb-2">
              Resolution Date
            </label>
            <Input
              id="resolutionDate"
              type="datetime-local"
              value={formData.resolutionDate || ''}
              onChange={handleChange}
              className="bg-primary-darkBrown border-secondary-light text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2_MarketDetails
