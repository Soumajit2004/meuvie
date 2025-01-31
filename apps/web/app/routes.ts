import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  route('auth', 'routes/auth/layout.tsx', [
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
  ]),

] satisfies RouteConfig;
