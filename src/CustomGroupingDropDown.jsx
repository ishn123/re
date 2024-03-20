import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { columns } from './data/makedata';
import { Button } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CustomGroupingDropDown({grouping,setGrouping}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const setGroups = ()=>{
    console.log(personName);
    setGrouping(personName);
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{padding:"10px"}}>
      <FormControl sx={{ m: 2, width: 400 }}>
        <InputLabel id="demo-multiple-chip-label">Group</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {columns.map((name) => (
            <MenuItem
              key={name?.accessorKey}
              value={name?.id}
              style={getStyles(name?.header, personName, theme)}
              selected={personName.includes(name?.value)?true:false}
            >
              {name?.header}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{gap:"10px"}}>
        <Button variant="contained" color='info' sx={{padding:"5px"}} onClick={()=>{
          setGrouping([]);
          setPersonName([]);
        }}>Clear Grouping</Button>
        <Button variant="contained" color="primary" onClick={()=>setGroups()}>Apply Grouping</Button>
      </Box>
      
    </div>
  );
}