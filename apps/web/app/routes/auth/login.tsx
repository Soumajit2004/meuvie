import type { Route } from './+types/login';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login | Meuvie' },
    { name: 'description', content: 'Login to your account' },
  ];
}

export default function Login() {
  return (
    <div className={'container mx-auto flex flex-col justify-center gap-10 h-screen w-7/10'}>
      <h1 className={'font-bold text-3xl'}>Welcome, back !</h1>

      <form className={'flex flex-col gap-6'}>
        <input className={'input input-bordered input-lg w-full'} type="text" placeholder="Username" />
        <input className={'input input-bordered input-lg w-full'} type="password" placeholder="Password" />
        <button className={'btn btn-lg btn-primary'}>Login</button>
      </form>

      <div className={'flex flex-col gap-6 items-center'}>
        <p className={"text-base-content/50"}>don't have an account? <Link className={'text-primary'} to={'/auth/register'}>register</Link></p>
      </div>
    </div>
  );
}
