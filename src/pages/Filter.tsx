import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import { couponsList } from '../data'

export default function CheckboxesGroup() {
    const [state, setState] = React.useState({
        zara: false,
        and: false,
        mango: false,
        puma: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { zara, and, mango, puma } = state;

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '100%'
    }));

    const [value, setValue] = React.useState('1020');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Stack spacing={2} sx={{ display: 'flex' }}>
                <Item>
                    <FormControl sx={{ display: 'flex' }}>
                        <FormLabel component="legend">BRANDS</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={zara} onChange={handleChange} name="a" />
                                }
                                label="ZARA"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={and} onChange={handleChange} name="and" />
                                }
                                label="AND"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={mango} onChange={handleChange} name="mango" />
                                }
                                label="Mango"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={puma} onChange={handleChange} name="puma" />
                                }
                                label="Puma"
                            />
                        </FormGroup>
                    </FormControl>
                </Item>

                <Item>
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
                </Item>
                <Button variant="contained">Apply Filter</Button>
            </Stack>
        </Box>
    );
}