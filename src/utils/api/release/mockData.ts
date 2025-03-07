
import { Release, ReleaseItem } from '../../types';
import { mockUsers } from '../../mockData/users';
import { mockTickets } from '../../mockData/tickets';
import { mockChangeRequests } from '../../mockData/changeManagement';
import { v4 as uuidv4 } from 'uuid';

// Mock releases data
export const mockReleases: Release[] = [
  {
    id: "REL-1001",
    title: "Website Modernization",
    version: "2.0.0",
    type: "major",
    description: "Major release with new UI components and improved user experience",
    plannedDate: new Date(2023, 11, 15),
    status: "Planned",
    owner: mockUsers[0].id,
    createdAt: new Date(2023, 10, 1),
    updatedAt: new Date(2023, 10, 1),
    approvalStatus: "pending",
    items: [],
    audit: []
  },
  {
    id: "REL-1002",
    title: "Security Patch Release",
    version: "1.5.3",
    type: "patch",
    description: "Critical security updates and bug fixes",
    plannedDate: new Date(2023, 10, 20),
    status: "In Progress",
    owner: mockUsers[1].id,
    createdAt: new Date(2023, 10, 5),
    updatedAt: new Date(2023, 10, 12),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 10, 6),
    items: [],
    audit: []
  },
  {
    id: "REL-1003",
    title: "Feature Enhancement Pack",
    version: "1.6.0",
    type: "minor",
    description: "New features including enhanced reporting capabilities",
    plannedDate: new Date(2023, 11, 30),
    status: "Planned",
    owner: mockUsers[2].id,
    createdAt: new Date(2023, 10, 8),
    updatedAt: new Date(2023, 10, 8),
    approvalStatus: "pending",
    items: [],
    audit: []
  },
  {
    id: "REL-1004",
    title: "Database Optimization",
    version: "1.5.4",
    type: "patch",
    description: "Performance improvements for database queries",
    plannedDate: new Date(2023, 9, 25),
    status: "Deployed",
    owner: mockUsers[1].id,
    createdAt: new Date(2023, 9, 10),
    updatedAt: new Date(2023, 9, 26),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 9, 15),
    items: [],
    audit: []
  },
  {
    id: "REL-1005",
    title: "Emergency Hotfix",
    version: "1.5.2.1",
    type: "emergency",
    description: "Critical bug fix for login functionality",
    plannedDate: new Date(2023, 9, 12),
    status: "Deployed",
    owner: mockUsers[0].id,
    createdAt: new Date(2023, 9, 11),
    updatedAt: new Date(2023, 9, 12),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 9, 11),
    items: [],
    audit: []
  }
];

// Initialize with some demo release items
export const mockReleaseItems: ReleaseItem[] = [
  {
    id: uuidv4(),
    releaseId: "REL-1001",
    itemId: mockChangeRequests[0].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 2),
    addedBy: mockUsers[0].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1001",
    itemId: mockChangeRequests[1].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 3),
    addedBy: mockUsers[0].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1002",
    itemId: mockChangeRequests[2].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 6),
    addedBy: mockUsers[1].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1004",
    itemId: mockTickets[0].id,
    itemType: "incident",
    addedAt: new Date(2023, 9, 11),
    addedBy: mockUsers[1].id
  }
];

// Initialize releases with their items
export let initializedReleases = mockReleases.map(release => {
  const items = mockReleaseItems.filter(item => item.releaseId === release.id);
  return {
    ...release,
    items
  };
});
