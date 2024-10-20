import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* 3D Spinning Loader */}
      <div className="relative w-16 h-16 animate-spin-slow">
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-[spin_2s_reverse_linear_infinite]">
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-green-500 border-r-transparent animate-[spin_2s_reverse_linear_infinite]">

        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-red-500 border-b-transparent animate-[spin_2s_reverse_linear_infinite]"></div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
