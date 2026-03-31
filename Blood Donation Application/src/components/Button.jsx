export default function Button({ children, variant = 'primary' }) {
  const baseStyles =
    'flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl md:w-[200px]';

  if (variant === 'primary') {
    return (
      <button
        className={`${baseStyles} bg-gradient-to-r from-[#AF101A] to-[#ce121f] text-white shadow-md md:min-w-20 md:px-7 md:py-8`}
      >
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        className={`${baseStyles} bg-gradient-to-r from-[#E2E2E2] to-[#dedddd] text-black`}
      >
        {children}
      </button>
    );
  }

  if (variant === 'white') {
    return (
      <button className={`${baseStyles} bg-white px-4 text-black`}>
        {children}
      </button>
    );
  }
}
