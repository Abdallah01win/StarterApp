import type { Route } from '@/types'

const routes: Route[] = [
  {
    name: 'dashboard',
    icon: 'lucide:layout-dashboard'
  },
  {
    name: 'users',
    icon: 'lucide:user-2',
    description: 'users-page-description',
    viewPermission: 'view-users',
    createPermission: 'create-users',
    editPermission: 'edit-users',
    deletePermission: 'delete-users'
  },
  {
    name: 'clients',
    icon: 'lucide:building-2',
    description: 'client-page-description',
    viewPermission: 'view-clients',
    createPermission: 'create-clients',
    editPermission: 'edit-clients',
    deletePermission: 'delete-clients'
  }
]

export default routes
