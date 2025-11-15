import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import empthyAnimation from '../assets/animation/Empty Order.json'
const Empty = () => {
    const { t } = useTranslation("constanst");

    return (
        <div
            className='w-full'
        >
            <Lottie
                alt="empty"
                className="w-68 h-68 mx-auto"
                animationData={empthyAnimation} loop={true} />
            <p className='text-gray-600 text-center'>{t("Nodata")}</p>
        </div>
    )
}

export default Empty