import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="text-center py-20 md:py-32">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Make Every ₹upee Count
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                    Know where your money goes. Decide where it grows. Take charge of your finances and build better money habits, one step at a time.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link 
                        to="/signup"
                        className="w-full sm:w-auto bg-[#55C5ED] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#299ED8] transition-all shadow-md"
                    >
                        मुफ़्त में ट्रैकिंग शुरू करें
                    </Link>

                    <Link
                        to="/signup"
                        className="w-full sm:w-auto bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        Learn More <ArrowRight className="h-5 w-5" />
                    </Link>

                </div>
            </div>
        </section>
    )
}

export default HeroSection;