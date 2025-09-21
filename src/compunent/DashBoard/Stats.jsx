
import BoxCard from "../../CustomUi/BoxCard";
import { useTranslation } from "react-i18next";

const Stats = ({ ConfirmedOrder, panddingOrder }) => {
    const Earnings = () => {
        let a = 0
        for (let i = 0; i < ConfirmedOrder.length; i++) {
            a += ConfirmedOrder[i].price
        }
        return a
    }
    const { t } = useTranslation("dashboard");


    return (
        <BoxCard
            about={t('Overview')}
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sold Products */}
                <div className="bg-purple-100 border border-purple-200 rounded-xl p-4 ring-white text-center">
                    <p className="text-sm text-gray-600">
                        {t("SoldProducts")}</p>
                    <p className="text-xl font-bold text-gray-800">{ConfirmedOrder.length}</p>
                </div>

                {/* New Orders */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">{t("NewOrders")}</p>
                    <p className="text-xl font-bold text-gray-800">{panddingOrder.length}</p>
                </div>

                {/* Visits */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">{t("Visits")}</p>
                    <p className="text-xl font-bold text-gray-800">0</p>
                </div>

                {/* Earnings */}
                <div className="bg-green-100 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600">{t("Earnings")}</p>
                    <p className="text-xl font-bold text-gray-800">{Earnings()} DA</p>
                </div>
            </div>
        </BoxCard>

    )
}

export default Stats
