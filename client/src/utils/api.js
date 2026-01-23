import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

// Authentication APIs
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
};

// Component APIs
export const componentAPI = {
    getAll: () => api.get('/components'),
    create: (componentData) => api.post('/components', componentData),
    get: (id) => api.get(`/components/${id}`),
    update: (id, updates) => api.put(`/components/${id}`, updates),
    delete: (id) => api.delete(`/components/${id}`),
    getChildren: (id) => api.get(`/components/${id}/children`),
};

// File APIs
export const fileAPI = {
    upload: (componentId, files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        return api.post(`/components/${componentId}/files`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getAll: (componentId) => api.get(`/components/${componentId}/files`),
    get: (fileId) => api.get(`/files/${fileId}`, { responseType: 'blob' }),
    delete: (fileId) => api.delete(`/files/${fileId}`),
};

// Workspace APIs
export const workspaceAPI = {
    export: () => api.get('/workspace/export'),
    import: (workspaceData) => api.post('/workspace/import', workspaceData),
    clear: () => api.delete('/workspace/clear'),
};

export default api;
