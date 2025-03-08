
import React from 'react';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface DetailBreadcrumbProps {
  entityName: string;
  entityId: string;
  parentRoute: string;
  parentName: string;
}

const DetailBreadcrumb: React.FC<DetailBreadcrumbProps> = ({
  entityName,
  entityId,
  parentRoute,
  parentName,
}) => {
  return (
    <Breadcrumb
      items={[
        {
          label: parentName,
          path: parentRoute,
        },
        {
          label: `${entityName} ${entityId}`,
        },
      ]}
    />
  );
};

export default DetailBreadcrumb;
