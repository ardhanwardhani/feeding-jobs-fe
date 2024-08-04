import React from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from '@mui/material';

const JobsTable = ({ jobs, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDetail, handleEdit, handleOpenConfirmDialog }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Tag</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.companyName}</TableCell>
                                <TableCell>{job.locations}</TableCell>
                                <TableCell>{job.tag}</TableCell>
                                <TableCell sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: 1 }}>
                                    <Button variant="contained" color="success" size="small" onClick={() => handleDetail(job.id)}>Detail</Button>
                                    <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(job.id)}>Edit</Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleOpenConfirmDialog(job.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={jobs.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default JobsTable;
