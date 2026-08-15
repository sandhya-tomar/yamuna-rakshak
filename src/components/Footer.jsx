// import { useLanguage } from '../hooks/useLanguage.jsx';

// export default function Footer() {
//   const { t } = useLanguage();
//   return (
//     <footer className="border-t border-white/10 mt-10">
//       <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
//         <p className="font-heading text-sm text-white/50">
//           Yamuna <span className="text-saffron">Rakshak</span> — {t('footer.tagline')}
//         </p>
//         <p className="text-xs text-white/30">{t('footer.note')}</p>
//       </div>
//     </footer>
//   );
// }

import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  ArrowUpRight,
  Mail
} from "lucide-react";

import { useLanguage } from "../hooks/useLanguage.jsx";


export default function Footer() {

  const { t } = useLanguage();

  return (
    <>

      {/* Wave Divider */}
      <div className="relative h-24 overflow-hidden bg-[#f7faf7]">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 75C240 10 480 10 720 55C960 100 1200 100 1440 20V120H0Z"
            fill="#063b2b"
          />

          <path
            d="M0 75C240 10 480 10 720 55C960 100 1200 100 1440 20"
            fill="none"
            // stroke="#34d399" -> dots
            strokeWidth="3"
            strokeDasharray="12 12"
          />
        </svg>
      </div>


      <footer className="bg-[#063b2b] text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">


          <div className="grid md:grid-cols-4 gap-10">


            {/* Brand */}
            <div className="md:col-span-2">

              <h2 className="text-3xl font-bold">
                Yamuna 
                <span className="text-emerald-300">
                  {" "}Rakshak
                </span>
              </h2>

              <p className="mt-4 text-white/65 max-w-md leading-relaxed">
                Restoring Yamuna through community action,
                smart waste management and responsible reuse
                of resources.
              </p>


              <div className="flex gap-2 items-center mt-5 text-white/60 text-sm">
                <MapPin size={16}/>
                Mathura, Uttar Pradesh
              </div>

            </div>



            {/* Links */}
            <div>

              <h3 className="font-semibold text-lg mb-4">
                Explore
              </h3>

              <ul className="space-y-3 text-white/60 text-sm">
                <li>Home</li>
                <li>Report Issue</li>
                <li>Live Map</li>
                <li>Reuse Network</li>
              </ul>

            </div>




            {/* Social */}
            <div>

              <h3 className="font-semibold text-lg mb-4">
                Connect
              </h3>

              <p className="text-sm text-white/60">
                Join cleanup drives and help protect
                the Yamuna.
              </p>


              <div className="flex gap-3 mt-5">

                {[Instagram, Facebook, Mail, Twitter].map((Icon,i)=>(
                  <button
                    key={i}
                    className="
                    w-10 h-10 rounded-full
                    bg-white/10
                    flex items-center justify-center
                    hover:bg-emerald-400
                    hover:text-emerald-950
                    transition
                    "
                  >
                    <Icon size={18}/>
                  </button>
                ))}

              </div>

            </div>


          </div>




          {/* CTA */}

          <div className="
            mt-12
            rounded-3xl
            bg-white/10
            border border-white/10
            p-6
            flex flex-col md:flex-row
            justify-between
            items-center
            gap-5
          ">


            <div>

              <h3 className="text-xl font-semibold">
                Be a part of the change 🌱
              </h3>

              <p className="text-white/60 text-sm mt-2">
                Report pollution and support Yamuna restoration.
              </p>

            </div>


            {/* <button
              className="
              bg-emerald-400
              text-emerald-950
              px-5 py-3
              rounded-xl
              font-semibold
              flex items-center gap-2
              hover:bg-emerald-300
              transition
              "
            >
              Join Us
              <ArrowUpRight size={17}/>
            </button> */}

            <a
            href="/report"
            className="
            bg-emerald-400
            text-emerald-950
            px-5 py-3
            rounded-xl
            font-semibold
            flex items-center gap-2
            hover:bg-emerald-300
            transition
            "
            >
              Join Us
              <ArrowUpRight size={17}/>
            </a>


          </div>




          {/* Bottom */}

          <div className="
            border-t border-white/10
            mt-10 pt-5
            flex flex-col sm:flex-row
            justify-between
            text-sm text-white/50
            gap-3
          ">

            <p>
              © {new Date().getFullYear()} Yamuna Rakshak —
              {t("footer.tagline")}
            </p>


            {/* <p>
              {t("footer.note")}
            </p> */}

          </div>


        </div>

      </footer>

    </>
  );
}