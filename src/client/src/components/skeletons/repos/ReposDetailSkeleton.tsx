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

export default function ReposDetailSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      {/* Header Skeleton */}
      <motion.div variants={itemVariants} className="mb-2">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-7" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Repository Info Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="w-48 h-6" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
              <Skeleton className="w-24 h-9" />
            </div>

            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Topic Info Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
            </div>
          </motion.div>

          {/* Chart Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6">
            <Skeleton className="w-48 h-6 mb-4" />
            <Skeleton className="w-full h-64" />
          </motion.div>

          {/* Analysis and Activity Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-6">
            <Skeleton className="w-40 h-6" />

            {/* Tabs Skeleton */}
            <div className="flex gap-4 border-b pb-2">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-20 h-8" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map(item => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="border rounded p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-3/4 h-5" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Author Info Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-4">
            <Skeleton className="w-24 h-5" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-3" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-5/6 h-3" />
            </div>
          </motion.div>

          {/* Repository Stats Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-4">
            <Skeleton className="w-32 h-5" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </div>
                  <Skeleton className="w-8 h-4" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contribute Section Skeleton */}
          <motion.div variants={itemVariants} className="rounded-lg border p-6 space-y-4">
            <Skeleton className="w-28 h-5" />
            <div className="space-y-3">
              {[1, 2, 3].map(item => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-3 border rounded"
                >
                  <Skeleton className="w-8 h-8" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-full h-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
