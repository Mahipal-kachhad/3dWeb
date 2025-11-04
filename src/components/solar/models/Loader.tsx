import { useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();
  if (progress >= 100) return null;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div>
        <img src="/earth/Loading.gif" alt="Loading" />
        <p className="text-white mt-6 text-lg font-bold drop-shadow-lg text-center">
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
};
