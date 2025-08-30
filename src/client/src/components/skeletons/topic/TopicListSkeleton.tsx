import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function TopicListSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-6 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6"
    >
      {[...Array(8)].map((_, index) => (
        <motion.div key={index} variants={itemVariants} className="space-y-3 mb-2">
          <div className="h-full flex flex-col gap-2 justify-between p-3 border rounded-md">
            <div className="flex flex-row justify-between items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full" />
            <div className="h-2 bg-input/60 w-full relative right-0 bottom-0 rounded-md">
              <Skeleton className="h-2 w-1/2 absolute left-0 bottom-0 rounded-md" />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex flex-row items-end gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex flex-row items-end gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
