import type { Route } from './+types/register';
import { Form, Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Register | Meuvie' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function clientAction({
                                     request,
                                   }: Route.ClientActionArgs) {
  // let formData = await request.formData();
  // let title = formData.get("title");
  // let project = await someApi.updateProject({ title });
  // return project;
  console.log('clientAction', request.formData());
}


export default function Register() {

  return (
    <div className={'container mx-auto flex flex-col justify-center gap-10 h-screen w-7/10'}>
      <h1 className={'font-bold text-3xl'}>One more step...</h1>

      <Form className={'flex flex-col gap-4'}>
        <input className={'input input-bordered input-lg w-full'}
               placeholder={'Full Name'} />

        <input className={'input input-bordered input-lg w-full'}
               placeholder={'Username'} />

        <input className={'input input-bordered input-lg w-full'}
               placeholder={'Password'} />

        <button type="submit" className={'btn btn-lg btn-primary'}>Register</button>
      </Form>

      <div className={'flex flex-col gap-6 items-center'}>
        <p className={'text-base-content/50'}>already an account? <Link className={'text-primary'}
                                                                        to={'/auth/login'}>login</Link></p>
      </div>
    </div>
  );
}
