import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const Search = (props: any) => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <InputBase
                sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, mr: 1, padding: '10px' }}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Link to="/search">
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Link>
        </Paper>
    );
};
export default Search;