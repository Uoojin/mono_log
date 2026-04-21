function SortDropdown({ value, onChange, options }) {
  return (
    <select className="sort_dropdown" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;