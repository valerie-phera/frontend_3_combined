const CheckboxTick = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={9}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m.75 4.75 3.5 3.5 7-7.5"
    />
  </svg>
)
export default CheckboxTick