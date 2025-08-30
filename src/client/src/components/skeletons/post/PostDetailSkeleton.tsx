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

export default function PostDetailSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Thumbnail */}
      <motion.div variants={itemVariants} className="relative w-full aspect-video">
        <Skeleton className="w-full h-full rounded-lg" />
      </motion.div>

      {/* Author Info */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </motion.div>

      {/* Tags */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </motion.div>

      {/* Footer */}
      <motion.div variants={itemVariants} className="flex justify-between items-center pt-4">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </motion.div>
    </motion.div>
  );
}
