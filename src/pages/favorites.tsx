import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { getFavorites } from '../utils/favorites';
import { getCountries } from '../utils/api';
import CountryCard from '../components/CountryCard';
import { Country } from '../types/index';
import styles from '../styles/Favorites.module.css';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Props {
    countries: Country[];
}

const Favorites = ({ countries }: Props) => {
    const [favorites, setFavorites] = useState<Country[]>([]);
    const router = useRouter();

    useEffect(() => {
        const favoriteCodes = getFavorites();
        const favoriteCountries = countries.filter(country => favoriteCodes.includes(country.cca3));
        setFavorites(favoriteCountries);
    }, [countries]);

    const handleBack = () => {
        router.back();
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    className={styles.backButton}
                >
                    <ArrowBack /> Retour
                </Button>
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                Vos pays favoris ({favorites.length})
            </motion.h1>
            {favorites.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    Aucun pays ajouté aux favoris.
                </motion.p>
            ) : (
                <motion.div
                    className={styles.list}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {favorites.map((country, index) => (
                        <motion.div
                            key={country.cca3}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <CountryCard
                                frenchName={country.name.nativeName?.fra?.common ?? country.name.common}
                                region={country.region}
                                flag={country.flags.svg}
                                code={country.cca3}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const countries = await getCountries();
    return { props: { countries } };
};

export default Favorites;
