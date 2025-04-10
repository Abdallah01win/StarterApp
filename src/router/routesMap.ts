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
  }
]

export default routes
