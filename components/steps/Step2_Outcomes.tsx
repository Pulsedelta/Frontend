import React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export interface Outcome {
  id: string;
  option: string;
  description: string;
}

interface Step2_OutcomesProps {
  outcomes: Outcome[];
  onOutcomesChange: (outcomes: Outcome[]) => void;
}

const Step2_Outcomes: React.FC<Step2_OutcomesProps> = ({ outcomes = [], onOutcomesChange }) => {
  const handleOutcomeChange = (id: string, field: "option" | "description", value: string) => {
    const updatedOutcomes = outcomes.map((outcome) =>
      outcome.id === id ? { ...outcome, [field]: value } : outcome
    )
    onOutcomesChange(updatedOutcomes)
  }

  const addOutcome = () => {
    const newOutcome = {
      id: Date.now().toString(),
      option: "",
      description: "",
    }
    onOutcomesChange([...outcomes, newOutcome])
  }

  const removeOutcome = (id: string) => {
    if (outcomes.length <= 2) return // Minimum 2 outcomes required
    const updatedOutcomes = outcomes.filter((outcome) => outcome.id !== id)
    onOutcomesChange(updatedOutcomes)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {/* Outcomes */}
        {outcomes.map((outcome, index) => (
          <div key={outcome.id} className="space-y-4 ">
            <div className="flex items-center justify-between -mb-3">
              <h3 className="text-lg font-semibold text-white">Outcome {index + 1}</h3>
              {outcomes.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOutcome(outcome.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* Option Name */}
              <div>
                <Input
                  id={`option-${outcome.id}`}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={outcome.option}
                  onChange={(e) => handleOutcomeChange(outcome.id, "option", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-secondary-dark border-secondary-light text-white placeholder:text-gray-500"
                />
              </div>

              {/* Description (Optional) */}
              <div>
                <Textarea
                  id={`description-${outcome.id}`}
                  placeholder="Description (optional)"
                  value={outcome.description}
                  onChange={(e) => handleOutcomeChange(outcome.id, "description", e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  className="bg-secondary-dark border-secondary-light text-white placeholder:text-gray-500 resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Outcome Button */}
        {outcomes.length < 10 && (
          <Button
            type="button"
            onClick={addOutcome}
            variant="outline"
            className="w-56 border-dashed border-2 border-secondary-light hover:border-primary hover:bg-primary-dark text-gray-400 hover:text-primary-foreground transition-colors duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add Outcome (max 10)
          </Button>
        )}
      </div>
    </div>
  )
}

export default Step2_Outcomes
