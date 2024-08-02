import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

interface CountryCardProps {
    frenchName?: string;
    region: string;
    flag: string;
    code: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ frenchName, region, flag, code }) => {
    return (
        <Link href={`/${code}`} passHref>
            <div className={styles.card}>
                <Image
                    src={flag}
                    alt={`${frenchName} flag`}
                    width={300}
                    height={200}
                    className={styles.flag}
                />
                <h2 className={styles.title}>{frenchName}</h2>
                <p className={styles.region}>{region}</p>
            </div>
        </Link>
    );
};

export default CountryCard;
