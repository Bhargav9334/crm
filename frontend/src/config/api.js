const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  console.error(" VITE_API_BASE_URL is missing");
}

export const API = {
    clients : `${BASE_URL}/api/clients`,
    employees:`${BASE_URL}/api/employees`,
    invoices : `${BASE_URL}/api/invoices`,
    proposals:`${BASE_URL}/api/proposals`,
  clientsCount: `${BASE_URL}/api/clients/count`,
  projectsCount: `${BASE_URL}/api/projects/count`,
  projects: `${BASE_URL}/api/projects`,
  activityRecent: `${BASE_URL}/api/activities/recent`,
  login: `${BASE_URL}/api/auth/login`,  
  manager:`${BASE_URL}/api/users/manager`,
  managers:`${BASE_URL}/api/users/managers`,
   notifications: `${BASE_URL}/api/notifications`,
   clientProfile: `${BASE_URL}/api/clients/profile`,
   employeeProfile: `${BASE_URL}/api/employees/profile`,
   updateEmployee: (id) =>
  `${BASE_URL}/api/employees/${id}`,
};
