// Mock analytics implementation
export const logUserLogin = (role: string) => {
  console.log(`[Analytics] User logged in with role: ${role}`);
};

export const logUserLogout = () => {
  console.log('[Analytics] User logged out');
};

export const logPageView = (page: string) => {
  console.log(`[Analytics] Page view: ${page}`);
};

export const logError = (message: string, error: Error) => {
  console.error(`[Analytics] Error: ${message}`, error);
};
