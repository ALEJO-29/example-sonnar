import { useState, useEffect, useMemo } from "react";
import { getUsers } from "../Adapters/users.adapter";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const users = await getUsers();
      setUsers(users);
    } catch (err) {
      setError("Error al cargar usuarios");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [users, searchTerm, sortField, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Usuarios</h1>

      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button onClick={fetchUsers} style={{ padding: "0.5rem 1rem" }}>
          Recargar
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSort("name")}
            >
              Nombre{" "}
              {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr
              key={user.id}
              style={{ "&:nth-child(even)": { backgroundColor: "#f9f9f9" } }}
            >
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                {user.name}
              </td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                {user.email}
              </td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                <button
                  onClick={() => alert(`Editando usuario: ${user.name}`)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    marginRight: "0.5rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => confirm(`¿Eliminar usuario ${user.name}?`)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: "0.5rem 1rem" }}
          >
            Anterior
          </button>
          <span style={{ padding: "0.5rem 1rem", backgroundColor: "#f5f5f5" }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={{ padding: "0.5rem 1rem" }}
          >
            Siguiente
          </button>
        </div>
      )}

      <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
        Mostrando {paginatedUsers.length} de {filteredAndSortedUsers.length}{" "}
        usuarios
      </div>
    </div>
  );
};

export default TableUsers;
