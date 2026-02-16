const CheckIcon = (props) => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/* контур круга */}
        <circle
            cx="5"
            cy="5"
            r="4.5"
            stroke="black"
            strokeWidth="0.5"
            fill="none"
        />

        {/* галочка */}
        <path
            d="M3 5.2 L4.3 6.5 L7 3.8"
            stroke="black"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default CheckIcon;
