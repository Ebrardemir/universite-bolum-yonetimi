import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedClass } from '../redux/slices/selectionSlice';

function SelectClass() {
  const dispatch = useDispatch();
  const selectedClass = useSelector((state) => state.selection.selectedClass);
  const classes = [{ label: "1.Sınıf", value: 1 },
  { label: "2.Sınıf", value: 2 },
  { label: "3.Sınıf", value: 3 },
  { label: "4.Sınıf", value: 4 }];

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
        options={classes}
        getOptionLabel={(option) => option.label}
        value={classes.find((cls) => cls.value === selectedClass) || null}
        onChange={(event, newValue) => dispatch(setSelectedClass(newValue?.value))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sınıf Seçiniz"
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

export default SelectClass;
