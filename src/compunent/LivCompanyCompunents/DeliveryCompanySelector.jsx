import { useTranslation } from "react-i18next";

const companies = [

    { name: "ZR Express", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdTp4dC0C9skkf3Ptw9L9CK3pxiFzvrLhvQ&s" },
    {
        name: "ecom_delivery", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HqE3EoSJb6xl1sRm29x6BRI6iwWp2Pf8ag&s"
    },
    {
        name: "swift_express", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ227JyGZlzJ_YUhHCQxEAPOP5yUAEuDrlFQw&s"
    },


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
