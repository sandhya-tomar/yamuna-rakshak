// import { motion } from 'framer-motion';
// import { MapPin } from 'lucide-react';
// import { GHATS, CATEGORIES } from '../data/constants.js';
// import { useAuth } from '../hooks/useAuth.jsx';
// import RevealOnScroll from './RevealOnScroll.jsx';

// function timeAgo(ts) {
//   const s = Math.floor((Date.now() - ts) / 1000);
//   if (s < 60) return 'just now';
//   if (s < 3600) return `${Math.floor(s / 60)}m ago`;
//   if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
//   return `${Math.floor(s / 86400)}d ago`;
// }

// export default function RecentReports({ reports, loading, onMarkCleaned, onRequireAuth }) {
//   const { user } = useAuth();
//   const recent = [...reports].sort((a, b) => b.ts - a.ts).slice(0, 8);

//   function handleMarkCleaned(id) {
//     if (!user) {
//       onRequireAuth();
//       return;
//     }
//     onMarkCleaned(id, user.id);
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-24">
//       <RevealOnScroll className="flex items-end justify-between mb-10">
//         <div>
//           <span className="font-heading text-xs tracking-[0.2em] uppercase text-saffron">Activity</span>
//           <h2 className="font-display text-4xl font-bold mt-2">Recent Reports</h2>
//         </div>
//       </RevealOnScroll>

//       {loading && <p className="text-white/50">Loading reports…</p>}
//       {!loading && recent.length === 0 && (
//         <p className="text-white/50">No reports yet — be the first to flag a spot.</p>
//       )}

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {recent.map((r, i) => {
//           const cat = CATEGORIES.find((c) => c.id === r.category) ?? { emoji: '📍', label: r.category };
//           const ghat = GHATS.find((g) => g.id === r.ghatId);
//           return (
//             <RevealOnScroll key={r.id} delay={i * 0.05}>
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                 className="glass rounded-2xl overflow-hidden"
//               >
//                 <div className="relative h-40 bg-white/5">
//                   {r.photo ? (
//                     <img src={r.photo} alt="" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-3xl">{cat.emoji}</div>
//                   )}
//                   <span
//                     className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
//                       r.cleaned ? 'bg-emerald text-white' : 'bg-red-500 text-white'
//                     }`}
//                   >
//                     {r.cleaned ? 'Resolved' : 'Open'}
//                   </span>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-heading font-semibold text-sm mb-1">{ghat ? ghat.name : 'Unknown spot'}</h3>
//                   <p className="text-white/50 text-xs mb-3">
//                     {cat.emoji} {cat.label}
//                   </p>
//                   <div className="flex items-center justify-between text-xs text-white/40">
//                     <span className="flex items-center gap-1">
//                       <MapPin size={11} /> {timeAgo(r.ts)}
//                     </span>
//                     {!r.cleaned && (
//                       <button
//                         type="button"
//                         onClick={() => handleMarkCleaned(r.id)}
//                         className="text-saffron hover:text-saffron-light font-semibold"
//                       >
//                         Mark cleaned
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             </RevealOnScroll>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Clock } from "lucide-react";

import { GHATS, CATEGORIES } from "../data/constants.js";
import { useAuth } from "../hooks/useAuth.jsx";
import RevealOnScroll from "./RevealOnScroll.jsx";



function timeAgo(ts){

const s=Math.floor((Date.now()-ts)/1000);

if(s<60) return "Just now";

if(s<3600) return `${Math.floor(s/60)}m ago`;

if(s<86400) return `${Math.floor(s/3600)}h ago`;

return `${Math.floor(s/86400)}d ago`;

}




export default function RecentReports({
reports,
loading,
onMarkCleaned,
onRequireAuth
}){


const {user}=useAuth();


const recent=[
...reports
]
.sort((a,b)=>b.ts-a.ts)
.slice(0,8);





function handleMarkCleaned(id){

if(!user){

onRequireAuth();

return;

}

onMarkCleaned(id,user.id);

}





return (

<section className="
bg-[#f7faf7]
py-20
">


<div className="
max-w-7xl
mx-auto
px-6
">



<RevealOnScroll>


<div className="mb-10">


<p className="
text-emerald-700
uppercase
tracking-[0.25em]
text-xs
font-bold
">

Activity

</p>



<h2 className="
text-5xl
font-bold
text-slate-900
mt-3
">

Recent Reports

</h2>



<p className="
text-slate-600
mt-4
max-w-xl
">

Community members reporting pollution
and helping restore Yamuna ghats.

</p>


</div>


</RevealOnScroll>







{loading && (

<p className="text-slate-500">
Loading reports...
</p>

)}




{

!loading && recent.length===0 && (

<p className="text-slate-500">

No reports yet — be the first to flag a spot.

</p>

)

}







<div className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{


recent.map((r,i)=>{


const cat =
CATEGORIES.find(
(c)=>c.id===r.category
)
||
{
emoji:"📍",
label:r.category
};



const ghat=
GHATS.find(
(g)=>g.id===r.ghatId
);



return (


<RevealOnScroll
key={r.id}
delay={i*.05}
>


<motion.div

whileHover={{
y:-8
}}

transition={{
type:"spring",
stiffness:300
}}


className="
bg-white
rounded-3xl
overflow-hidden
border
border-slate-200
shadow-sm
hover:shadow-xl
transition
"

>




{/* IMAGE */}


<div className="
relative
h-44
bg-emerald-50
">


{

r.photo ?


<img

src={r.photo}

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
text-4xl
">

{cat.emoji}

</div>


}




<span

className={`

absolute
top-4
right-4

px-3
py-1

rounded-full

text-xs

font-semibold

flex
items-center
gap-1

${

r.cleaned

?

"bg-emerald-600 text-white"

:

"bg-red-500 text-white"

}

`}

>


{

r.cleaned

?

<CheckCircle2 size={13}/>

:

<Clock size={13}/>

}


{

r.cleaned
?
"Resolved"
:
"Open"

}


</span>



</div>







{/* CONTENT */}



<div className="
p-5
">


<h3 className="
font-bold
text-slate-900
">

{

ghat
?
ghat.name
:
"Unknown spot"

}


</h3>




<p className="
text-sm
text-slate-500
mt-2
">

{cat.emoji}

{" "}

{cat.label}

</p>




<div className="
flex
items-center
justify-between
mt-5
text-xs
">


<span className="
flex
items-center
gap-1
text-slate-400
">

<MapPin size={13}/>

{timeAgo(r.ts)}

</span>




{

!r.cleaned && (


<button

onClick={()=>handleMarkCleaned(r.id)}

className="
text-emerald-700
font-semibold
hover:text-emerald-900
"

>

Mark cleaned

</button>


)


}



</div>



</div>






</motion.div>



</RevealOnScroll>


)


})


}



</div>





</div>

</section>


);


}