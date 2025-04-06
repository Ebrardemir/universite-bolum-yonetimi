import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SelectClass() {
  const classes = ["1.Sınıf", "2.Sınıf", "3.Sınıf", "4.Sınıf"]
  const defaultProps = {
    options: classes,
  };
  const flatProps = {
    options: classes.map((option) => option.title),
  };
  const [value, setValue] = React.useState(null);
  return (
    <div style={{
      display: 'flex',
      justifyContent: "flex-start",
      marginTop: '40px',
      marginBottom: '20px'
    }}>
      <Autocomplete
        sx={{
          width: 250, '& .MuiInputBase-root': {
            height: 50
          }, '&.Mui-focused': {
            color: 'black', // seçili olsa bile maviye dönmesin
          },

        }}
        {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="Sınıf Seçiniz" variant="standard"
            slotProps={{
              inputLabel: {
                style: { fontSize: '18px', fontWeight: 500, color: 'black' },
              },
            }}

          />
        )}
      />


    </div>
  )
}



export default SelectClass

{/*
  import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px',

    }}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{
          color: '#060709FF',
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '10px',
          '&.Mui-focused': {
            color: 'black', // seçili olsa bile maviye dönmesin
          },

        }}>Sınıf Seçiniz !</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="class1" control={<Radio color="success" />} label="1.SINIF" /> {/*value ları dinamikleştirince düzeltcen 
          <FormControlLabel value="class2" control={<Radio color="success" />} label="2.SINIF" />
          <FormControlLabel value="class3" control={<Radio color="success" />} label="3.SINIF" />
          <FormControlLabel value="class4" control={<Radio color="success" />} label="4.SINIF" />
        </RadioGroup>
      </FormControl>

    </div>  
  */}