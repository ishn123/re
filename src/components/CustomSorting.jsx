import React, { useState } from 'react';
import { columns } from '../data/makedata';
import { Box, Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const CustomSorting = ({ sorting, setSorting }) => {
    const handleSort = (columnId) => {
        const currentSorting = sorting.find(item => item.id === columnId);
        if (!currentSorting) {
            setSorting([{ id: columnId, desc: true }]);
        } else if (currentSorting.desc) {
            setSorting([{ id: columnId, desc: false }]);
        } else {
            setSorting([]);
        }
    };

    const getSortIcon = (columnId) => {
        const currentSorting = sorting.find(item => item.id === columnId);
        if (!currentSorting) {
            return <SwapVertIcon />;
        } else if (currentSorting.desc) {
            return <ArrowDownwardIcon />;
        } else {
            return <ArrowUpwardIcon />;
        }
    };

    return (
        <Box padding={"10px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            {columns.map((item, idx) => (
              
                <Box key={idx} sx={{border: 'solid 1px rgba(0, 0, 0, 0.2)',padding: '10px 0px 10px 10px', width: '250px'}}>
                    <Typography display={"flex"} alignItems={"center"} justifyContent={"space-between"} >{item?.header}
                    <Button onClick={() => {handleSort(item.accessorKey);}}>
                        {getSortIcon(item.accessorKey)}
                    </Button>
                    </Typography>
                   
                </Box>
              
            ))}
        </Box>
    );
};

export default CustomSorting;
