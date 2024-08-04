import axios from "axios";

const jobApiUrl = `http://localhost:3000/jobs`;

export const fetchJobs = async (tag) => {
    const response = await axios.get(`${jobApiUrl}`, {
        params: { tag: tag || undefined }
    });

    return response;
};

export const fetchJobById = (id) => {
    return axios.get(`${jobApiUrl}/${id}`);
};

export const createJob = (data) => {
    return axios.post(jobApiUrl, data);
};

export const updateJob = (id, data) => {
    return axios.put(`${jobApiUrl}/${id}`, data);
};

export const deleteJob = async (id) => {
    return axios.delete(`${jobApiUrl}/${id}`);
};

export const scrapeJobs = (keyword) => {
    return axios.get(`${jobApiUrl}/scrape/${keyword}`);
};

export const exportJobs = async (tag) => {
    try {
        const response = await axios.post(`${jobApiUrl}/export`, null, {
            params: { tag },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error('Error exporting jobs:', error);
        throw error;
    }
};