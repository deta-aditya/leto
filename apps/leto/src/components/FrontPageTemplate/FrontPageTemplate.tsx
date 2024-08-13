import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function FrontPageTemplate(props: { children: ReactNode }) {
  return (
    <main className="container mx-auto flex flex-col gap-12">
      <nav className="flex justify-between py-4 sticky top-0 bg-white z-10">
        <Link to="/">
          <h1 className="logo text-4xl text-blue-600">Leto</h1>
        </Link>
        <UserCircleIcon className="size-8 text-black" />
      </nav>
      {props.children}
    </main>
  )
}

export default FrontPageTemplate;
