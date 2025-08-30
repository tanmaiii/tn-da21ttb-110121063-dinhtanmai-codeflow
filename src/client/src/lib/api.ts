const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const apiConfig = {
  baseUrl: `${baseURL}/api`,
  imageUrl: (url: string) => `${baseURL}/public/images/${url}`,
  fileUrl: (url: string) => `${baseURL}/public/files/${url}`,
  avatar: (name?: string) => `${baseURL}/api/avatar/${name ?? 'c'}`,  
};

export default apiConfig;
