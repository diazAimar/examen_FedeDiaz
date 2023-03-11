import { useState } from 'react';
import CreateUserForm from './forms/CreateUserForm';

export default function CreateUserModal() {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-primary-white">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
}
