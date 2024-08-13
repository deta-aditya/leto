import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function FrontPageTemplate(props: { children: ReactNode }) {
  return (
    <main className="flex flex-col gap-12">
      <nav className="sticky top-0 bg-white z-10">
        <div className="container mx-auto flex justify-between py-4">
          <Link to="/">
            <h1 className="logo text-4xl text-blue-600">Leto</h1>
          </Link>
          <UserCircleIcon className="size-8 text-black" />
        </div>
      </nav>
      <div className="container mx-auto flex flex-col gap-12">
        {props.children}
      </div>
    </main>
  )
}

export default FrontPageTemplate;
