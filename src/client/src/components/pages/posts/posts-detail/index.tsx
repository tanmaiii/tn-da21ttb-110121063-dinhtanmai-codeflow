'use client'
import { useTranslations } from 'next-intl';
import PostDetail from './PostDetail';
import PostDetailMore from './PostDetailMore';
import { useParams } from 'next/navigation';

export default function PostDetailLayout() {
  const t = useTranslations();
  const params = useParams();
  const postId = params?.id as string;

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-9">
            <div className="space-y-6">
              <PostDetail
                postId={postId}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-16 space-y-6">
              <PostDetailMore />

              {/* Additional sidebar content */}
              <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">📚 {t('post.shareKnowledge')}</h3>
                <p className="text-blue-100 text-sm">
                  {t('post.shareKnowledgeDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
