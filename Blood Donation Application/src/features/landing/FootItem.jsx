import { NavLink } from 'react-router-dom';

/**
 * Reusable NavItem Component
 * Uses React Router's NavLink to automatically handle active states based on the URL.
 */
const FootItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      // NavLink provides an `isActive` boolean to the className callback
      className={({ isActive }) =>
        `flex h-full w-full flex-col items-center justify-center px-2 transition-all duration-200 ${
          isActive
            ? 'text-[#B91C1C]'
            : 'text-gray-500 hover:bg-gray-50 hover:text-blue-500'
        }`
      }
    >
      {/* We can also use the isActive boolean inside the children function to animate the icon */}
      {({ isActive }) => (
        <>
          <div
            className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
          >
            {icon}
          </div>
          <span className="text-[10px] font-medium sm:text-xs">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default FootItem;
