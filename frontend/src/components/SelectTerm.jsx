import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTerm } from '../redux/slices/selectionSlice';

function SelectTerm() {
    const dispatch = useDispatch();
    const selectedTerm = useSelector((state) => state.selection.selectedTerm);
    const terms = [
        { label: "Güz", value: 1 },
        { label: "Bahar", value: 2 }
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: "flex-start",
            marginTop: '40px',
            marginBottom: '20px'
        }}>
            <Autocomplete
                sx={{
                    width: 250,
                    '& .MuiInputBase-root': { height: 50 },
                    '&.Mui-focused': { color: 'black' },
                }}
                options={terms}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => dispatch(setSelectedTerm(value?.value))}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Dönem Seçiniz"
                        variant="standard"
                        slotProps={{
                            inputLabel: {
                                style: { fontSize: '18px', fontWeight: 500, color: 'black' },
                            },
                        }}
                    />
                )}
            />
        </div>
    );
}

export default SelectTerm;
