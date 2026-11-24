// ORGANISMO · DataTable = tabla genérica para el panel admin
// columns: [{ key, header, align, render(row) }]. Si no hay filas, muestra emptyText.
export const DataTable = ({ columns, rows, rowKey = 'id', emptyText = 'Sin registros.', caption }) => (
  <div className="table-responsive table-f4a">
    <table className="table table-hover align-middle mb-0">
      {caption && <caption className="visually-hidden">{caption}</caption>}
      <thead>
        <tr>{columns.map((c) => <th key={c.key} scope="col" className={c.align ? `text-${c.align}` : undefined}>{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={columns.length} className="text-center text-muted-f4a py-4">{emptyText}</td></tr>
        ) : rows.map((row) => (
          <tr key={row[rowKey]}>
            {columns.map((c) => (
              <td key={c.key} className={c.align ? `text-${c.align}` : undefined}>{c.render ? c.render(row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
