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

export default function CourseListSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
    >
      {[...Array(8)].map((_, index) => (
        <motion.div key={index} variants={itemVariants}>
          <div className="px-2 py-3 h-full space-y-3 mb-2 flex flex-col justify-between border rounded-lg">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
