import { getBloodTypeInfo, formatDate } from '../utils';

export default function VitalProfileCard({ user }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
      <div className="relative hidden h-32 overflow-hidden bg-[#8B0000] lg:block">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Blood cells"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        {user?.isAvailable && (
          <span className="absolute bottom-4 left-6 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span> Active Donor
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
              Your Vital Profile
            </p>
            <p className="mb-1 hidden text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:block">
              Vital Profile
            </p>
            <div className="flex items-center gap-3 lg:block">
              <h3 className="rounded-full bg-[#D32F2F] px-4 py-1.5 text-3xl font-extrabold text-white lg:bg-transparent lg:px-0 lg:py-0 lg:text-2xl lg:text-gray-900">
                Type {user?.bloodType || 'N/A'}
              </h3>
              <p className="mt-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#006064] lg:mt-1 lg:bg-transparent lg:px-0 lg:py-0 lg:text-[#006064]">
                {getBloodTypeInfo(user?.bloodType)}
              </p>
            </div>
          </div>
          <div className="flex hidden h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-red-50 text-lg font-extrabold text-[#D32F2F] shadow-sm lg:flex">
            {user?.bloodType?.replace(/[+-]/g, '') || ''}
          </div>
        </div>

        <p className="mb-8 text-xs leading-relaxed text-gray-500 lg:hidden">
          Your blood type is critical for matching. Keep your availability status updated.
        </p>

        <div className="mb-8 flex hidden flex-col gap-4 lg:flex">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Next Eligible</span>
            <span className="font-bold text-teal-600">
              {formatDate(user?.nextAvailableDate)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Gender Data</span>
            <span className="font-bold text-gray-900 capitalize">
              {user?.gender || 'Not specified'}
            </span>
          </div>
        </div>

        <div className="relative mt-4 h-24 overflow-hidden rounded-xl bg-gray-100 lg:hidden">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Blood cells"
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
