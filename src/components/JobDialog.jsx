import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box
} from '@mui/material';

const JobDialog = ({ open, handleClose, isEdit, newJob, handleChange, handleSubmit, handleAddBulletPoint, handleRemoveBulletPoint }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEdit ? 'Edit Job' : 'Create Job'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isEdit ? 'Edit the form to update the job.' : 'Please fill out the form to create a new job.'}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Job Title"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="companyName"
                    label="Company Name"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.companyName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="workType"
                    label="Work Type"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.workType}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="locations"
                    label="Location"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.locations}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="tag"
                    label="Tag"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.tag}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="salary"
                    label="Salary"
                    type="text"
                    size="small"
                    fullWidth
                    value={newJob.salary}
                    onChange={handleChange}
                />
                {/* {newJob.bulletPoints?.map((bulletPoint, index) => (
                    <Box key={index} display="flex" alignItems="center">
                        <TextField
                            margin="dense"
                            name={`bulletPoints.${index}`}
                            label={`Bullet Point ${index + 1}`}
                            type="text"
                            size="small"
                            fullWidth
                            value={bulletPoint}
                            onChange={handleChange}
                        />
                        <Button variant='outlined' color='error' size='small' onClick={() => handleRemoveBulletPoint(index)}>-</Button>
                    </Box>
                ))} */}
                {newJob.bulletPoints.map((bulletPoint, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                        <TextField
                            margin="dense"
                            name={`bulletPoints.${index}`}
                            label={`Bullet Point ${index + 1}`}
                            type="text"
                            size="small"
                            fullWidth
                            value={bulletPoint}
                            onChange={handleChange}
                        />
                        <Button variant='outlined' color='error' size='small' onClick={() => handleRemoveBulletPoint(index)}>-</Button>
                    </Box>
                ))}
                <Button onClick={handleAddBulletPoint}>Add Bullet Point</Button>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>{isEdit ? 'Update' : 'Create'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobDialog;
