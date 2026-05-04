import { Icons } from './DashboardIcons';

export default function StatsRow({ user, stats, isUpdatingStatus, handleToggleStatus }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="relative flex min-h-[160px] flex-1 flex-col justify-between overflow-hidden rounded-[24px] bg-[#D32F2F] p-6 text-white shadow-lg shadow-red-500/20 lg:max-w-[240px]">
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Icons.Drop />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase opacity-80 lg:hidden">
              Status
            </span>
            <button
              onClick={handleToggleStatus}
              disabled={isUpdatingStatus}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${user?.isAvailable ? 'bg-white' : 'bg-red-900'} disabled:opacity-50`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full transition-transform ${user?.isAvailable ? 'translate-x-6 bg-[#D32F2F]' : 'translate-x-1 bg-white'}`}
              />
            </button>
          </div>
        </div>
        <div className="relative z-10 mt-4">
          <p className="mb-1 hidden text-[10px] font-bold tracking-widest text-white uppercase opacity-80 lg:block">
            Donor Status
          </p>
          <h3 className="text-2xl font-bold lg:text-xl">
            {user?.isAvailable ? 'Donor Active' : 'On Standby'}
          </h3>
          <p className="mt-1 text-xs text-red-200 lg:hidden">
            You are visible to local hospitals
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 sm:flex-row">
        <div className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Icons.Heart />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-gray-900 lg:text-3xl">
              {stats?.totalDonations || 0}
            </h3>
            <p className="mt-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Total Donations
            </p>
          </div>
        </div>

        <div className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icons.Speakerphone />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-gray-900 lg:text-3xl">
              {stats?.requestsMade || 0}
            </h3>
            <p className="mt-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Requests Made
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
