import { useState, useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getCountries } from '../utils/api';
import CountryCard from '../components/CountryCard';
import { Country } from '../types/index';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getFavorites } from '../utils/favorites';
import { motion } from 'framer-motion';

interface Props {
    countries: Country[];
}

const Home = ({ countries }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [favoritesCount, setFavoritesCount] = useState(0);

    const filteredCountries = useMemo(() => {
        if (!searchTerm) return countries;

        return countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, countries]);

    useEffect(() => {
        const favoriteCodes = getFavorites();
        setFavoritesCount(favoriteCodes.length);
    }, []);

    return (
        <div>
            <motion.div
                className={styles.searchWrapper}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <input
                    type="text"
                    placeholder="Rechercher par nom ou région"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </motion.div>
            <motion.div
                className={styles.favoritesWrapper}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <Link href="/favorites" className={styles.favoritesLink}>
                    Voir les favoris ({favoritesCount})
                </Link>
            </motion.div>
            <motion.div
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {filteredCountries.length > 0 ? (
                    filteredCountries.map(country => (
                        <motion.div
                            key={country.cca3}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CountryCard
                                frenchName={country.name.nativeName?.fra?.common ?? country.name.common}
                                region={country.region}
                                flag={country.flags.svg}
                                code={country.cca3}
                            />
                        </motion.div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        Aucun pays ou région ne correspond à &quot;{searchTerm}&quot;
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const countries = await getCountries();
    return { props: { countries } };
};

export default Home;
