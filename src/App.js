import React, { useReducer, useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton, MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import { CustomPaginationComponent } from './components/CustomPagination';
import { columns } from './data/makedata';
import data from "./data/sample.json";
import "./App.css"
import { Box, Button, Drawer, List, ListItem, Switch, Typography } from '@mui/material';
import CustomGroupingDropDown from "./components/CustomGroupingDropDown";
import GroupIcon from '@mui/icons-material/Group';
import SortIcon from '@mui/icons-material/Sort';
import CustomSorting from './components/CustomSorting';
const App = () => {

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [grouping,setGrouping] = useState([]);
  const [sorting,setSorting] = useState([])

  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    name: true,
    category: true,
    createdAt: true,
    price: true,
    updatedAt: true,
    subcategory: true,
    sale_price:true
  })
  const [columnVisib, setColumnVisib] = useState({
    id: true,
    name: true,
    category: true,
    createdAt: true,
    price: true,
    updatedAt: true,
    subcategory: true,
    sale_price:true
  })
  const [currentPage, setCurrentPage] = useState(0); // State to track current page
  const rowsPerPage = 10; // Number of rows per page


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
  
  const list = (type, table) => {
    switch (type) {
      case "hide/show":
        return (
          <Box padding={"10px"}>
            <Box marginBottom={"10px"}>
              <Typography fontWeight={"700"}>Show/Hide Columns</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection={"column"} width={"300px"}>
              {columns.map((item, idx) => {
                return (
                  <>

                    <Box display="flex" justifyContent="space-between"  padding={"10px"} style={{border:"1px solid rgba(0,0,0,0.2)"}}>
                      <Typography>{item?.header}</Typography>
                      <Switch size="small"  onChange={(e) => {
                        const  colsname= item?.accessorKey
                        console.log(colsname);
                        if (e.target.checked) {

                          setColumnVisib({ ...columnVisibility, [colsname]: false })
                        } else {

                          setColumnVisib({ ...columnVisibility, [colsname]: true });
                        }
                      }} defaultChecked={!columnVisibility[item?.accessorKey] ? true : false}></Switch>
                    </Box>
                  </>
                )
              })}
            </Box>
            <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"10px"}}>
            <Button variant="contained" color='info'  onClick={()=>{
              setColumnVisibility({
                id: true,
                name: true,
                category: true,
                createdAt: true,
                price: true,
                updatedAt: true,
                subcategory: true,
                sale_price:true
              });
            
              // setColumnVisibility(columnVisib);
            }}>Show all columns</Button>
            <Button variant="contained" color="primary" onClick={()=>{
              // setColumnVisibility({
              //   id: true,
              //   name: true,
              //   category: true,
              //   createdAt: true,
              //   price: true,
              //   updatedAt: true,
              //   subcategory: true,
              //   sale_price:true
              // });
              setColumnVisibility(columnVisib);
            }}>Apply</Button>
            </div>
          </Box>
        )
      
      case "group":
        return (
          <CustomGroupingDropDown grouping={grouping} setGrouping={setGrouping}></CustomGroupingDropDown>
        )

      case "sort":
        return (
          <CustomSorting sorting={sorting} setSorting={setSorting}></CustomSorting>
        )
    }


  }
  const toggleDrawer = (type, state) => {
    switch (type) {
      case "hide/show":
        setOpen(true);
        setType(type);
        return;

      case "group":
        setOpen(true);
        setType("group")
        break;

      case "sort":
        setOpen(true);
        setType("sort");
        break;

    }
  }
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;


  const pageData = data.slice(startIndex, endIndex);


  const table = useMaterialReactTable({
    columns,
    data: pageData,
    enablePagination: false,
    enableBottomToolbar: false,
    enableDensityToggle: false,
    enableColumnDragging:false,
    // enableHiding: true,
    enableColumnActions:false,
    enableGlobalFilter: true,
    positionGlobalFilter: 'right', //show the global filter on the left side of the top toolbar
    initialState: {
      showGlobalFilter: true, //show the global filter by default
    },
    // defaultColumn: {
    //   minSize: 5, //allow columns to get smaller than default
    //   maxSize: 9001, //allow columns to get larger than default
    //   size: 20, //make columns wider by default
    // },
    muiTableHeadCellProps: {
      align: 'center',
      sx: {
       
        fontWeight: '700',
        fontSize: '16px',
        padding:'10px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        textAlign:"center",
        fontSize: '14px',
        padding:'10px',
        border:"none",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
      }
    },
    enableGrouping: true,
    positionToolbarAlertBanner:'none',
    state: { columnVisibility,grouping,sorting },
    onColumnVisibilityChange: setColumnVisibility,
    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* <MRT_GlobalFilterTextField table={table}></MRT_GlobalFilterTextField> */}
        <MRT_ShowHideColumnsButton table={table} onClick={() => toggleDrawer("hide/show", true)}></MRT_ShowHideColumnsButton>
        <GroupIcon onClick={()=>toggleDrawer("group",true)}></GroupIcon>
        <SortIcon onClick={()=>toggleDrawer("sort",true)}></SortIcon>
      </>
    ),
    onGroupingChange:(state)=>{
      const current = state();
      setGrouping(current)
    },
    onSortingChange:setSorting

  });

  return (
    <div>
      {/* Render Material React Table */}
      <MaterialReactTable table={table} style={{borderCollapse:"collapse"}}/>

      {/* Render custom pagination component */}
      <Drawer open={open} anchor="right" onClose={() => setOpen(!open)}>
        {list(type, table)}
      </Drawer>
      <CustomPaginationComponent
        page={currentPage}
        onChangePage={handleChangePage}
      // You can add more props as needed by your CustomPaginationComponent
      />
    </div>
  );
};

export default App;
