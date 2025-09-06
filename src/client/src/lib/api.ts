const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://backend:3001';

const apiConfig = {
  baseUrl: `${baseURL}/api`,
  imageUrl: (url: string) => `${imageURL}/public/images/${url}`,
  fileUrl: (url: string) => `${baseURL}/public/files/${url}`,
  avatar: (name?: string) => `${imageURL}/api/avatar/${name ?? 'c'}`,
};

export default apiConfig;
