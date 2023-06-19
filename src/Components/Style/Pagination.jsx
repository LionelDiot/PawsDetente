import React from "react";
import { Pagination, Typography, Box } from "@mui/material";

const PaginationComponent = ({ page, pageCount, handleChange }) => {
    return (
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}    >
            <br />
            <Typography align="center" fontSize={50} >
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Typography>
        </Box>
    );
};


export default PaginationComponent;
