
import { useState, useMemo } from 'react';
import { Asset, AssetStatus, AssetType } from '@/utils/types/asset';

export function useAssetFilters(assets: Asset[]) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Available options for filters (dynamically generated from data)
  const statusOptions = useMemo(() => {
    const statuses = new Set<string>();
    assets.forEach(asset => statuses.add(asset.status));
    return Array.from(statuses);
  }, [assets]);

  const typeOptions = useMemo(() => {
    const types = new Set<string>();
    assets.forEach(asset => types.add(asset.type));
    return Array.from(types);
  }, [assets]);

  // Filter the assets based on current filters
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === null || asset.status === statusFilter;
      
      // Type filter
      const matchesType = typeFilter === null || asset.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [assets, searchQuery, statusFilter, typeFilter]);

  // Function to determine if any filters are active
  const hasActiveFilters = searchQuery !== '' || statusFilter !== null || typeFilter !== null;

  // Function to reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setTypeFilter(null);
  };

  // Assets counter functions
  const getAssetCountByType = (type: AssetType): number => {
    return assets.filter(asset => asset.type === type).length;
  };

  const getAssetCountByStatus = (status: AssetStatus): number => {
    return assets.filter(asset => asset.status === status).length;
  };

  return {
    // Filter values
    searchQuery,
    statusFilter,
    typeFilter,
    
    // Setters
    setSearchQuery,
    setStatusFilter,
    setTypeFilter,
    
    // Filter options
    statusOptions,
    typeOptions,
    
    // Filtered results
    filteredAssets,
    
    // Filter status
    hasActiveFilters,
    resetFilters,
    
    // Counter helper functions
    getAssetCountByType,
    getAssetCountByStatus
  };
}
