
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReleaseStatus } from '@/utils/types';

interface ReleasesHeaderProps {
  onTabChange: (value: string) => void;
  onAddNew: () => void;
  activeTab: string;
  onStatusFilterChange: (status: ReleaseStatus | undefined) => void;
  statusFilter: ReleaseStatus | undefined;
  totalCount: number;
}

const ReleasesHeader: React.FC<ReleasesHeaderProps> = ({
  onTabChange,
  onAddNew,
  activeTab,
  onStatusFilterChange,
  statusFilter,
  totalCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Release Management</h1>
          <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
            {totalCount} {totalCount === 1 ? 'release' : 'releases'}
          </span>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter ? `Status: ${statusFilter}` : 'All Statuses'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup 
                value={statusFilter || "all"} 
                onValueChange={(value) => 
                  onStatusFilterChange(value === "all" ? undefined : value as ReleaseStatus)
                }
              >
                <DropdownMenuRadioItem value="all">All Statuses</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Planned">Planned</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="In Progress">In Progress</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Deployed">Deployed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Cancelled">Cancelled</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Release
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Releases</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="deployed">Deployed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ReleasesHeader;
