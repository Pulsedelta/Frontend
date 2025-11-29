import { Market } from "@/types/types"
import { Line } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface MarketChartProps {
	market: Market
}

export default function MarketChart({ market }: MarketChartProps) {
	// Generate mock chart data
	const generateChartData = () => {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
		const yesData = months.map(() => 30 + Math.random() * 40)
		const noData = months.map(() => 30 + Math.random() * 40)

		return {
			labels: months,
			datasets: [
				{
					label: "Yes",
					data: yesData,
					borderColor: "rgb(34, 197, 94)",
					backgroundColor: "rgba(34, 197, 94, 0.1)",
					tension: 0.4,
					fill: true,
				},
				{
					label: "No",
					data: noData,
					borderColor: "rgb(239, 68, 68)",
					backgroundColor: "rgba(239, 68, 68, 0.1)",
					tension: 0.4,
					fill: true,
				},
			],
		}
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "#9CA3AF",
					usePointStyle: true,
					padding: 15,
				},
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "#1F2937",
				titleColor: "#F3F4F6",
				bodyColor: "#D1D5DB",
				borderColor: "#374151",
				borderWidth: 1,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				max: 100,
				ticks: {
					color: "#6B7280",
				},
				grid: {
					color: "#374151",
				},
			},
			x: {
				ticks: {
					color: "#6B7280",
				},
				grid: {
					color: "#374151",
				},
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	}

	return (
		<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
			<h2 className="text-xl font-bold text-white mb-4">Price Movement</h2>
			<div className="h-[300px] md:h-[400px]">
				<Line data={generateChartData()} options={options} />
			</div>
		</div>
	)
}
