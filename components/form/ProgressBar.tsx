import React from "react"

interface ProgressBarProps {
	currentStep: number
	totalSteps: number
}

/**
 * Renders the responsive progress bar for the multi-step form.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
	// Calculate progress percentage
	const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 100

	return (
		<div className="w-full mb-8">
			<div className="h-2 bg-border/50 rounded-full overflow-hidden relative bg-white ">
				{/* Active Progress Bar */}
				<div
					className="h-full bg-primary transition-all duration-500 ease-out shadow-lg shadow-primary/40"
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>

			{/* Step Titles/Indicators (Mobile Hidden, Desktop Visible) */}
			{/* <div className="hidden sm:flex justify-between mt-3 text-xs text-muted-foreground">
				{steps.map((step, index) => (
					<div
						key={step.title}
						className={`text-center transition-colors ${
							index + 1 === currentStep
								? "text-primary font-semibold"
								: index + 1 < currentStep
								? "text-foreground/70"
								: ""
						}`}
						style={{ width: `calc(100% / ${totalSteps})` }}>
						{step.title}
					</div>
				))}
			</div> */}
		</div>
	)
}
