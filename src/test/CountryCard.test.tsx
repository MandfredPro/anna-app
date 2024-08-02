import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

describe('CountryCard', () => {
    it('should render the country card with the correct props', () => {
        const props = {
            name: 'France',
            region: 'Europe',
            flag: 'https://restcountries.com/v3.1/flags/fr.png',
            code: 'FRA',
            frenchName: 'France'
        };

        render(<CountryCard {...props} />);

        expect(screen.getByAltText('France flag')).toBeInTheDocument();
        expect(screen.getByText('France')).toBeInTheDocument();
        expect(screen.getByText('Europe')).toBeInTheDocument();
        expect(screen.getByText('France')).toBeInTheDocument();
    });
});
