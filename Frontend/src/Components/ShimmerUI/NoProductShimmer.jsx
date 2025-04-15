import { FaBoxOpen } from 'react-icons/fa';

function NoProductShimmer() {
  return (
        <div className="h-[80vh] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[75%] xl:w-[700px] mx-auto flex flex-col justify-center items-center text-center px-4">
          <FaBoxOpen className="text-5xl sm:text-6xl md:text-7xl text-slate-400 mb-4" />
          <h1 className="font-medium text-slate-600 sm:text-lg md:text-xl lg:text-2xl font-mono mb-2">
            Hey there!, I hope you're doing great.
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-mono">
            You haven’t added any products yet. Click the Upload Product button at
            the top right corner to add your first product and grow your business.
          </p>
        </div>
      );
}

export default NoProductShimmer
