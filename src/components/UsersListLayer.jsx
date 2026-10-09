import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { Icon } from "@iconify/react/dist/iconify.js";

const initialUsers = [
  { id: 1, firstName: "Ayesha", lastName: "Khan", email: "ayesha@example.com", phone: "+92 300 1234567", role: "Admin" },
  { id: 2, firstName: "Hamza", lastName: "Ali", email: "hamza@example.com", phone: "+92 301 7654321", role: "Project Manager" },
  { id: 3, firstName: "Sara", lastName: "Ahmed", email: "sara@example.com", phone: "+92 302 1122334", role: "Site Engineer" },
];

const emptyForm = { firstName: "", lastName: "", email: "", password: "", phone: "", role: "" };
const roles = ["Admin", "Project Manager", "Site Engineer", "Supervisor", "Accountant"];

// Isolate DataTables DOM changes; remount when the user records change.
/* eslint-disable react/prop-types */
const UsersTable = ({ users, onEdit, onDelete, onView }) => {
  const tableRef = useRef(null);
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      pageLength: 10,
      columnDefs: [{ targets: -1, orderable: false, searchable: false }],
      language: { emptyTable: "No users found." },
    });
    return () => { table.destroy(); };
  }, []);
  return <div>
            <table ref={tableRef} data-page-length={10} className="table bordered-table mb-0">
              <thead><tr><th scope="col"><div className="form-check style-check d-flex align-items-center"><input type="checkbox" className="form-check-input" aria-label="Select all users" onChange={(event) => { $(tableRef.current).DataTable().rows({ search: "applied" }).nodes().to$().find('input[type="checkbox"]').prop("checked", event.target.checked); }} /><span className="form-check-label">S.L</span></div></th><th>Name</th><th>Email</th><th>Phone Number</th><th>Role</th><th scope="col">Action</th></tr></thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td><div className="form-check style-check d-flex align-items-center"><input type="checkbox" className="form-check-input" aria-label={`Select ${user.firstName} ${user.lastName}`} /><span className="form-check-label">{String(index + 1).padStart(2, "0")}</span></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="w-40-px h-40-px me-12 rounded-circle bg-primary-50 text-primary-600 d-flex align-items-center justify-content-center fw-semibold flex-shrink-0">{user.firstName[0]}{user.lastName[0]}</span>
                        <h6 className="text-md mb-0 fw-medium flex-grow-1">{user.firstName} {user.lastName}</h6>
                      </div>
                    </td>
                    <td >{user.email}</td>
                    <td >{user.phone}</td>
                    <td><span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">{user.role}</span></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button type="button" title="View user" aria-label={`View ${user.firstName} ${user.lastName}`} className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center border-0" onClick={() => onView(user)}><Icon icon="iconamoon:eye-light" /></button>
                        <button type="button" title="Edit user" aria-label={`Edit ${user.firstName} ${user.lastName}`} className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center border-0" onClick={() => onEdit(user)}>
                          <Icon icon="lucide:edit"  />
                        </button>
                        <button type="button" title="Delete user" aria-label={`Delete ${user.firstName} ${user.lastName}`} className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center border-0" onClick={() => onDelete(user)}>
                          <Icon icon="mingcute:delete-2-line"  />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  </div>;
};
/* eslint-enable react/prop-types */

const UsersListLayer = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingId(user.id);
    setForm({ ...user, password: "" });
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      setUsers((current) => current.map((user) => (
        user.id === editingId ? { ...user, ...form, id: editingId, password: undefined } : user
      )));
    } else {
      setUsers((current) => [...current, { ...form, id: Date.now(), password: undefined }]);
    }
    closeModal();
  };

  const deleteUser = (user) => {
    if (window.confirm(`Delete ${user.firstName} ${user.lastName}?`)) {
      setUsers((current) => current.filter(({ id }) => id !== user.id));
    }
  };

  return (
    <>
      <div className="card basic-data-table">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
          <h5 className="card-title mb-0">Users List</h5>
          <button type="button" className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" onClick={openAddModal}>
            <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" /> Add User
          </button>
        </div>
        <div className="card-body">
          <UsersTable key={JSON.stringify(users)} users={users} onEdit={openEditModal} onDelete={deleteUser} onView={setViewingUser} />
        </div>
      </div>
      {viewingUser && (
        <>
          <div className="modal fade show d-block" role="dialog" aria-modal="true" aria-labelledby="user-details-title" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered"><div className="modal-content bg-base">
              <div className="modal-header"><h5 className="modal-title" id="user-details-title">User Details</h5><button type="button" className="btn-close" aria-label="Close" onClick={() => setViewingUser(null)} /></div>
              <div className="modal-body"><dl className="mb-0">
                <dt>Name</dt><dd>{viewingUser.firstName} {viewingUser.lastName}</dd>
                <dt>Email</dt><dd>{viewingUser.email}</dd>
                <dt>Phone Number</dt><dd>{viewingUser.phone}</dd>
                <dt>Role</dt><dd>{viewingUser.role}</dd>
              </dl></div>
            </div></div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setViewingUser(null)} />
        </>
      )}

      {isModalOpen && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="user-modal-title">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content radius-16 bg-base">
                <div className="modal-header py-16 px-24 border-bottom">
                  <h5 className="modal-title" id="user-modal-title">{editingId ? "Edit User" : "Add New User"}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body p-24">
                    <div className="row gy-20">
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" className="form-control radius-8" value={form.firstName} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" className="form-control radius-8" value={form.lastName} onChange={handleChange} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="userEmail">Email</label>
                        <input id="userEmail" name="email" type="email" className="form-control radius-8" value={form.email} onChange={handleChange} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="userPassword">Password {editingId && <span className="text-secondary-light fw-normal">(leave blank to keep unchanged)</span>}</label>
                        <div className="position-relative">
                          <input id="userPassword" name="password" type={showPassword ? "text" : "password"} className="form-control radius-8 pe-48" value={form.password} onChange={handleChange} minLength="8" required={!editingId} />
                          <button type="button" className="position-absolute end-0 top-50 translate-middle-y me-16 bg-transparent border-0 text-secondary-light" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                            <Icon icon={showPassword ? "solar:eye-closed-outline" : "solar:eye-outline"} className="text-xl" />
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" type="tel" className="form-control radius-8" value={form.phone} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold text-primary-light text-sm mb-8" htmlFor="role">Role</label>
                        <select id="role" name="role" className="form-select radius-8" value={form.role} onChange={handleChange} required>
                          <option value="" disabled>Select role</option>
                          {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer py-16 px-24 border-top">
                    <button type="button" className="btn btn-outline-neutral-500 radius-8 px-20" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary radius-8 px-20">{editingId ? "Save Changes" : "Add User"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={closeModal} />
        </>
      )}
    </>
  );
};

export default UsersListLayer;
