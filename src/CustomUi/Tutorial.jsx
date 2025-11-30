import { PlayCircle } from "lucide-react";

export default function Tutorial({ about }) {
    return (
        <div className="w-full h-full flex flex-col gap-4">

            <iframe
                src={about}
                title="Tutorial Video"
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
            />
        </div>
    );
}
