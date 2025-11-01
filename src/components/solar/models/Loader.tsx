import { useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();
  if (progress >= 100) return null;
  return (
    <div className="w-screen h-screen flex flex-col justify-end items-center bg-black z-50">
      <div className="w-3/4 mb-20">
        <div className="relative w-full h-1.5 bg-gray-800 rounded shadow-lg">
          <div
            className="h-1.5 rounded"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #e8af04,#fc9e32, #d66820)",
              transition: "width 0.2s ease-out",
            }}
          />
           </div>
        <p className="text-yellow-300 mt-6 text-lg font-bold drop-shadow-lg text-end">
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
};
