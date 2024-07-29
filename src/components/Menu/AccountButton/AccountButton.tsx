import { useAppSelector } from 'src/hooks/redux';
import styles from './account.module.css'

export const AccountButton = () => {
  const {firstName, lastName} = useAppSelector(state => state.user)

  return <button className={styles.btn}>{`${firstName} ${lastName}`}</button>;
};
