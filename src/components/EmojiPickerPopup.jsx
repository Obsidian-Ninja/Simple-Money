import EmojiPicker from "emoji-picker-react";
import { Image } from "lucide-react";
import { useState } from "react"


const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOPen, setIsOPen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onselect(emoji?.imageUrl || "");
        isOPen(false);
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOPen(true)}>
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12"/>
                    ) : (
                        <Image />
                    )}
                </div>
                    <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOPen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOPen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                    ></button>
                    <EmojiPicker
                        open={isOPen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;