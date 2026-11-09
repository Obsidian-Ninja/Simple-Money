import EmojiPicker from "emoji-picker-react";
import { Image } from "lucide-react";
import { useState } from "react"

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || emoji?.emoji || "");
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(true)}>
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#55C5ED] text-[#299ED8] rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12"/>
                    ) : (
                        <Image />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                    ></button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;