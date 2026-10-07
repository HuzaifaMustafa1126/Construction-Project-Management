import { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const initialUsers = [
  { id: 1, firstName: "Ayesha", lastName: "Khan", email: "ayesha@example.com", phone: "+92 300 1234567", role: "Admin" },
  { id: 2, firstName: "Hamza", lastName: "Ali", email: "hamza@example.com", phone: "+92 301 7654321", role: "Project Manager" },
  { id: 3, firstName: "Sara", lastName: "Ahmed", email: "sara@example.com", phone: "+92 302 1122334", role: "Site Engineer" },
];

const emptyForm = { firstName: "", lastName: "", email: "", password: "", phone: "", role: "" };
const roles = ["Admin", "Project Manager", "Site Engineer", "Supervisor", "Accountant"];

const UsersListLayer = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.phone} ${user.role}`.toLowerCase().includes(query),
    );
  }, [search, users]);

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
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <form className="navbar-search" onSubmit={(event) => event.preventDefault()}>
            <input type="search" className="bg-base h-40-px w-auto" placeholder="Search users" value={search} onChange={(event) => setSearch(event.target.value)} />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <button type="button" className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2" onClick={openAddModal}>
            <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" /> Add User
          </button>
        </div>

        <div className="card-body p-24">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone Number</th><th>Role</th><th className="text-center">Action</th></tr></thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{String(index + 1).padStart(2, "0")}</td>
                    <td>
                      <div className="d-flex align-items-center gap-12">
                        <span className="w-40-px h-40-px rounded-circle bg-primary-50 text-primary-600 d-flex align-items-center justify-content-center fw-semibold flex-shrink-0">{user.firstName[0]}{user.lastName[0]}</span>
                        <span className="text-md fw-medium text-primary-light">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="text-secondary-light">{user.email}</td>
                    <td className="text-secondary-light">{user.phone}</td>
                    <td><span className="bg-primary-50 text-primary-600 px-12 py-4 radius-4 fw-medium text-sm">{user.role}</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button type="button" title="Edit user" aria-label={`Edit ${user.firstName} ${user.lastName}`} className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0" onClick={() => openEditModal(user)}>
                          <Icon icon="lucide:edit" className="text-xl" />
                        </button>
                        <button type="button" title="Delete user" aria-label={`Delete ${user.firstName} ${user.lastName}`} className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0" onClick={() => deleteUser(user)}>
                          <Icon icon="fluent:delete-24-regular" className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && <tr><td colSpan="6" className="text-center py-32 text-secondary-light">No users found.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="mt-24 text-secondary-light text-sm">Showing {filteredUsers.length} of {users.length} users</div>
        </div>
      </div>

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
