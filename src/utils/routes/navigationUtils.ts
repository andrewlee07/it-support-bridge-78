
import { useNavigate } from 'react-router-dom';
import * as ROUTES from './routeConstants';

/**
 * Navigation utility hook for consistent navigation throughout the app
 * 
 * This hook provides typed navigation functions that use the centralized route constants.
 * Using this approach helps prevent broken links when making UI changes.
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    // General navigation
    goToHome: () => navigate(ROUTES.ROOT),
    goToDashboard: () => navigate(ROUTES.DASHBOARD),
    goToLogin: () => navigate(ROUTES.LOGIN),
    
    // Change Management
    goToChanges: () => navigate(ROUTES.CHANGES),
    goToChangeDetail: (id: string) => navigate(ROUTES.CHANGE_DETAIL(id)),
    goToNewChange: () => navigate(ROUTES.NEW_CHANGE),
    goToEditChange: (id: string) => navigate(ROUTES.EDIT_CHANGE(id)),
    goToRejectChange: (id: string) => navigate(ROUTES.REJECT_CHANGE(id)),
    goToCloseChange: (id: string) => navigate(ROUTES.CLOSE_CHANGE(id)),
    
    // Incidents
    goToIncidents: () => navigate(ROUTES.INCIDENTS),
    goToIncidentDetail: (id: string) => navigate(ROUTES.INCIDENT_DETAIL(id)),
    goToNewIncident: () => navigate(ROUTES.NEW_INCIDENT),
    goToEditIncident: (id: string) => navigate(ROUTES.EDIT_INCIDENT(id)),
    
    // Service Requests
    goToServiceRequests: () => navigate(ROUTES.SERVICE_REQUESTS),
    goToServiceRequestDetail: (id: string) => navigate(ROUTES.SERVICE_REQUEST_DETAIL(id)),
    goToNewServiceRequest: () => navigate(ROUTES.NEW_SERVICE_REQUEST),
    goToEditServiceRequest: (id: string) => navigate(ROUTES.EDIT_SERVICE_REQUEST(id)),
    
    // Problem Management
    goToProblems: () => navigate(ROUTES.PROBLEMS),
    goToProblemDetail: (id: string) => navigate(ROUTES.PROBLEM_DETAIL(id)),
    goToNewProblem: () => navigate(ROUTES.NEW_PROBLEM),
    goToEditProblem: (id: string) => navigate(ROUTES.EDIT_PROBLEM(id)),
    goToKnownErrors: () => navigate(ROUTES.KNOWN_ERRORS),
    
    // Tasks
    goToTasks: () => navigate(ROUTES.TASKS),
    goToTaskDashboard: () => navigate(ROUTES.TASK_DASHBOARD),
    goToTaskDetail: (id: string) => navigate(ROUTES.TASK_DETAIL(id)),
    goToNewTask: () => navigate(ROUTES.NEW_TASK),
    goToEditTask: (id: string) => navigate(ROUTES.EDIT_TASK(id)),
    
    // Knowledge
    goToKnowledge: () => navigate(ROUTES.KNOWLEDGE),
    goToKnowledgeArticle: (id: string) => navigate(ROUTES.KNOWLEDGE_ARTICLE(id)),
    goToNewKnowledgeArticle: () => navigate(ROUTES.NEW_KNOWLEDGE_ARTICLE),
    
    // Generic navigation function
    navigateTo: (path: string) => navigate(path)
  };
};
