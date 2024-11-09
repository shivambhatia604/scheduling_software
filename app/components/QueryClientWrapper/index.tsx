// src/components/QueryClientWrapper.js
'use client';
import React, { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface MyComponentProps {
    children: ReactNode;
  }

const queryClient = new QueryClient();

export default function QueryClientWrapper({ children }: MyComponentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
