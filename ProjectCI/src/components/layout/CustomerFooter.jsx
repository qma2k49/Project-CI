const CustomerFooter = () => {
    return (
        <footer className="w-full py-6 px-6 md:px-12 bg-[#FAF9F6] border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4">
                <div className="font-bold text-[#C25E30] text-lg">The Discerning Host</div>
                
                <ul className="flex flex-wrap justify-center gap-6">
                    <li className="text-gray-500 hover:text-[#C25E30] transition-colors cursor-pointer">Privacy Policy</li>
                    <li className="text-gray-500 hover:text-[#C25E30] transition-colors cursor-pointer">Terms of Service</li>
                    <li className="text-gray-500 hover:text-[#C25E30] transition-colors cursor-pointer">Contact Us</li>
                    <li className="text-gray-500 hover:text-[#C25E30] transition-colors cursor-pointer">Careers</li>
                </ul>

                <div className="text-gray-500 text-center md:text-right">
                    © 2024 The Discerning Host. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default CustomerFooter;
