import Lottie from "lottie-react";
import LoadingAnimation from "../assets/animation/Gear Loader.json";

const LoadingBar = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[200px] py-6 animate-fadeIn">
            <Lottie
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 opacity-90"
                animationData={LoadingAnimation}
                loop={true}
            />

            <h1 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-gray-700 dark:text-gray-200">
                Loading...
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 animate-pulse">
                Please wait a moment
            </p>
        </div>
    );
};

export default LoadingBar;
