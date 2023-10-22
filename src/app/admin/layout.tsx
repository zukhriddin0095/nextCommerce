import PublicHeader from '@/components/header/publicHeader/PublicHeader';
import childrenType from '@/types/childrenType'
import React from 'react'

const AdminLayout = ({children}: childrenType) => {
  return <div>
    <PublicHeader />
    {children}
    </div>;
}

export default AdminLayout