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

export default function PostListSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-6 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6"
    >
      {[...Array(8)].map((_, index) => (
        <motion.div key={index} variants={itemVariants} className="space-y-3 mb-2">
           <div className="px-2 py-3 h-full flex flex-col justify-between border rounded-lg">
             <div className="mb-auto">
               <div className="flex items-center justify-between gap-2">
                 <Skeleton className="w-8 h-8 rounded-full" />
                 <Skeleton className="w-6 h-6 rounded-full" />
               </div>
               <Skeleton className="h-6 w-3/4 mt-2" />
             </div>
             <div>
               <div className="flex gap-2 mb-2 mt-2">
                 <Skeleton className="h-5 w-16" />
                 <Skeleton className="h-5 w-16" />
               </div>
             </div>
             <div className="mt-2">
               <Skeleton className="w-full h-[160px] rounded-md" />
             </div>
             <div className="mt-2 flex items-center justify-between">
               <Skeleton className="h-8 w-20" />
               <Skeleton className="h-8 w-20" />
               <Skeleton className="h-8 w-20" />
             </div>
           </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
