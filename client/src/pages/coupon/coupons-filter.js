//Author: Minal Rameshchandra Khona (B00873733)
import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';

export default function CouponsFilter(props) {
    const [value, setValue] = React.useState();
    const handleRadioChange = (event) => {
        setValue((event.target).value);
    };

    const [min, setMin] = React.useState();
    const [max, setMax] = React.useState();

    const handleMinChange = (event) => {
        setMin((event.target).value)
    };

    const handleMaxChange = (event) => {
        setMax((event.target).value)
    };

    const [error, setError] = React.useState();
    const handleClick = (value, min, max) => {
        setError('');
        console.log(value, min, max)
        if (min && max) {
            if (min < max) {
                setError('Minimum cart price should be less than maximum')
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Stack spacing={2} sx={{ display: 'flex' }}>
                <Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">DISCOUNT RANGE</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleRadioChange}>
                            <FormControlLabel value="1020" control={<Radio />} label="10% to 20%" />
                            <FormControlLabel value="2030" control={<Radio />} label="20% to 30%" />
                            <FormControlLabel value="3040" control={<Radio />} label="30% to 40%" />
                            <FormControlLabel value="4050" control={<Radio />} label="40% to 50%" />
                            <FormControlLabel value="5060" control={<Radio />} label="50% to 60%" />
                            <FormControlLabel value="6070" control={<Radio />} label="60% to 70%" />
                            <FormControlLabel value="7080" control={<Radio />} label="70% to 80%" />
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>
                    <FormControl>
                        <FormLabel>CART PRICE</FormLabel>
                        <TextField
                            type="number"
                            id="minCartPrice"
                            label="Minimum"
                            min="10"
                            value={min}
                            onChange={handleMinChange}
                            sx={{ marginTop: 1, marginBottom: 2 }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: 'red', fontStyle: 'italic' }}>
                            {error}
                        </Typography>

                        <TextField
                            type="number"
                            id="maxCartPrice"
                            label="Maximum"
                            value={max}
                            onChange={handleMaxChange}
                            sx={{ marginTop: 1, marginBottom: 2 }}
                        />
                    </FormControl>
                </Paper>

                <Button
                    variant="contained"
                    onClick={(event) => props.handleRadioChange(event, value, min, max)}>
                    Apply Filter
                </Button>
            </Stack>
        </Box >
    );
}