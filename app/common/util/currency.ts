const resolveCurrency = (currency?: string) => {
    const normalized = currency?.trim().toUpperCase() || "EUR";
    return normalized;
};

export const formatCurrency = (amount: number, currency?: string) => {
    const resolvedCurrency = resolveCurrency(currency);

    try {
        return new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: resolvedCurrency,
            currencyDisplay: "symbol",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
            currencyDisplay: "symbol",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
};

export const formatEuro = (amount: number) => formatCurrency(amount, "EUR");
