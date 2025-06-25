const CustomStateCard = ({ label, value, color, loading }) => {
    const colors = {
        gray: { bg: 'bg-white', text: 'text-gray-800' },
        green: { bg: 'bg-green-50', text: 'text-green-600' },
        yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        red: { bg: 'bg-red-50', text: 'text-red-600' }
    };

    return (
        <div className={`${colors[color].bg} p-4 rounded-lg shadow border border-gray-200`}>
            <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
            {loading ?
                <div
                    className="animate-pulse"
                >
                    <span
                        className="h-10 bg-gray-200 rounded w-16 flex"
                    ></span>
                </div>
                :
                <p className={`text-2xl font-bold ${colors[color].text}`}>{value}</p>
            }


        </div>
    );
};

export default CustomStateCard