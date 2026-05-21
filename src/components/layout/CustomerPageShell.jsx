const CustomerPageShell = ({
    eyebrow,
    title,
    description,
    children,
    className = '',
    headerAction,
}) => (
    <div className={`customer-page ${className}`}>
        {(eyebrow || title || description || headerAction) && (
            <header className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    {eyebrow && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/30 text-primary text-sm font-semibold mb-3">
                            {eyebrow}
                        </div>
                    )}
                    {title && (
                        <h1 className="text-3xl md:text-4xl font-bold text-on-background tracking-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-on-surface-variant mt-2 max-w-2xl text-base leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
                {headerAction && <div className="shrink-0">{headerAction}</div>}
            </header>
        )}
        {children}
    </div>
);

export default CustomerPageShell;
