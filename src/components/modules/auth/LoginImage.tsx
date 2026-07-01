
import { MdAccessTime } from "react-icons/md";

const LoginImage = () => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-blue-600 px-10 py-12">
      {/* Decorative background circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-36 right-6 size-32 rounded-full bg-white/5"
      />

      {/* Brand mark */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
          <MdAccessTime className="text-white" size={18} aria-hidden />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          ticktock
        </span>
      </div>

      {/* Main copy */}
      <div className="relative z-10">
        <h2 className="mb-4 text-3xl font-bold leading-snug text-white xl:text-4xl">
          ticktock
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-blue-100">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-xs text-blue-200">
          © 2024 tentwenty. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginImage;