const ScaleMarker = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillOpacity={0.2}
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.25 10a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 1.667v4.167M10 14.167v4.167"
    />
  </svg>
)
export default ScaleMarker