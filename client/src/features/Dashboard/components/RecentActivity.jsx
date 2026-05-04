import Link from 'next/link';
import { Icons } from './DashboardIcons';

export default function RecentActivity({ activity }) {
  return (
    <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <Link href="#" className="text-xs font-bold tracking-wider text-[#D32F2F] uppercase hover:text-red-800">
          See All
        </Link>
      </div>

      {!activity || activity.length === 0 ? (
        <div className="py-6 text-center text-sm text-gray-500">
          No recent activity found.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {activity.map((item) => {
            const IconComp = Icons[item.icon];
            return (
              <div key={item.id} className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.text}`}>
                  <IconComp />
                </div>
                <div className="flex-1 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                  </div>
                  <p className="mt-1 pr-4 text-xs leading-relaxed text-gray-500">
                    {item.desc} <span className="mx-1 text-gray-300">•</span> {item.timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
