// ORGANISMO · BarChart = lista de barras horizontales (solo CSS, sin librerías)
export const BarChart = ({ data, valueKey, labelKey, format = (v) => v }) => {
  const max = Math.max(1, ...data.map((d) => d[valueKey]));
  return (
    <ul className="bar-chart">
      {data.map((d) => (
        <li key={d[labelKey]}>
          <div className="bar-chart__label"><span>{d[labelKey]}</span><strong>{format(d[valueKey])}</strong></div>
          <div className="bar-chart__track" role="progressbar" aria-label={d[labelKey]}
            aria-valuenow={d[valueKey]} aria-valuemin={0} aria-valuemax={max}>
            <div className="bar-chart__fill" style={{ width: `${(d[valueKey] / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};
