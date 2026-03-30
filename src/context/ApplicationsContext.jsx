import { createContext, useState } from 'react';

export const ApplicationsContext = createContext();

export default function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem('applications');
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  const submitApplication = (applicationData) => {
    const newApplication = {
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      ...applicationData
    };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    return newApplication;
  };

  const updateApplicationStatus = (applicationId, status) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  const deleteApplication = (applicationId) => {
    const updatedApplications = applications.filter(app => app.id !== applicationId);
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  const getApplicationsByPet = (petId) => {
    return applications.filter(app => app.petId === petId);
  };

  const getApplicationsByUser = (userId) => {
    return applications.filter(app => app.userId === userId);
  };

  return (
    <ApplicationsContext.Provider value={{
      applications,
      submitApplication,
      updateApplicationStatus,
      deleteApplication,
      getApplicationsByPet,
      getApplicationsByUser
    }}>
      {children}
    </ApplicationsContext.Provider>
  );
}
