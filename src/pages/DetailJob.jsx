import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchJobById, updateJob, deleteJob } from "../apis/jobsApi";

const DetailJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editJob, setEditJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getJob = async () => {
            const response = await fetchJobById(id);
            setJob(response.data);
        };
        getJob();
    }, [id]);

    if (!job) return <div>Loading...</div>

    const handleBack = () => {
        navigate('/');
    };

    const handleEditOpen = () => {
        setEditJob({ ...job });
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
        setEditJob(null);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith('bulletPoints')) {
            const index = parseInt(name.split('.')[1], 10);
            const newBulletPoints = [...editJob.bulletPoints];
            newBulletPoints[index] = value;
            setEditJob({ ...editJob, bulletPoints: newBulletPoints });
        } else {
            setEditJob({ ...editJob, [name]: value });
        }
    };

    const handleAddEditBulletPoint = () => {
        setEditJob({ ...editJob, bulletPoints: [...editJob.bulletPoints, ''] });
    };

    const handleRemoveEditBulletPoint = (index) => {
        const newBulletPoints = editJob.bulletPoints.filter((_, i) => i !== index);
        setEditJob({ ...editJob, bulletPoints: newBulletPoints });
    };

    const handleEditSubmit = async () => {
        try {
            await updateJob(id, editJob); // Sesuaikan dengan fungsi update API Anda
            setJob(editJob);
            handleEditClose();
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteJob(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <Box sx={{ width: '100vw', height: '100%', padding: 2, backgroundColor: 'white' }}>
            <Box sx={{ width: '600px', minHeight: '400px', backgroundColor: 'grey', margin: 'auto', borderRadius: '10px', p:2 }}>
                <h2>{job.title}</h2>
                <p>Company: {job.companyName}</p>
                <p>Location: {job.locations}</p>
                <p>Work Type: {job.workType}</p>
                <p>Description:</p>
                <ul>
                    {job.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
                <p>Salary: {job.salary}</p>
                <p>Listing Date: {formatDate(job.listingDate)}</p>
                <p>Tag: {job.tag}</p>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Button variant="contained" color="primary" size="small" onClick={handleBack}>Back</Button>
                    <Button variant="contained" color="warning" size="small" onClick={handleEditOpen}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
                </Box>
            </Box>
            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogTitle>Edit Job</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit the form to update the job.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Job Title"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.title || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="companyName"
                        label="Company Name"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.companyName || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="workType"
                        label="Work Type"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.workType || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="locations"
                        label="Location"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.locations || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="tag"
                        label="Tag"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.tag || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="salary"
                        label="Salary"
                        type="text"
                        size="small"
                        fullWidth
                        value={editJob?.salary || ''}
                        onChange={handleEditChange}
                    />
                    {editJob?.bulletPoints && editJob.bulletPoints.map((point, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                margin="dense"
                                name={`bulletPoints.${index}`}
                                label={`Bullet Point ${index + 1}`}
                                type="text"
                                size="small"
                                fullWidth
                                value={point}
                                onChange={handleEditChange}
                            />
                            <Button variant="outlined" color="error" size="small" onClick={() => handleRemoveEditBulletPoint(index)}>-</Button>
                        </Box>
                    ))}
                    <Button onClick={handleAddEditBulletPoint}>+ Add Bullet Point</Button>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleEditClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleEditSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DetailJob;
