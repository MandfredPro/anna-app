export const formatTimezones = (timezones: string[]): string => {
    return timezones.length <= 5
        ? timezones.join(', ')
        : `${timezones.slice(0, 5).join(', ')}...`;
};

export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat().format(number);
};

export const formatEnglishName = (name: string | undefined): string => {
    return name ?? 'Nom en anglais non disponible';
};
