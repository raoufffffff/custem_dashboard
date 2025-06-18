// ProjectsOverview.tsx
import {
    LayoutDashboard,
    LineChart,
    Bug,
    Smartphone,
    DollarSign,
    ShoppingCart,
    CheckCircle,
} from "lucide-react";

const projects = [
    {
        icon: <LayoutDashboard className="w-5 h-5 text-white" />,
        name: "Material UI XD Version",
        members: ["A", "B", "C"],
        budget: "$14,000",
        progress: 90,
        color: "bg-blue-500",
    },
    {
        icon: <LineChart className="w-5 h-5 text-white" />,
        name: "Add Progress Track",
        members: ["B", "D"],
        budget: "$3,000",
        progress: 20,
        color: "bg-blue-200",
    },
    {
        icon: <Bug className="w-5 h-5 text-white" />,
        name: "Fix Platform Errors",
        members: ["A", "E"],
        budget: "Not set",
        progress: 100,
        color: "bg-green-500",
    },
    {
        icon: <Smartphone className="w-5 h-5 text-white" />,
        name: "Launch our Mobile App",
        members: ["A", "B", "C", "D"],
        budget: "$20,500",
        progress: 100,
        color: "bg-green-500",
    },
    {
        icon: <DollarSign className="w-5 h-5 text-white" />,
        name: "Add the New Pricing Page",
        members: ["C"],
        budget: "$500",
        progress: 60,
        color: "bg-blue-400",
    },
    {
        icon: <ShoppingCart className="w-5 h-5 text-white" />,
        name: "Redesign New Online Shop",
        members: ["B", "D"],
        budget: "$2,000",
        progress: 80,
        color: "bg-blue-500",
    },
];

export default function ItemList() {
    return (
        <div className="w-11/12 md:w-7/12 p-4 my-3 lg:h-[525px] bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>30 done this month</span>
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="text-sm text-[#777] border-b-[0.5px] border-b-[#9999]">
                            <th className="py-2">COMPANIES</th>
                            <th className="py-2">MEMBERS</th>
                            <th className="py-2">BUDGET</th>
                            <th className="py-2">COMPLETION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj, i) => (
                            <tr key={i} className="text-sm border-b-[0.5px] border-b-[#9999]">
                                <td className="flex items-center gap-2 py-3">
                                    <div className={`p-2 rounded ${proj.color}`}>
                                        {proj.icon}
                                    </div>
                                    <span className="text-gray-800 font-medium">{proj.name}</span>
                                </td>
                                <td>
                                    <div className="flex -space-x-2">
                                        {proj.members.map((m, i) => (
                                            <div
                                                key={i}
                                                className="w-6 h-6 bg-gray-300 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white"
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-gray-700">{proj.budget}</td>
                                <td className="w-40">
                                    <div className="h-2 bg-gray-200 rounded">
                                        <div
                                            className={`h-full ${proj.color} rounded`}
                                            style={{ width: `${proj.progress}%` }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
