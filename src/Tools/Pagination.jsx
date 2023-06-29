import React from "react";
import { Pagination, Typography, Box } from "@mui/material";

const PaginationComponent = ({ page, pageCount, handleChange }) => {
    return (
        
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}    >
            <br />
                <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box>
    );
};


export default PaginationComponent;
