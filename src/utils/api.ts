export interface Country {
    cca3: string;
    name: {
        common: string;
        official: string;
        nativeName?: { [key: string]: { common: string } };
    };
    flags: {
        svg: string;
    };
    region: string;
    capital?: string[];
    languages: { [key: string]: string };
    population: number;
    timezones: string[];
}

export async function getCountries(): Promise<Country[]> {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
        throw new Error('Failed to fetch countries');
    }
    return response.json();
}

export const getCountryByCode = async (code: string) => {
    try {
        console.log(`Fetching details for country code: ${code}`);
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        console.log('Response Status:', response.status);
        if (!response.ok) {
            throw new Error(`Failed to fetch country details. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        return data[0]; 
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching country details:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        throw error; 
    }
};



