
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useServices } from '@/hooks/useServices';
import ServiceList from '@/components/services/ServiceList';
import ServiceDialog from '@/components/services/ServiceDialog';
import ServiceDetail from '@/components/services/ServiceDetail';

const ServiceCatalog = () => {
  const {
    categories,
    servicesWithCategories,
    selectedService,
    isDialogOpen,
    isSubmitting,
    isLoading,
    viewMode,
    setIsDialogOpen,
    handleSubmitService,
    handleEditService,
    handleAddService,
    handleViewService,
    handleBackToList,
  } = useServices();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IT Service Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize IT services available to users
          </p>
        </div>

        {viewMode === 'list' ? (
          <ServiceList
            services={servicesWithCategories}
            categories={categories}
            onAddService={handleAddService}
            onEditService={handleViewService}
            isLoading={isLoading}
          />
        ) : (
          selectedService && (
            <ServiceDetail
              service={selectedService}
              onEditService={() => setIsDialogOpen(true)}
              onBack={handleBackToList}
            />
          )
        )}

        <ServiceDialog
          isOpen={isDialogOpen}
          service={selectedService || undefined}
          categories={categories}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmitService}
          isSubmitting={isSubmitting}
        />
      </div>
    </PageTransition>
  );
};

export default ServiceCatalog;
