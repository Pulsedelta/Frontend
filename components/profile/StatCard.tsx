import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
	label: string
	value: string
	icon: ReactNode
	iconColorClass: string // e.g., "bg-red-500/10 text-red-500"
}

export default function StatCard({ label, value, icon, iconColorClass }: StatCardProps) {
	return (
		<div className="bg-[#09090b] border border-white/5 rounded-2xl p-5 flex items-center justify-between transition-all hover:border-white/10">
			<div className="flex flex-col gap-1">
				<span className="text-xs font-medium text-gray-400">{label}</span>
				<span className="text-xl font-bold text-white tracking-wide">{value}</span>
			</div>

			<div className={cn("p-2 rounded-lg flex items-center justify-center", iconColorClass)}>{icon}</div>
		</div>
	)
}
