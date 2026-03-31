import { useState } from 'react';
import Button from '../../components/Button';

function Register() {
  // return (
  // <section className="mb-16 bg-[#F3F3F3] p-4">
  //   <form action="">
  //     <div className="items-left flex flex-col justify-center rounded-2xl bg-white p-10">
  //       <p className="mb-8">PERSONAL IDENTITY</p>
  //       <span className="items-left flex flex-col justify-center">
  //         <label htmlFor="">Full Legal Name</label>
  //         <input
  //           className="my-3 w-[100%] rounded-[5px] bg-[#F3F3F3] p-2"
  //           type="text"
  //           placeholder="e.g Dr. Julianne Reed"
  //         />
  //       </span>
  //       <br />
  //       <span className="items-left flex flex-col justify-center">
  //         <label htmlFor="">Phone Number</label>
  //         <input
  //           className="my-3 w-[100%] rounded-[5px] bg-[#F3F3F3] p-2"
  //           type="Number"
  //           placeholder="+8801816750744"
  //         />
  //       </span>
  //       <br />
  //       <span className="items-left flex flex-col justify-center">
  //         <label htmlFor=""> Location</label>
  //         <input
  //           className="my-3 w-[100%] rounded-[5px] bg-[#F3F3F3] p-2"
  //           type="adress"
  //           placeholder="Dhaka, 10"
  //         />
  //       </span>
  //     </div>
  //   </form>
  //   <form action="">
  //     <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-white p-10">
  //       <p className="mb-8 flex">CLINICAL GROUPING</p>
  //       <div className="TYPEBUTTON mb-12">
  //         <label htmlFor="">Select Blood Group</label>
  //         <div className="BUTTON justify-centert mt-3 flex items-start gap-6">
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">A+</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">A-</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">B+</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">B-</button>
  //         </div>
  //         <div className="BUTTON mt-3 flex items-start justify-center gap-6">
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">A+</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">A-</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">B+</button>
  //           <button className="btn rounded-xl bg-[#F3F3F3] p-4">B-</button>
  //         </div>
  //       </div>
  //       <div className="mb-7 rounded-xl bg-[#F3F3F3] px-14 py-6">
  //         <label htmlFor="" className="pr-2 text-xl">
  //           Available to donate
  //         </label>
  //         <input type="checkbox" />
  //       </div>
  //     </div>
  //     <div className="my-6 flex items-center justify-center text-xl">
  //       <Button type="submit" variant="primary">
  //         Complete Registration &rarr;
  //       </Button>
  //     </div>
  //   </form>
  // </section>
  // );

  // const [selectedGroup, setSelectedGroup] = useState('A+');
  // const [isAvailable, setIsAvailable] = useState(true);

  // const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // return (
  //   <div className="flex min-h-screen justify-center bg-[#F9F9F9] px-4 py-8 font-sans text-gray-900">
  //     <div className="w-full max-w-[400px] space-y-6">
  //       {/* Header Section */}
  //       <div>
  //         <p className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
  //           Step 02 of 03
  //         </p>
  //         <div className="mb-3 flex items-end justify-between">
  //           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
  //             Donor Details
  //           </h1>
  //           <span className="text-sm font-bold text-[#C62828] italic">
  //             Vital Impact
  //           </span>
  //         </div>
  //         {/* Progress Bar */}
  //         <div className="flex h-2.5 w-full rounded-full bg-gray-200">
  //           <div className="relative h-2.5 w-[60%] rounded-full bg-[#C62828]">
  //             <div className="absolute top-0 right-0 h-full w-1/2 rounded-r-full bg-gradient-to-r from-transparent to-red-400 opacity-50"></div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Personal Identity Card */}
  //       <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
  //         <h2 className="mb-5 text-xs font-bold tracking-wider text-gray-500 uppercase">
  //           Personal Identity
  //         </h2>

  //         <div className="space-y-4">
  //           <div>
  //             <label className="mb-1.5 block text-xs font-bold text-gray-700">
  //               Full Legal Name
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="e.g. Dr. Julianne Reed"
  //               className="w-full rounded-xl border-none bg-[#F4F4F5] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#C62828]/20 focus:outline-none"
  //             />
  //           </div>

  //           <div>
  //             <label className="mb-1.5 block text-xs font-bold text-gray-700">
  //               Phone Number
  //             </label>
  //             <input
  //               type="tel"
  //               placeholder="+1 (555) 000-0000"
  //               className="w-full rounded-xl border-none bg-[#F4F4F5] px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#C62828]/20 focus:outline-none"
  //             />
  //           </div>

  //           <div>
  //             <label className="mb-1.5 block text-xs font-bold text-gray-700">
  //               Location / City
  //             </label>
  //             <div className="relative">
  //               <input
  //                 type="text"
  //                 placeholder="San Francisco, CA"
  //                 className="w-full rounded-xl border-none bg-[#F4F4F5] py-3.5 pr-10 pl-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#C62828]/20 focus:outline-none"
  //               />
  //               <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={2}
  //                   stroke="currentColor"
  //                   className="h-5 w-5"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
  //                   />
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Clinical Grouping Card */}
  //       <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
  //         <h2 className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase">
  //           Clinical Grouping
  //         </h2>

  //         <label className="mb-3 block text-xs font-bold text-gray-700">
  //           Select Blood Group
  //         </label>

  //         {/* Blood Group Grid */}
  //         <div className="mb-6 grid grid-cols-4 gap-3">
  //           {bloodGroups.map((bg) => (
  //             <button
  //               key={bg}
  //               onClick={() => setSelectedGroup(bg)}
  //               className={`flex items-center justify-center rounded-xl py-3 text-sm font-bold transition-all ${
  //                 selectedGroup === bg
  //                   ? 'border-2 border-[#C62828] bg-red-50 text-[#C62828]'
  //                   : 'border-2 border-transparent bg-[#F4F4F5] text-gray-600 hover:bg-gray-200'
  //               }`}
  //             >
  //               {bg}
  //             </button>
  //           ))}
  //         </div>

  //         {/* Availability Toggle */}
  //         <div className="flex items-center justify-between rounded-xl bg-[#F4F4F5] p-4">
  //           <div className="flex items-center gap-3">
  //             <div className="rounded-lg bg-[#E0F2F1] p-2 text-[#00796B]">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 viewBox="0 0 24 24"
  //                 fill="currentColor"
  //                 className="h-5 w-5"
  //               >
  //                 <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  //               </svg>
  //             </div>
  //             <div>
  //               <p className="text-sm font-bold text-gray-900">
  //                 Available to donate
  //               </p>
  //               <p className="mt-0.5 text-[10px] leading-tight text-gray-500">
  //                 Toggle visibility for
  //                 <br />
  //                 emergency requests
  //               </p>
  //             </div>
  //           </div>

  //           {/* Custom Toggle Switch */}
  //           <button
  //             onClick={() => setIsAvailable(!isAvailable)}
  //             className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-[#C62828]' : 'bg-gray-300'}`}
  //           >
  //             <span
  //               className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`}
  //             />
  //           </button>
  //         </div>
  //       </div>

  //       {/* Info & Policy Box */}
  //       <div className="flex items-start gap-3 rounded-xl bg-[#E8F2F2] p-4">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 24 24"
  //           fill="currentColor"
  //           className="mt-0.5 h-5 w-5 shrink-0 text-[#006064]"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
  //             clipRule="evenodd"
  //           />
  //         </svg>
  //         <p className="text-xs leading-relaxed text-gray-700">
  //           By completing registration, you acknowledge our{' '}
  //           <a
  //             href="#"
  //             className="font-bold text-[#00838F] underline decoration-[#00838F]/30 underline-offset-2"
  //           >
  //             Medical Privacy Policy
  //           </a>{' '}
  //           and agree to receive vital alerts.
  //         </p>
  //       </div>

  //       {/* Action Buttons */}
  //       <div className="space-y-4 pt-2 pb-6">
  //         <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C62828] py-4 text-base font-bold text-white shadow-lg shadow-[#C62828]/20 transition-colors hover:bg-[#B71C1C]">
  //           Complete Registration
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={2.5}
  //             stroke="currentColor"
  //             className="h-5 w-5"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
  //             />
  //           </svg>
  //         </button>

  //         <button className="w-full text-center text-sm font-bold text-gray-500 transition-colors hover:text-gray-800">
  //           Skip for now, I'll finish later
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const [selectedGroup, setSelectedGroup] = useState('A-');
  const [isAvailable, setIsAvailable] = useState(true);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="flex min-h-screen justify-center bg-[#F8F9FA] px-4 py-10 font-sans text-gray-900 md:px-8">
      {/* Main Container: Stacks on mobile, 2 columns on lg screens */}
      <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* ========================================= */}
        {/* LEFT COLUMN: Context & Stepper            */}
        {/* ========================================= */}
        <div className="flex flex-col space-y-8 lg:sticky lg:top-10">
          {/* Text Header */}
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest text-[#D32F2F] uppercase">
              Step 02 of 03
            </p>
            <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 lg:text-5xl">
              Join the
              <br />
              Vitality
              <br />
              network.
            </h1>
            <p className="text-sm leading-relaxed text-gray-600">
              Your contribution is the pulse of our community. Complete your
              clinical profile to help us match you with urgent needs in your
              area.
            </p>
          </div>

          {/* Stepper Card */}
          <div className="space-y-6 rounded-[24px] bg-gray-100/50 p-6">
            {/* Step 1 */}
            <div className="flex items-center gap-4 opacity-70">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006064] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm leading-none font-bold text-gray-900">
                  Account Details
                </p>
                <p className="mt-1 text-xs text-gray-500">Completed</p>
              </div>
            </div>

            {/* Step 2 (Active) */}
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D32F2F] text-sm font-bold text-white shadow-lg shadow-red-500/30">
                2
              </div>
              <div>
                <p className="text-sm leading-none font-bold text-gray-900">
                  Clinical Profile
                </p>
                <p className="mt-1 text-xs font-medium text-[#D32F2F]">
                  In Progress
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 opacity-50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-500">
                3
              </div>
              <div>
                <p className="text-sm leading-none font-bold text-gray-900">
                  Verification
                </p>
                <p className="mt-1 text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>

          {/* Image/Quote Card (Hidden on very small mobile, visible on sm and up) */}
          <div className="relative hidden h-48 overflow-hidden rounded-[24px] bg-gray-900 sm:block">
            {/* Replace src with your actual image path */}
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medical Professional"
              className="h-full w-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <p className="absolute right-5 bottom-5 left-5 text-sm font-medium text-white/90 italic">
              "A single donation can save up to three lives."
            </p>
          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN: Form Card                   */}
        {/* ========================================= */}
        <div className="rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          {/* Section 1: Personal Identity */}
          <div className="mb-10">
            <div className="mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[#D32F2F]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-lg font-bold text-gray-900">
                Personal Identity
              </h2>
            </div>

            {/* Grid for Name & Phone (Stacks on mobile, side-by-side on sm screens) */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Julianne Sterling"
                  className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-gray-700">
                Location/City
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for your city..."
                  className="w-full rounded-2xl border-none bg-[#F4F4F5] py-4 pr-4 pl-12 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Grouping */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[#D32F2F]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <h2 className="text-lg font-bold text-gray-900">
                Clinical Grouping
              </h2>
            </div>

            <p className="mb-5 text-xs text-gray-500">
              Select your blood type if known. If you're unsure, we'll determine
              it during your first visit.
            </p>

            {/* Blood Group Grid */}
            <div className="mb-8 flex flex-wrap gap-2.5">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`min-w-[50px] flex-1 rounded-2xl py-3.5 text-sm font-bold transition-all sm:min-w-[60px] ${
                    selectedGroup === bg
                      ? 'scale-105 transform bg-[#D32F2F] text-white shadow-lg shadow-red-500/40'
                      : 'bg-[#F4F4F5] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between rounded-2xl bg-[#F4F4F5] p-5">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Available to donate
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Appear in emergency searches for your blood type.
                </p>
              </div>

              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-[#D32F2F]' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${isAvailable ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons: Stacks on mobile, splits on sm screens */}
          <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <button className="text-sm font-bold text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-gray-900">
              Skip for now
            </button>

            <button className="w-full rounded-2xl bg-[#D32F2F] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-[#B71C1C] sm:w-auto">
              Complete Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
