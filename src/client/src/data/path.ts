export const paths = {
  ADMIN: '/admin',

  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  USERS: '/users',
  SEARCH: '/search',
  NOTIFICATION: '/notification',
  TAGS: '/tags',
  TAG: (id: string) => `/tags/${id}`,
  COMMENTS: '/comments',

  REPOS: '/repos',
  REPOS_DETAIL: (id: string) => `/repos/${id}`,
  
  TOPICS: '/topics',
  TOPICS_DETAIL: (id: string) => `/topics/${id}`,
  TOPIC_CREATE: '/topics/create',
  TOPIC_UPDATE: (id: string) => `/topics/${id}/update`,

  POSTS: '/posts',
  POST_CREATE: '/posts/create',
  POST_UPDATE: (id: string) => `/posts/${id}/update`,
  POST_DETAIL: (id: string) => `/posts/${id}`,

  COURSES: '/courses',
  COURSES_DETAIL: (id: string) => `/courses/${id}`,
  COURSE_CREATE: '/courses/create',
  COURSE_UPDATE: (id: string) => `/courses/${id}/update`,
  COURSE_REGISTER: (id: string) => `/courses/${id}/register`,
  COURSE_TOPICS: (id: string) => `/courses/${id}/topics`,
  COURSE_MEMBER: (id: string) => `/courses/${id}/member`,
  COURSE_DASHBOARD: (id: string) => `/courses/${id}/dashboard`,

  USER_DETAIL: (id: string) => `/user/${id}`,

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  LOGOUT: '/logout',
  JOIN_ORG: (token: string) => `/join-org?token=${token}`,
};
