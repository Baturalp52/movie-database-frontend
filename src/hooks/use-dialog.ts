'use client';

import { useContext } from 'react';
import DialogContext, { IHandleOpenParams } from '@/contexts/dialog.context';

export default function useDialog(): (params: IHandleOpenParams) => void {
  const authContext = useContext(DialogContext);

  if (!authContext) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return authContext.open;
}
