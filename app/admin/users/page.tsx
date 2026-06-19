'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users?id=${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setToast({ message: 'User deleted successfully', type: 'success' });
        fetchUsers();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      } else {
        setToast({ message: 'Failed to delete user', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to delete user', type: 'error' });
    }
  };

  const handleChangeRole = async (newRole: 'user' | 'admin') => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          role: newRole,
        }),
      });

      if (response.ok) {
        setToast({ message: 'Role updated successfully', type: 'success' });
        fetchUsers();
        setIsRoleModalOpen(false);
        setSelectedUser(null);
      } else {
        setToast({ message: 'Failed to update role', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to update role', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-darkBlue mb-2">User Management</h1>
        <p className="text-neutral-gray">Manage user accounts and permissions</p>
      </div>

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-neutral-lightGray transition">
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-darkBlue">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-gray">{user.email}</td>
                    <td className="py-3 px-4 text-neutral-gray">{user.phone}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-accent-orange text-white'
                            : 'bg-ocean-sky text-white'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? 'bg-status-success text-white'
                            : 'bg-status-danger text-white'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsRoleModalOpen(true);
                          }}
                        >
                          Change Role
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Role Change Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setSelectedUser(null);
        }}
        title="Change User Role"
      >
        <div className="space-y-4">
          <p className="text-neutral-gray">
            Change role for <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong>
          </p>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => handleChangeRole('admin')}
              disabled={selectedUser?.role === 'admin'}
            >
              Make Admin
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleChangeRole('user')}
              disabled={selectedUser?.role === 'user'}
            >
              Make User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-neutral-gray">
            Are you sure you want to delete <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={handleDeleteUser}>
              Yes, Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
