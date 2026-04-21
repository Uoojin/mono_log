function CTAButton({ text, onClick, type = "button" }) {
  return (
    <button type={type} className="cta_btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default CTAButton;