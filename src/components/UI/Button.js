const Button = (props) => {
  return (
    <>
      <button
        className="action-button"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
