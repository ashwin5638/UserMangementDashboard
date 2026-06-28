import { useState } from 'react'
import { useUsers } from './hooks/useUsers'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterPopup from './components/FilterPopup'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'
import UserForm from './components/UserForm'
import ConfirmDelete from './components/ConfirmDelete'
import './styles/App.css'

function App() {
  const {
    users, allUsersCount,
    searchTerm, setSearchTerm,
    filters, setFilters, clearFilters,
    sortField, sortDir, handleSort,
    page, setPage, pageSize, setPageSize,
    totalPages, loading, error,
    addUser, editUser, removeUser,
  } = useUsers()

  const [showFilters, setShowFilters] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  const hasActiveFilters = Object.keys(filters).length > 0

  const handleAddUser = async (formData) => {
    return await addUser(formData)
  }

  const handleEditUser = async (formData) => {
    if (!editingUser) return { success: false }
    return await editUser(editingUser.id, formData)
  }

  const handleDeleteUser = async (user) => {
    const result = await removeUser(user.id)
    if (result.success) {
      setDeletingUser(null)
    }
  }

  const openEditForm = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const openAddForm = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  return (
    <div className="app">
      <Header userCount={allUsersCount} />

      <main className="main-content">
        <div className="toolbar">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="toolbar-actions">
            <button
              className={`btn btn-filter ${hasActiveFilters ? 'has-filters' : ''}`}
              onClick={() => setShowFilters(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
              {hasActiveFilters && <span className="filter-badge">{Object.keys(filters).length}</span>}
            </button>
            <button className="btn btn-primary" onClick={openAddForm}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        <UserTable
          users={users}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          onEdit={openEditForm}
          onDelete={setDeletingUser}
          loading={loading}
          error={error}
        />

        {!loading && !error && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            totalItems={allUsersCount}
          />
        )}
      </main>

      <FilterPopup
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={setFilters}
        onReset={clearFilters}
        filters={filters}
      />

      <UserForm
        isOpen={showForm}
        onClose={closeForm}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        initialData={editingUser}
        isEditing={!!editingUser}
      />

      <ConfirmDelete
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteUser}
        user={deletingUser}
      />
    </div>
  )
}

export default App
