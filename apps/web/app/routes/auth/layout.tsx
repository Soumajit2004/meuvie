import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className={'grid grid-cols-5 gap-10'}>
      <div className="col-span-3 bg-base-300 h-screen p-10">
        <h3 className={"text-xl"}>Meuvie</h3>
      </div>
      <div className="col-span-2">
        <Outlet />
      </div>
    </div>
  );
}
