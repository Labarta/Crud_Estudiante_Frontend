"use client";
import Image from "next/image";
import { useRouter }  from "next/navigation"

export default function Home() {
  const router = useRouter();

  return (
    <main>
        <>
      <div className="flex justify-center mt-16">
        <div style={{minWidth: "30%"}}>
        <div className="shadow-lg flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <div className=" flex justify-center">
            <Image alt=""  src="/login-icon.gif" width={100} height={100} />
          </div>
          
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bienvenidos al CRUD de Colegio
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            

            <div>
              
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>{router.push("/alumno")}} >
                Dashboard
              </button>
            </div>
          </form>

          
        </div>
      </div>
        </div>
      </div>


      
    </>
    </main>
  );
}
