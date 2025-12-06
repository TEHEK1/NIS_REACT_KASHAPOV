import { Skeleton } from '@mui/material';
import styles from '../../styles/PetGrid.module.scss';

const SkeletonLoader = () => {
  return (
    <div className={styles.petGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="text" width="80%" style={{ marginTop: '10px' }} />
          <Skeleton variant="rectangular" height={80} style={{ marginTop: '10px' }} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;