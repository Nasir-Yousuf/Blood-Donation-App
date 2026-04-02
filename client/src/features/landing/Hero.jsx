// features/landing/components/Hero.jsx

import Button from '../../components/Button';
import HealthWorker from '../../asset/HealthWorker.png';
import DonorClinic from '../../asset/ClinicalSetting.png';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-surface mt-8 px-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
        {/* LEFT */}
        <div className="LEFT max-w-xl flex-1 text-center md:text-left">
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs">
            LIVE SAVING OPPORTUNITY
          </span>
          <h1 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl">
            Save Lives,
            <br />
            <span className="text-[#AF101A]">Donate Blood</span>
          </h1>
          <p className="mt-4 text-lg font-light text-[#000000aa] sm:text-xl">
            Join a community of thousands dedicated to bridging the gap between
            donors and patients. Your single donation can save up to three
            lives.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
            <Button variant="primary">
              <Link to="/registration">Become a Donor </Link>
            </Button>
            <Link to="/emergency">
              <Button variant="secondary">Find Donor</Button>{' '}
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="RIGHT flex flex-1 justify-center md:justify-end">
          <img
            src={DonorClinic}
            alt="donation"
            className="w-full max-w-sm -rotate-2 rounded-[45px] shadow-lg md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
