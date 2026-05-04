import Link from 'next/link';
import { Icons } from './DashboardIcons';

const SidebarItem = ({ icon, text, active, to = '#' }) => (
  <Link
    href={to}
    className={`mr-4 flex items-center gap-3 rounded-r-full border-l-4 px-6 py-3.5 font-bold transition-all ${
      active
        ? 'border-[#D32F2F] bg-red-50/50 text-[#D32F2F]'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="text-sm">{text}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-20 hidden h-screen w-[260px] shrink-0 flex-col border-r border-gray-100 bg-white py-8 lg:flex">
      <nav className="mt-4 flex flex-1 flex-col gap-2">
        <SidebarItem
          icon={<Icons.Dashboard />}
          text="Dashboard"
          active
          to="/dashboard"
        />
        <SidebarItem icon={<Icons.Profile />} text="Profile" to="/profile" />
      </nav>

      <div className="mt-auto px-6 pb-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Support
        </button>
      </div>
    </aside>
  );
}
