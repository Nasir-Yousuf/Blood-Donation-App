export default function ImpactMilestones({ milestone }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gray-100 p-6 lg:p-8">
      <svg className="absolute right-0 bottom-0 h-40 w-40 translate-x-10 translate-y-10 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <div className="relative z-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Impact Milestones</h3>
            <p className="mt-1 max-w-[200px] text-xs text-gray-500 lg:max-w-none">
              <span className="hidden lg:inline">
                You're only {milestone?.donationsAway || 5} donations away from '{milestone?.level || 'Silver'}' tier.
              </span>
              <span className="lg:hidden">
                {milestone?.donationsAway || 5} more donations until your '{milestone?.level || 'Silver'}' badge.
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="hidden text-[10px] font-bold tracking-widest text-white uppercase lg:block">
              Level: {milestone?.level || 'Bronze'}
            </p>
            <p className="mt-1 text-sm font-bold text-[#006064] lg:text-xs lg:text-gray-900">
              {milestone?.percent || 0}% <span className="hidden font-medium text-gray-500 lg:inline">Complete</span>
            </p>
          </div>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-300">
          <div className="h-2.5 rounded-full bg-[#006064] transition-all duration-1000" style={{ width: `${milestone?.percent || 0}%` }}></div>
        </div>
      </div>
    </div>
  );
}
