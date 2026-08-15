import {
  CheckCircle2,
  Clock,
  MapPin,
  Camera
} from "lucide-react";

import { useAuth } from "../hooks/useAuth.jsx";
import { GHATS, CATEGORIES } from "../data/constants.js";
import RevealOnScroll from "./RevealOnScroll.jsx";


function timeAgo(ts) {
  if (!ts) return "";

  const seconds = Math.floor((Date.now() - ts) / 1000);

  if (seconds < 60) return "Just now";

  if (seconds < 3600)
    return `${Math.floor(seconds / 60)} min ago`;

  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)} hours ago`;

  return `${Math.floor(seconds / 86400)} days ago`;
}



export default function MyReports({ reports }) {

  const { user } = useAuth();


  if (!user) {
    return (
      <section className="bg-[#f6f8f7] min-h-screen px-6 py-20">

        <div className="
          max-w-xl mx-auto
          bg-white
          border border-slate-200
          rounded-3xl
          p-10
          text-center
          shadow-sm
        ">

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
            Login to view your submitted reports.
          </p>

        </div>

      </section>
    );
  }



  const myReports = reports
    .filter(
      (report) => report.userId === user.id
    )
    .sort(
      (a, b) => b.ts - a.ts
    );



  return (

    <section className="
      bg-[#f6f8f7]
      min-h-screen
      px-6
      py-20
      text-[#10283b]
    ">


      <div className="
        max-w-7xl
        mx-auto
      ">


        <RevealOnScroll>


          <div className="mb-10">

            <p className="
              text-xs
              uppercase
              tracking-[0.2em]
              font-bold
              text-[#2f7657]
            ">
              Your contribution
            </p>


            <h1 className="
              text-4xl
              sm:text-5xl
              font-bold
              mt-3
              tracking-tight
            ">
              My Reports
            </h1>


            <p className="
              text-slate-600
              mt-3
              max-w-xl
            ">
              Track all river cleanup issues reported by you.
            </p>


          </div>


        </RevealOnScroll>





        {
          myReports.length === 0 ?

          (

            <div className="
              bg-white
              border border-slate-200
              rounded-3xl
              p-10
              text-center
              shadow-sm
            ">


              <h2 className="
                text-xl
                font-semibold
              ">
                No reports yet
              </h2>


              <p className="
                text-slate-500
                mt-2
              ">
                Start reporting waste spots around Yamuna ghats.
              </p>


            </div>

          )


          :


          (

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          ">


          {
            myReports.map((report,index)=>{


              const ghat =
              GHATS.find(
                (g)=>g.id===report.ghatId
              );


              const category =
              CATEGORIES.find(
                (c)=>c.id===report.category
              );



              return (

                <RevealOnScroll
                  key={report.id}
                  delay={index*0.05}
                >


                <article className="
                  bg-white
                  border border-slate-200
                  rounded-3xl
                  overflow-hidden
                  shadow-sm
                  hover:-translate-y-1
                  transition
                ">



                  <div className="
                    h-44
                    bg-slate-100
                    relative
                  ">


                  {
                    report.photo ?

                    <img
                      src={report.photo}
                      alt="report"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    :

                    <div className="
                      h-full
                      flex
                      items-center
                      justify-center
                      text-5xl
                    ">
                      {category?.emoji || "📍"}
                    </div>

                  }




                  <span
                  className={`
                    absolute
                    top-3
                    right-3
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    flex
                    items-center
                    gap-1

                    ${
                      report.cleaned
                      ?
                      "bg-[#2f7657] text-white"
                      :
                      "bg-red-500 text-white"
                    }
                  `}
                  >

                    {
                      report.cleaned
                      ?
                      <>
                      <CheckCircle2 size={13}/>
                      Resolved
                      </>
                      :
                      <>
                      <Clock size={13}/>
                      Open
                      </>
                    }


                  </span>


                  </div>





                  <div className="p-5">


                    <h3 className="
                      text-lg
                      font-semibold
                    ">
                      {
                        ghat?.name || "Unknown Ghat"
                      }
                    </h3>



                    <p className="
                      text-sm
                      text-slate-500
                      mt-2
                    ">

                      {category?.emoji}

                      {" "}

                      {
                        category?.label ||
                        report.category
                      }

                    </p>




                    <div className="
                      flex
                      items-center
                      justify-between
                      mt-5
                      text-xs
                      text-slate-400
                    ">


                      <span className="
                        flex
                        items-center
                        gap-1
                      ">

                        <MapPin size={13}/>

                        {timeAgo(report.ts)}

                      </span>



                      {
                        report.photo &&

                        <Camera
                          size={15}
                          className="text-[#e7a928]"
                        />

                      }


                    </div>


                  </div>



                </article>


                </RevealOnScroll>

              );

            })
          }


          </div>

          )

        }



      </div>


    </section>

  );

}