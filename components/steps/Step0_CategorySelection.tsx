import React from "react"
import { MarketCategoryCard } from "../form/MarketCategoryCard"

interface Step0_CategorySelectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Step0_CategorySelection: React.FC<Step0_CategorySelectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categoryTypes = [
    { key: "weather", title: "Weather", iconUrl: "/weather.png" },
    { key: "entertainment", title: "Entertainment", iconUrl: "/entertainment.png" },
    { key: "sport", title: "Sport", iconUrl: "/sports.png" },
    { key: "politics", title: "Politics", iconUrl: "/politics.png" },
    { key: "crypto", title: "Crypto", iconUrl: "/crypto.png" },
    { key: "others", title: "Others", iconUrl: "/others.png" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryTypes.map((type) => (
          <MarketCategoryCard
            key={type.key}
            iconUrl={type.iconUrl}
            title={type.title}
            isSelected={selectedCategory === type.key}
            onClick={() => onSelectCategory(type.key)}
          />
        ))}
      </div>
    </div>
  )
}

export default Step0_CategorySelection
