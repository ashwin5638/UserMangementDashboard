export default function Header({ userCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Management Dashboard</h1>
        <p className="header-subtitle">
          <span className="badge">{userCount}</span> Total Users
        </p>
      </div>
    </header>
  );
}
