export const getFavorites = (): string[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (code: string) => {
    const favorites = getFavorites();
    if (!favorites.includes(code)) {
        favorites.push(code);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFavorite = (code: string) => {
    let favorites = getFavorites();
    favorites = favorites.filter(favorite => favorite !== code);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
