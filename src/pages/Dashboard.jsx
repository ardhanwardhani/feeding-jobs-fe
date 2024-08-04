// Dashboard.js
import React, { useState, useEffect } from "react";
import {
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { fetchJobs, fetchJobById, createJob, updateJob, deleteJob, scrapeJobs, exportJobs } from "../apis/jobsApi";
import { useNavigate } from "react-router-dom";
import JobsTable from "../components/JobsTable";
import JobDialog from "../components/JobDialog";
import GenerateDialog from "../components/GenerateDialog";

const Dashboard = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedTagGenerate, setSelectedTagGenerate] = useState('');
    const [jobs, setJobs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openGenerateDialog, setOpenGenerateDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [newJob, setNewJob] = useState({ title: '', companyName: '', locations: '', workType:'', tag: '', salary: '', bulletPoints: [] });
    const [isEdit, setIsEdit] = useState(false);
    const [editJobId, setEditJobId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobsData(selectedTag);
    }, [selectedTag]);

    const fetchJobsData = async (tag) => {
        const response = await fetchJobs(tag);
        setJobs(response.data);
    };

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const handleTagChangeGenerate = (event) => {
        setSelectedTagGenerate(event.target.value);
    };

    const handleCreateJob = () => {
        setOpenDialog(true);
        setIsEdit(false);
        setNewJob({ title: '', companyName: '', locations: '', workType:'', tag: '', salary: '', bulletPoints: [] });
    };

    const handleEditJob = async (id) => {
        try {
            const response = await fetchJobById(id);
            setNewJob(response.data);
            setEditJobId(id);
            setIsEdit(true);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    };

    const handleDeleteJob = (jobId) => {
        deleteJob(jobId).then(() => {
            setJobs(jobs.filter(job => job.id !== jobId));
        });
    };

    const handleGenerate = () => {
        scrapeJobs(selectedTagGenerate).then((newJobs) => {
            fetchJobsData(selectedTag);
            setOpenGenerateDialog(false);
        });
    };

    const handleExport = () => {
        exportJobs(selectedTag).then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'jobs.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCloseGenerateDialog = () => {
        setOpenGenerateDialog(false);
    };

    const handleSubmit = () => {
        if (isEdit) {
            updateJob(editJobId, newJob).then(() => {
                setJobs(jobs.map(job => job.id === editJobId ? newJob : job));
                handleCloseDialog();
            });
        } else {
            createJob(newJob).then((createdJob) => {
                setJobs([...jobs, createdJob]);
                handleCloseDialog();
            });
        }
    };

    const handleAddBulletPoint = () => {
        setNewJob({ ...newJob, bulletPoints: [...newJob.bulletPoints, ''] });
    };

    const handleRemoveBulletPoint = (index) => {
        const newBulletPoints = newJob.bulletPoints.filter((_, i) => i !== index);
        setNewJob({ ...newJob, bulletPoints: newBulletPoints });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name.startsWith('bulletPoints')) {
            const index = parseInt(name.split('.')[1], 10);
            const newBulletPoints = [...newJob.bulletPoints];
            newBulletPoints[index] = value;
            setNewJob(prev => ({ ...prev, bulletPoints: newBulletPoints }));
        } else {
            setNewJob(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleOpenConfirmDialog = (id) => {
        setSelectedJobId(id);
        setOpenConfirmDialog(true);
    };
    
    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setSelectedJobId(null);
    };

    const handleDelete = async () => {
        try {
            if (selectedJobId) {
                await deleteJob(selectedJobId);
                fetchJobsData(selectedTag);
                handleCloseConfirmDialog();
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <Box sx={{p:2}}>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={8}>
                    <FormControl size="small" variant="outlined" sx={{ width: '300px', marginRight:2 }}>
                        <InputLabel id="filter-by-tag">Filter by Tag</InputLabel>
                        <Select
                            labelId="filter-by-tag"
                            id="filter-by-tag-select"
                            value={selectedTag}
                            onChange={handleTagChange}
                            label="Filter by Tag">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Java Spring">Java Spring</MenuItem>
                            <MenuItem value="Python Django">Python Django</MenuItem>
                            <MenuItem value="Python Flask">Python Flask</MenuItem>
                            <MenuItem value="NodeJS Express">NodeJS Express</MenuItem>
                            <MenuItem value="NodeJS Nest">NodeJS Nest</MenuItem>
                            <MenuItem value=".NET Core">.NET Core</MenuItem>
                            <MenuItem value="Angular">Angular</MenuItem>
                            <MenuItem value="ReactJS">ReactJS</MenuItem>
                            <MenuItem value="React Native">React Native</MenuItem>
                            <MenuItem value="Flutter">Flutter</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="success" onClick={handleExport}>Export Jobs</Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="secondary" onClick={() => setOpenGenerateDialog(true)} sx={{marginRight:2}}>Generate Jobs</Button>
                    <Button variant="contained" color="primary" onClick={handleCreateJob}>Create Job</Button>
                </Grid>
            </Grid>
            <JobsTable
                jobs={jobs}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleDetail={(id) => navigate(`/jobs/${id}`)}
                handleEdit={handleEditJob}
                handleDelete={handleDeleteJob}
                handleOpenConfirmDialog={handleOpenConfirmDialog}
            />
            <JobDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                isEdit={isEdit}
                newJob={newJob}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleAddBulletPoint={handleAddBulletPoint}
                handleRemoveBulletPoint={handleRemoveBulletPoint}
            />
            <GenerateDialog
                open={openGenerateDialog}
                handleClose={handleCloseGenerateDialog}
                selectedTagGenerate={selectedTagGenerate}
                handleTagChangeGenerate={handleTagChangeGenerate}
                handleGenerate={handleGenerate}
            />
            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default Dashboard;