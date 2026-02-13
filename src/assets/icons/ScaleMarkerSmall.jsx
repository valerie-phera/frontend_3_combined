const ScaleMarkerSmall = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillOpacity={0.2}
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.688 7.5a2.813 2.813 0 1 0 5.625 0 2.813 2.813 0 0 0-5.626 0Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 1.25v3.125M7.5 10.625v3.125"
    />
  </svg>
)
export default ScaleMarkerSmall