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

export default function CourseDetailSkeleton() {
  return (
    <div className="">
      <div className="mb-8">
        <div className="h-[380px] border py-10 px-24 flex flex-row justify-between gap-6">
          <div className="flex flex-col gap-3 w-2/3">
            <Skeleton className="h-10 w-10 rotate-sm" />
            <Skeleton className="w-20 h-8" />
            <Skeleton className="w-full h-18" />
            <Skeleton className="w-1/3 h-18" />
            {/* Author Info */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 w-1/3">
            <div className="flex justify-end flex-row gap-3">
              <Skeleton className="h-10 w-10 rotate-sm" />
              <Skeleton className="h-10 w-10 rotate-sm" />
            </div>
            <Skeleton className="h-full w-full rotate-sm" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4 px-24">
        <div className="col-span-12 md:col-span-7 xl:col-span-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full space-y-6"
          >
            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-2 grid grid-cols-2 gap-6">
              <Skeleton className="h-[100px] w-full rotate-sm" />
              <Skeleton className="h-[100px] w-full rotate-sm" />
              <Skeleton className="h-[100px] w-full rotate-sm" />
              <Skeleton className="h-[100px] w-full rotate-sm" />
            </motion.div>

            <Skeleton className="h-[200px] w-full rotate-sm" />

            {/* Content */}
          </motion.div>
        </div>
        <div className="col-span-12 md:col-span-5 xl:col-span-4 sticky top-20">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
