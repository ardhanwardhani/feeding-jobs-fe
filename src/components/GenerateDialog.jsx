import React from 'react';
import {
    Button,
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

const GenerateDialog = ({ open, handleClose, selectedTagGenerate, handleTagChangeGenerate, handleGenerate }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Generate Jobs</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{marginBottom:2}}>
                    Select a tag and click Generate to scrape job data.
                </DialogContentText>
                <FormControl size="small" variant="outlined" sx={{ width: '300px' }}>
                    <InputLabel id="tag-label">Filter by Tag</InputLabel>
                    <Select
                        labelId="tag-label"
                        id="tag-select"
                        value={selectedTagGenerate}
                        onChange={handleTagChangeGenerate}
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
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' color="primary" onClick={handleGenerate}>Generate</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GenerateDialog;
