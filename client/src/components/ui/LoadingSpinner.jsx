import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-gray-200 border-t-brand rounded-full"
      />
      <p className="text-gray-500 font-medium text-sm animate-pulse">Loading data...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="py-12">{content}</div>;
};

export default LoadingSpinner;
