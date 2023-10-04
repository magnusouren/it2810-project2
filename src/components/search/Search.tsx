import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

const Search: React.FC = () => {
    // TODO: Search logic 
    return (
        <TextField 
            variant="outlined"
            placeholder="Search.."
            className={styles.searchBar}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                )
            }}
        />
    );
};
export default Search;