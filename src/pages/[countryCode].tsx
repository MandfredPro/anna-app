import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCountryByCode } from '../utils/api';
import { Country } from '../types/index';
import styles from '../styles/CountryDetail.module.css';
import { ArrowBack, Language, AccessTime, Place, People, Public, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../utils/favorites';
import { motion } from 'framer-motion';
import { formatTimezones, formatNumber, formatEnglishName } from '../utils/formatters';

interface Props {
    country: Country;
}

const CountryDetail = ({ country }: Props) => {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const favorites = getFavorites();
        setIsFavorite(favorites.includes(country.cca3));
    }, [country.cca3]);

    const handleBack = () => {
        router.back();
    };

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(country.cca3);
        } else {
            addFavorite(country.cca3);
        }
        setIsFavorite(!isFavorite);
    };

    const nativeName = country.name.nativeName?.fra?.common ?? 'Nom en français non disponible';

    return (
        <div className={styles.container}>
            <motion.button
                onClick={handleBack}
                className={styles.backButton}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <ArrowBack /> Retour
            </motion.button>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.flagContainer}
            >
                <Image
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    width={500}
                    height={300}
                    className={styles.flag}
                />
            </motion.div>
            <motion.div
                onClick={handleFavoriteToggle}
                className={styles.favoriteIcon}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
            >
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isFavorite ? 1.5 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                    {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
                </motion.div>
            </motion.div>
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {country.name.common}
            </motion.h1>
            {[
                { icon: <Language />, label: 'Nom en français', value: nativeName },
                { icon: <Language />, label: 'Nom anglophone', value: formatEnglishName(country.name.common) },
                { icon: <Language />, label: 'Nom officiel', value: country.name.official },
                { icon: <AccessTime />, label: 'Fuseau horaire', value: formatTimezones(country.timezones) },
                { icon: <Place />, label: 'Capitale', value: country.capital?.[0] ?? 'Non spécifiée' },
                { icon: <Language />, label: 'Langues parlées', value: Object.values(country.languages).join(', ') },
                { icon: <People />, label: 'Total habitants', value: formatNumber(country.population) },
                { icon: <Public />, label: 'Région', value: country.region }
            ].map((item, index) => (
                <motion.div
                    key={index}
                    className={styles.info}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    {item.icon}
                    <div className={styles.label}>{item.label}:</div>
                    <div className={styles.value}>{item.value}</div>
                </motion.div>
            ))}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { countryCode } = context.params || {};

    if (typeof countryCode !== 'string' || countryCode.length !== 3) {
        return {
            notFound: true,
        };
    }

    try {
        const countryData = await getCountryByCode(countryCode);
        return {
            props: { country: countryData },
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in getServerSideProps:', error.message);
        } else {
            console.error('An unknown error occurred in getServerSideProps:', error);
        }
        return {
            notFound: true,
        };
    }
};

export default CountryDetail;
