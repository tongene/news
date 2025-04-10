'use client';

import React from 'react';

interface StructuredDataProps {
  schema: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ schema }) => {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default StructuredData;
