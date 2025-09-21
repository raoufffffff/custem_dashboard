import { useTranslation } from "react-i18next";

const companies = [

    { name: "ZR Express", logo: "https://eco-oran.com/wp-content/uploads/2023/08/logo-200x200-05-1.jpg" },

];

const DeliveryCompanySelector = ({ onSelect }) => {
    const { t } = useTranslation("DelevryComapnesAndPixals");

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {companies.map((company) => (
                <div
                    key={company.name}
                    className={`bg-white border rounded-lg shadow p-4 text-center transition hover:shadow-lg `}
                >
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="h-16 mx-auto object-contain mb-2"
                    />
                    <h2 className="text-sm font-semibold mb-3">{company.name}</h2>
                    <button
                        onClick={() => onSelect(company.name, company.logo)}
                        className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                    >
                        {t("Connectnow")}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DeliveryCompanySelector;
