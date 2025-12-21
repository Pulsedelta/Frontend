"use client"
import React, { useMemo, useState, useCallback } from "react"
import { ChevronsRight } from "lucide-react"
import { ProgressBar } from "@/components/form/ProgressBar"
import { Button } from "@/components/ui/button"
import { useCategoricalMarketFactory } from "@/hooks/useCategoricalMarketFactory"
import Step0_CategorySelection from "@/components/steps/Step0_CategorySelection"
import Step1_TypeSelection from "@/components/steps/Step1_TypeSelection"
import Step2_MarketDetails from "@/components/steps/Step2_MarketDetails"
import Step2_Outcomes from "@/components/steps/Step2_Outcomes"
import Step4_Review from "@/components/steps/Step4_Review"
import { uploadMarketMetadata } from "@/utils/ipfs"
import { initialFormData } from "@/context/CreateMarketContext"
import { toast } from "sonner"
import { useConnection } from "wagmi"

const CreateMarket: React.FC = () => {
	const { isConnected, isConnecting } = useConnection()
	const {
		createMarket,
		isPending,
		isConfirmed,
		isConfirming,
		writeError,
	 } = useCategoricalMarketFactory()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [formData, setFormData] = useState(initialFormData)
	const [currentStep, setCurrentStep] = useState(1)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadError, setUploadError] = useState<string | null>(null)

	const marketSteps = useMemo(() => {
		const isMultiOutcome = formData.marketType === "multi";
		return isMultiOutcome ? 5 : 4; // 5 steps for multi-outcome, 4 for binary/scalar
	}, [formData.marketType]);

	const handleNext = useCallback(() => {
		if (currentStep < marketSteps) {
			setCurrentStep(prev => prev + 1);
		}
	}, [currentStep, marketSteps]);

	const handleBack = useCallback(() => {
		if (currentStep > 1) {
			setCurrentStep(prev => prev - 1);
		}
	}, [currentStep]);

	const currentStepData = useMemo(() => {
		const isMultiOutcome = formData.marketType === "multi"

		// Manually map step data based on current step and market type
		if (isMultiOutcome) {
			switch (currentStep) {
				case 1:
					return {
						title: "Market Category",
						description: "Select the best structure for your prediction market.",
					}
				case 2:
					return {
						title: "Market Type",
						description: "Select the outcome format for your prediction market.",
					}
				case 3:
					return {
						title: "Market Details",
						description: "Provide clear and specific information about your prediction market",
					}
				case 4:
					return { title: "Market Outcomes", description: "Define the possible outcomes for your market." }
				case 5:
					return {
						title: "Review & Deploy",
						description: "Final check before deploying your immutable market.",
					}
				default:
					return { title: "", description: "" }
			}
		} else {
			switch (currentStep) {
				case 1:
					return {
						title: "Market Category",
						description: "Select the best structure for your prediction market.",
					}
				case 2:
					return {
						title: "Market Type",
						description: "Select the outcome format for your prediction market.",
					}
				case 3:
					return {
						title: "Market Details",
						description: "Provide clear and specific information about your prediction market",
					}
				case 4:
					return {
						title: "Review & Deploy",
						description: "Final check before deploying your immutable market.",
					}
				default:
					return { title: "", description: "" }
			}
		}
	}, [currentStep, formData.marketType])

	// Validation function for each step
	const isStepValid = useMemo(() => {
		// For multi-outcome markets, adjust step numbers
		const isMultiOutcome = formData.marketType === "multi"

		switch (currentStep) {
			case 1: // Step 0: Category Selection
				return formData.marketCategory !== "" && formData.marketCategory !== undefined

			case 2: // Step 1: Market Type Selection
				return formData.marketType !== "" && formData.marketType !== undefined

			case 3: // Step 2: Market Details (for all types)
				return (
					formData.question &&
					formData.question.trim() !== "" &&
					formData.liquidity &&
					Number(formData.liquidity) >= 100 &&
					formData.resolutionSource &&
					formData.resolutionSource.trim() !== "" &&
					formData.resolutionDate &&
					formData.resolutionDate.trim() !== ""
				)

			case 4: // Step 3: Outcomes (only for multi) OR Review (for binary/scalar)
				if (isMultiOutcome) {
					// This is Outcomes for multi-outcome - validate at least 2 outcomes
					const validOutcomes = formData.outcomes?.filter((o) => o.option.trim() !== "") || []
					return validOutcomes.length >= 2
				} else {
					// This is Review for binary/scalar - validate everything
					return (
						formData.marketCategory !== "" &&
						formData.marketType !== "" &&
						formData.question &&
						formData.question.trim() !== "" &&
						formData.liquidity &&
						Number(formData.liquidity) >= 100 &&
						formData.resolutionSource &&
						formData.resolutionSource.trim() !== "" &&
						formData.resolutionDate &&
						formData.resolutionDate.trim() !== ""
					)
				}

			case 5: // Step 4: Review (only for multi-outcome)
				// Final validation for multi-outcome markets
				const validOutcomes = formData.outcomes?.filter((o) => o.option.trim() !== "") || []
				return (
					formData.marketCategory !== "" &&
					formData.marketType !== "" &&
					validOutcomes.length >= 2 &&
					formData.question &&
					formData.question.trim() !== "" &&
					formData.liquidity &&
					Number(formData.liquidity) >= 100 &&
					formData.resolutionSource &&
					formData.resolutionSource.trim() !== "" &&
					formData.resolutionDate &&
					formData.resolutionDate.trim() !== ""
				)

			default:
				return false
		}
	}, [currentStep, formData])

	const handleFormChange = useCallback((name: string, value: any) => {
    console.log(`[Form Change] ${name}:`, value);
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      console.log('Updated form data:', newData);
      return newData;
    });
  }, []);

	const renderStepContent = () => {
		const isMultiOutcome = formData.marketType === "multi"

		// Adjust rendering based on whether it's multi-outcome
		if (isMultiOutcome) {
			switch (currentStep) {
				case 1:
					return (
						<Step0_CategorySelection 
							selectedCategory={formData.marketCategory}
							onSelectCategory={(category) => handleFormChange('marketCategory', category)}
						/>
					)
				case 2:
					return (
						<Step1_TypeSelection 
							selectedType={formData.marketType}
							onSelectType={(type) => handleFormChange('marketType', type)}
						/>
					)
				case 3:
					return <Step2_MarketDetails 
						formData={formData}
						onFormChange={handleFormChange}
					/>
				case 4:
					return (
						<Step2_Outcomes 
							outcomes={formData.outcomes || []}
							onOutcomesChange={(updatedOutcomes) => handleFormChange('outcomes', updatedOutcomes)}
						/>
					)
				case 5:
					return <Step4_Review formData={formData} />
				default:
					return <div>Step not found.</div>
			}
		} else {
			// Binary or Scalar - skip outcomes step
			switch (currentStep) {
				case 1:
					return (
						<Step0_CategorySelection 
							selectedCategory={formData.marketCategory}
							onSelectCategory={(category) => handleFormChange('marketCategory', category)}
						/>
					)
				case 2:
					return (
						<Step1_TypeSelection 
							selectedType={formData.marketType}
							onSelectType={(type) => handleFormChange('marketType', type)}
						/>
					)
				case 3:
					return <Step2_MarketDetails
						formData={formData}
						onFormChange={handleFormChange}
					/>
				case 4:
					return <Step4_Review formData={formData} />
				default:
					return <div>Step not found.</div>
			}
		}
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log("[Page] Form submit triggered on step:", currentStep)
		console.warn("[Page] Form submission blocked - use Deploy button only")
	}

	const handleNextClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		if (!isStepValid) {
			console.warn("Cannot proceed - current step is not valid");
			return;
		}
		
		handleNext();
	}

	const handleBackClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log("[Page] Back button clicked on step:", currentStep)
		handleBack()
	}

	const handleDeployClick = async () => {
		if (!isConnected) {
			await isConnecting;
			// Wait a bit for the wallet to connect
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
		
		if (!isConnected) {
			toast.error("Please connect your wallet first");
			return;
		}
		
		const toastId = toast.loading("Starting market creation...");
		
		try {
			// 1. Validate form data
			if (!formData.question || !formData.description || !formData.resolutionDate) {
				throw new Error("Please fill in all required fields");
			}
			
			// 2. Upload metadata to IPFS
			toast.loading("Uploading metadata to IPFS...", { id: toastId });
			const metadata = {
				question: formData.question,
				description: formData.description,
				category: formData.marketCategory,
				type: formData.marketType,
				resolutionSource: formData.resolutionSource,
				resolutionDate: formData.resolutionDate,
				outcomes: formData.outcomes?.map(outcome => ({
					option: outcome.option,
					description: outcome.description || ''
				})) || []
			};
			
			const metadataURI = await uploadMarketMetadata(metadata);
			
			if (!metadataURI) {
				throw new Error("Failed to upload metadata to IPFS");
			}
			
			toast.success("Metadata uploaded successfully!", { id: toastId });

			// 3. Prepare transaction parameters
			toast.loading("Preparing transaction...", { id: toastId });
			const numOutcomes = formData.outcomes?.length || 2; // Default to 2 for binary markets
			const resolutionTime = Math.floor(new Date(formData.resolutionDate).getTime() / 1000);
			const initialLiquidity = BigInt(Math.floor(Number(formData.liquidity) * 1e18));

			// 4. Execute contract call
			toast.loading("Please confirm the transaction in your wallet...", { id: toastId });
			
			const result = await createMarket(
				metadataURI,
				BigInt(numOutcomes),
				resolutionTime,
				initialLiquidity
			);

			if (!result) {
				throw new Error("Transaction failed or was rejected");
			}

			// 5. Transaction successful
			toast.success("Transaction sent!", { 
				id: toastId,
				description: "Your market creation is being processed on the blockchain."
			});

			// 6. Wait for transaction to be confirmed
			const { isConfirmed } = await waitForTransactionReceipt({ hash: result });
			
			if (isConfirmed) {
				toast.success("Market created successfully!", { 
					id: toastId,
					description: "Your prediction market has been created on the blockchain!"
				});
				
				// Reset form and go to first step
				setFormData(initialFormData);
				setCurrentStep(1);
			}
			
		} catch (error) {
			console.error("Error in market creation:", error);
			toast.error("Failed to create market", { 
				id: toastId,
				description: error instanceof Error ? error.message : "An unknown error occurred"
			});
		}
	};

	return (
		<div className="min-h-screen cosmic-gradient px-4">
			<main className="container pt-24 px-4">
				<div className="text-center mb-4">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-foreground glow-text">
						Create Prediction Market
					</h1>
					<p className="text-foreground mt-2 max-w-xl mx-auto">
						Launch your own prediction market with our guided wizard. Choose from templates or create custom
						markets.
					</p>
				</div>

				<div className="bg p-4 sm:p-8">
					<ProgressBar currentStep={currentStep} totalSteps={marketSteps} />

					<div className="mb-4 pb-4 text-center">
						<h2 className="text-2xl font-bold text-foreground">{currentStepData?.title}</h2>
						<p className="text-sm text-foreground mt-1">{currentStepData?.description}</p>
					</div>

					<form onSubmit={handleFormSubmit} className="space-y-8">
						{renderStepContent()}

						<div className={`${currentStep === 1 ? "justify-end" : "justify-between"} flex pt-6`}>
							{currentStep > 1 && (
								<Button
									type="button"
									onClick={handleBackClick}
									className="w-36 bg-transparent border border-secondary-light text-foreground shadow-none">
									Previous
								</Button>
							)}

							{currentStep < marketSteps ? (
								<Button
									type="button"
									onClick={handleNextClick}
									disabled={!isStepValid}
									className="w-36 bg-primary hover:bg-transparent hover:border hover:border-secondary-light disabled:opacity-50 disabled:cursor-not-allowed">
									Next
									<ChevronsRight className="h-4 w-4 ml-2" />
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleDeployClick}
									disabled={!isStepValid || isSubmitting}
									className="bg-primary text-primary-foreground hover:bg-transparent hover:border hover:border-secondary-light disabled:opacity-50 disabled:cursor-not-allowed">
									{isSubmitting ? "Deploying..." : "Deploy Market"}
								</Button>
							)}
						</div>
					</form>
				</div>
			</main>
		</div>
	)
}

export default CreateMarket
