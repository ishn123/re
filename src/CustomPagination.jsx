import { Grid,Typography,IconButton, Paper } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export const CustomPaginationComponent = (props) => {
    console.log(props);
    const { page, rowsPerPage, count, onChangePage } = props;
    let from = rowsPerPage * page + 1;
    let to = rowsPerPage * (page + 1);
    if (to > count) {
        to = count;
    }
    return (
        
            <Grid container alignItems="center" style={{ paddingTop: 8 }} justifyContent="center">
                <Grid item>
                    <IconButton disabled={page === 0} onClick={(e) => onChangePage(e, page - 1)}>
                        <NavigateBeforeIcon fontSize="small" color={page === 0 ? "disabled" : "primary"} />
                        {/* <Typography>{'<'}</Typography> */}
                    </IconButton>
                </Grid>
                <Grid item display="flex">
                    {[1,2,3,4,5,6,7,8,9,10].map((ele)=>{
                        // if(ele>=4&&ele<=){
                        //     return (
                        //         <Paper variant="elevation" square={true} sx={{padding:"5px"}} elevation="0">
                        //             <Typography>....</Typography>
                        //         </Paper>
                        //     )
                        // }
                        return (
                            <Paper variant="elevation"  sx={{padding:"2px",margin:"5px",border:"1px solid rgba(0,0,0,0.2)"}} >
                                <IconButton sx={{fontSize:"15px"}} onClick={(e)=>onChangePage(e,ele)}>{ele}</IconButton>
                            </Paper>
                        )
                    })}
                </Grid>
                <Grid item>
                    <IconButton disabled={to >= count} onClick={(e) => onChangePage(e, page + 1)}>
                        {/* <Typography>{'>'}</Typography> */}
                        <NavigateNextIcon fontSize="small" color={to < count ? "primary" : "disabled"} />
                    </IconButton>
                </Grid>
            </Grid>
        
    );
};