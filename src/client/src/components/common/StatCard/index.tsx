import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
  progress?: number;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color = 'default',
  onClick,
  progress,
  isLoading = false,
}: StatCardProps) {
  const colorClasses = {
    default: 'from-blue-500 to-blue-600 text-blue-600',
    success: 'from-green-500 to-green-600 text-green-600',
    warning: 'from-yellow-500 to-yellow-600 text-yellow-600',
    danger: 'from-red-500 to-red-600 text-red-600',
  };

  return (
    <Card
      className={`relative p-0 overflow-hidden border-0 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <p className="text-3xl font-bold"> {value} </p>
            )}
            <p className="text-xs text-muted-foreground">{description}</p>
            {progress !== undefined && <Progress value={progress} className="h-2 mt-2" />}
          </div>
          <div
            className={`p-4 rounded-full bg-gradient-to-br ${colorClasses[color]} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-8 h-8 text-white ${colorClasses[color].split(' ')[2]}`} />
          </div>
        </div>
      </CardContent>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          colorClasses[color].split(' ')[0]
        } ${colorClasses[color].split(' ')[1]}`}
      ></div>
    </Card>
  );
}
