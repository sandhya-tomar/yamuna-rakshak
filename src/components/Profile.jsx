import {
  User,
  Mail,
  FileText,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

import { useAuth } from "../hooks/useAuth.jsx";
import { useReports } from "../hooks/useReports.js";


export default function Profile() {

  const { user, profile } = useAuth();
  const { reports } = useReports();



  if (!user) {

    return (

      <section className="
        min-h-screen
        bg-[#f6f8f7]
        px-6
        py-20
      ">

        <div className="
          max-w-md
          mx-auto
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-10
          text-center
          shadow-sm
        ">


          <div className="
            w-16
            h-16
            mx-auto
            rounded-full
            bg-[#2f7657]/10
            flex
            items-center
            justify-center
            mb-5
          ">

            <User
              size={30}
              className="text-[#2f7657]"
            />

          </div>



          <h2 className="
            text-2xl
            font-bold
            text-[#10283b]
          ">
            Sign in required
          </h2>


          <p className="
            text-slate-500
            mt-3
          ">
            Login to access your volunteer profile.
          </p>


        </div>

      </section>

    );

  }



  const myReports =
    reports.filter(
      (report)=>report.userId===user.id
    );



  const resolvedReports =
    myReports.filter(
      (report)=>report.cleaned
    );



  return (

    <section className="
      min-h-screen
      bg-[#f6f8f7]
      px-6
      py-20
      text-[#10283b]
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">



        {/* HEADER */}

        <div className="mb-10">

          <p className="
            text-xs
            uppercase
            tracking-[0.2em]
            font-bold
            text-[#2f7657]
          ">
            Volunteer Profile
          </p>


          <h1 className="
            text-4xl
            sm:text-5xl
            font-bold
            mt-3
          ">
            My Account
          </h1>


        </div>





        {/* PROFILE CARD */}


        <div className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-8
          shadow-sm
        ">



          <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            gap-6
          ">



            <div className="
              w-24
              h-24
              rounded-full
              bg-[#2f7657]/10
              flex
              items-center
              justify-center
            ">

              <User
                size={42}
                className="text-[#2f7657]"
              />

            </div>





            <div className="
              text-center
              sm:text-left
            ">


              <h2 className="
                text-3xl
                font-bold
              ">
                {profile?.full_name || "Yamuna Volunteer"}
              </h2>



              <p className="
                flex
                justify-center
                sm:justify-start
                items-center
                gap-2
                text-slate-500
                mt-2
              ">

                <Mail size={16}/>

                {user.email}

              </p>




              <p className="
                flex
                justify-center
                sm:justify-start
                items-center
                gap-2
                text-sm
                text-[#2f7657]
                mt-3
                font-semibold
              ">


                <ShieldCheck size={16}/>

                {profile?.role || "Volunteer"}

              </p>


            </div>


          </div>





          {/* STATS */}


          <div className="
            grid
            md:grid-cols-3
            gap-5
            mt-10
          ">



            <div className="
              rounded-2xl
              border
              border-slate-200
              p-5
            ">


              <FileText
                className="text-[#2f7657]"
                size={25}
              />


              <p className="
                text-sm
                text-slate-500
                mt-4
              ">
                Total Reports
              </p>


              <h3 className="
                text-3xl
                font-bold
                mt-1
              ">
                {myReports.length}
              </h3>


            </div>





            <div className="
              rounded-2xl
              border
              border-slate-200
              p-5
            ">


              <ShieldCheck
                className="text-emerald-600"
                size={25}
              />


              <p className="
                text-sm
                text-slate-500
                mt-4
              ">
                Resolved Issues
              </p>


              <h3 className="
                text-3xl
                font-bold
                mt-1
              ">
                {resolvedReports.length}
              </h3>


            </div>





            <div className="
              rounded-2xl
              border
              border-slate-200
              p-5
            ">


              <p className="
                text-sm
                text-slate-500
              ">
                Member Since
              </p>


              <h3 className="
                text-xl
                font-bold
                mt-3
              ">
                Yamuna Rakshak
              </h3>


            </div>


          </div>




          {/* MY REPORT BUTTON */}


          <button
            onClick={()=>{
              window.history.pushState(
                {},
                "",
                "/my-reports"
              );
              window.dispatchEvent(
                new PopStateEvent("popstate")
              );
            }}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              bg-[#2f7657]
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
              hover:bg-[#256044]
              transition
            "
          >

            View My Reports

            <ArrowRight size={17}/>

          </button>



        </div>



      </div>


    </section>

  );

}