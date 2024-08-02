export interface Country {
    cca3: string;
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                common?: string;
                official?: string;
            }
        };
        englishName?: string;
    };
    timezones: string[];
    capital: string[];
    flags: {
        svg: string;
    };
    languages: {
        [key: string]: string;
    };
    population: number;
    region: string;
    subregion: string;
    translations: {
        [key: string]: {
            common: string;
            official: string;
        }
    };
}
