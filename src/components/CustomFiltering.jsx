import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Slider } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Calendar } from 'react-date-range';

function CustomFiltering({setColumnFilters,table}) {
    const [Name, setName] = useState("");

    const [date, setDate] = useState("")
    const [activate,setActivate] = useState(false);
    
    const [value, setValue] = useState([11, 200]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleRefresh = () => {
      setValue([11, 200]);
    };

    const handleSetFilters = ()=>{
      console.log(value);
      console.log(date)
      setColumnFilters([{id:'name',"value":Name},{id:'price',"value":value}]);
    }
  return (
    <div style={{padding:"10px"}}>
      <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Name
        </Typography>
        <IconButton onClick={()=>setName("")}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <TextField
       
        label="Enter text"
        value={Name}
        sx={{width:"300px !important"}}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
      />
    </Box>
    <Box border={1} p={2} borderRadius={4}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="div" flexGrow={1} onClick={()=>setActivate(!activate)}>
          {date?date:"Created At"}
        </Typography>
        {activate && (
          <Calendar
            date={new Date()}
            onChange={(nv)=>console.log(nv)}
        />
        )}
        <IconButton onClick={()=>{}}>
          <RefreshIcon />
        </IconButton>
      </Box>
      
      {/* <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={createdDateRange}
        onChange={(newDateRange) => setCreatedDateRange(newDateRange)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} variant="outlined" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} variant="outlined" />
          </>
        )}
      /> */}
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Price
        </Typography>
        <IconButton onClick={()=>setName("")}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={11}
        max={200}
        step={1}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        orientation="horizontal"
        style={{ width: 200 }}
      />
      
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Sales Price
        </Typography>
        <IconButton onClick={()=>setName("")}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={11}
        max={200}
        step={1}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        orientation="horizontal"
        style={{ width: 200 }}
      />
      
    </Box>
    <Button variant="contained" onClick={()=>handleSetFilters()}>Apply Filters</Button>
    </div>
  )
}

export default CustomFiltering