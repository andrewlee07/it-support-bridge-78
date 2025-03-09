
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useServices } from '@/hooks/useServices';

const CategoriesTab = () => {
  const { categories, services, isLoading } = useServices();

  const handleAddCategory = () => {
    console.log('Add category clicked');
    // Implementation for adding a category will be added in future
  };

  const handleEditCategory = (categoryId: string) => {
    console.log('Edit category clicked', categoryId);
    // Implementation for editing a category will be added in future
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log('Delete category clicked', categoryId);
    // Implementation for deleting a category will be added in future
  };

  // Calculate services count for each category
  const getCategoryServicesCount = (categoryId: string) => {
    if (!services) return 0;
    return services.filter(service => service.categoryId === categoryId).length;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Service Categories</CardTitle>
          <Button onClick={handleAddCategory}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        <CardDescription>
          Manage categories for organizing services in the catalogue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading categories...</p>
        ) : !categories || categories.length === 0 ? (
          <p className="text-muted-foreground">No categories found. Add your first category to get started.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Services Count</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description || 'No description'}</TableCell>
                  <TableCell>{getCategoryServicesCount(category.id)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category.id)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteCategory(category.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoriesTab;
