// const CameraIllumination = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={22}
//     height={22}
//     fill="none"
//     // {...props}
//     {...rest}
//   >
//     <path
//       stroke="#00343D"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeMiterlimit={10}
//       strokeWidth={1.5}
//       d="M5.583 12.173h2.832v6.6c0 1.54.834 1.852 1.852.697l6.939-7.883c.852-.963.495-1.76-.798-1.76h-2.832v-6.6c0-1.54-.834-1.852-1.852-.697l-6.939 7.883c-.843.972-.486 1.76.798 1.76Z"
//     />
//   </svg>
// )
// export default CameraIllumination

const CameraIllumination = ({ active, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...rest}  
  >
    <path
      stroke={active ? "#00B274" : "#00343D"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.583 12.173h2.832v6.6c0 1.54.834 1.852 1.852.697l6.939-7.883c.852-.963.495-1.76-.798-1.76h-2.832v-6.6c0-1.54-.834-1.852-1.852-.697l-6.939 7.883c-.843.972-.486 1.76.798 1.76Z"
    />
  </svg>
);

export default CameraIllumination;