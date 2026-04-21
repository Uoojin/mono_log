// 상세페이지에 사용되는 카테고리 필터(언어별) 버튼

function FilterButton({ options, selected, onSelect }) {
  return (
    <div className="filter_group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter_btn ${selected === option ? "active" : ""}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterButton;
