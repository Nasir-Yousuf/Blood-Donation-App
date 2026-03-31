// features/landing/components/CTA.jsx

import Button from '../../components/Button';

export default function CTA() {
  return (
    <section className="o px-6 py-12">
      {/* <div className=" form-[#AF101A] bg-gradient-to-r to-[#D32F2F] p-8 text-white"> */}
      <div className="flex flex-col items-center justify-center rounded-4xl bg-gradient-to-r from-[#AF101A] to-[#D32F2F] px-10 py-14 text-white">
        <h2 className="text-center text-3xl">Ready to make a difference?</h2>

        <p className="mt-2 max-w-xl text-center text-sm text-xl font-light text-black text-white opacity-90">
          Start your journey as a life-saver today. It only takes a few minutes
          to register and find your first opportunity.
        </p>

        <div className="mt-6 font-semibold text-[#AF101A]">
          <Button variant="white">Get Started Now</Button>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#ffffff23] bg-[#ffffff1c] px-6 py-6 text-center">
            <span>
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 30C8.575 30 5.71875 28.825 3.43125 26.475C1.14375 24.125 0 21.2 0 17.7C0 15.2 0.99375 12.4812 2.98125 9.54375C4.96875 6.60625 7.975 3.425 12 0C16.025 3.425 19.0312 6.60625 21.0187 9.54375C23.0062 12.4812 24 15.2 24 17.7C24 21.2 22.8563 24.125 20.5688 26.475C18.2813 28.825 15.425 30 12 30V30M7.5 24H16.5V21H7.5V24V24M10.5 19.5H13.5V16.5H16.5V13.5H13.5V10.5H10.5V13.5H7.5V16.5H10.5V19.5V19.5"
                  fill="white"
                />
              </svg>
            </span>
            <p className="mt-1 font-semibold">TYPE</p>
            <p className="font-semibold">O-</p>
            <p className="text-xs font-light">Urgent</p>
            <p className="text-xs font-light">Demand</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#ffffff23] bg-[#ffffff1c] px-6 py-6 text-center">
            <span>
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 30C8.575 30 5.71875 28.825 3.43125 26.475C1.14375 24.125 0 21.2 0 17.7C0 15.2 0.99375 12.4812 2.98125 9.54375C4.96875 6.60625 7.975 3.425 12 0C16.025 3.425 19.0312 6.60625 21.0187 9.54375C23.0062 12.4812 24 15.2 24 17.7C24 21.2 22.8563 24.125 20.5688 26.475C18.2813 28.825 15.425 30 12 30V30M7.5 24H16.5V21H7.5V24V24M10.5 19.5H13.5V16.5H16.5V13.5H13.5V10.5H10.5V13.5H7.5V16.5H10.5V19.5V19.5"
                  fill="white"
                />
              </svg>
            </span>
            <p className="mt-1 font-semibold">TYPE</p>
            <p className="font-semibold">AB+</p>
            <p className="text-xs font-light">Universal</p>
            <p className="text-xs font-light">Recipient</p>
          </div>
        </div>
      </div>
    </section>
  );
}
