import FootItem from './FootItem';

/**
 * Main Mobile NavBar Component
 * Fixed to the bottom of the screen on mobile devices.
 */
const Footer = () => {
  return (
    /* Semantic <nav> element. 
      fixed bottom-0: Sticks to the bottom.
      md:hidden: Hides on desktop screens.
    */
    <nav className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.03)] md:hidden">
      <div className="mx-auto flex h-full max-w-lg">
        <FootItem
          to="/"
          label="HOME"
          icon={
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 18V6L8 0L16 6V18H10V11H6V18H0V18" fill="#B91C1C" />
            </svg>
          }
        />

        <FootItem
          to="/donor"
          label="SEARCH"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18V18M6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11V11"
                fill="#9CA3AF"
              />
            </svg>
          }
        />

        <FootItem
          to="/registration"
          label="REGISTRATION"
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />

        <FootItem
          to="/dashboard"
          label="DASHBOARD"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6V0H18V6H10V6M0 10V0H8V10H0V10M10 18V8H18V18H10V18M0 18V12H8V18H0V18M2 8H6V2H2V8V8M12 16H16V10H12V16V16M12 4H16V2H12V4V4M2 16H6V14H2V16V16M6 8V8V8V8V8V8M12 4V4V4V4V4V4M12 10V10V10V10V10V10M6 14V14V14V14V14V14"
                fill="#9CA3AF"
              />
            </svg>
          }
        />
      </div>
    </nav>
  );
};

export default Footer;
