const CustomerFooter = () => {
    return (
        <footer className="w-full py-8 px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max-width mx-auto bg-surface-container-low border-t border-outline-variant mt-auto">
            <div className="font-display-lg text-body-lg font-bold text-primary mb-4 md:mb-0">The Discerning Host</div>
            <div className="text-on-surface font-body-md text-body-md mb-4 md:mb-0 text-center md:text-left">
                © 2024 The Discerning Host. All rights reserved.
            </div>
            <ul className="flex flex-wrap justify-center gap-6">
                <li className="text-on-surface-variant font-body-md text-caption hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                <li className="text-on-surface-variant font-body-md text-caption hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                <li className="text-on-surface-variant font-body-md text-caption hover:text-primary transition-colors cursor-pointer">Contact Us</li>
                <li className="text-on-surface-variant font-body-md text-caption hover:text-primary transition-colors cursor-pointer">Careers</li>
            </ul>
        </footer>
    );
};

export default CustomerFooter;
