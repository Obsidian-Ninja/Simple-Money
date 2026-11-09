import { Menu, X } from "lucide-react";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', to: '/home' },
        { name: 'About us', to: '/#' },
        { name: 'Contact us', to: '/#' },
    ];

    return (
        <header className="border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <img src={assets.logo} alt="logo" className="h-10 w-10" />
                        <span className="text-lg font-bold text-black truncate">Simple Money</span>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                to={link.to}
                                key={link.name}
                                className="text-gray-600 hover:text-[#299ED8] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-[#299ED8] transition-colors"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-[#55C5ED] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#299ED8] transition-colors"
                            >
                                शुरू करें
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-600 hover:text-[#299ED8] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-600 hover:text-[#299ED8] transition-colors"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-[#55C5ED] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#299ED8] transition-colors text-center"
                                >
                                    शुरू करें
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;