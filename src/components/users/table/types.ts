
import { User, UserRole } from '@/utils/types/user';

export interface Column {
  key: keyof User | 'actions' | string;
  label: string;
  sortable?: boolean;
}

export interface UserTableProps {
  users: User[];
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
  onRoleChange: (userId: string, role: UserRole, checked: boolean) => void;
}
