interface ProcessingStatusProps {
  status: string;
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-white text-center space-y-4">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
        <p>{status}</p>
      </div>
    </div>
  );
} 