// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Camera, LogIn, Loader2 } from 'lucide-react';
// import { GHATS, CATEGORIES } from '../data/constants.js';
// import { compressImage } from '../lib/photo.js';
// import { analyzeWastePhoto } from '../lib/wasteDetection.js';
// import { useAuth } from '../hooks/useAuth.jsx';
// import { useLanguage } from '../hooks/useLanguage.jsx';
// import RevealOnScroll from './RevealOnScroll.jsx';
// import AIAnalysisCard from './AIAnalysisCard.jsx';

// export default function ReportForm({ onSubmit, onRequireAuth }) {
//   const { user } = useAuth();
//   const { t, lang } = useLanguage();
//   const [ghatId, setGhatId] = useState(GHATS[0].id);
//   const [category, setCategory] = useState(null);
//   const [note, setNote] = useState('');
//   const [photo, setPhoto] = useState(null); // { blob, dataUrl } | null
//   const [submitting, setSubmitting] = useState(false);
//   const [status, setStatus] = useState(null); // { ok: boolean, msg: string } | null
//   const fileInputRef = useRef(null);

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiError, setAiError] = useState(false);
//   const [aiAnalysis, setAiAnalysis] = useState(null);

//   async function handlePhotoChange(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       const result = await compressImage(file);
//       setPhoto(result);
//       setAiAnalysis(null);
//       setAiError(false);
//       setAiLoading(true);
//       try {
//         const analysis = await analyzeWastePhoto(result.dataUrl);
//         setAiAnalysis(analysis);
//       } catch (err) {
//         console.error('AI analysis error:', err);
//         setAiError(true);
//       } finally {
//         setAiLoading(false);
//       }
//     } catch (err) {
//       setStatus({ ok: false, msg: err.message });
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!category) {
//       setStatus({ ok: false, msg: t('form.pickCategory') });
//       return;
//     }
//     setSubmitting(true);
//     setStatus(null);
//     try {
//       await onSubmit({
//         ghatId,
//         category,
//         note: note.trim(),
//         photoBlob: photo?.blob ?? null,
//         userId: user.id,
//         aiAnalysis,
//       });
//       setStatus({ ok: true, msg: t('form.successMsg') });
//       setCategory(null);
//       setNote('');
//       setPhoto(null);
//       setAiAnalysis(null);
//       setAiError(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     } catch (err) {
//       console.error(err);
//       setStatus({ ok: false, msg: t('form.errorMsg') });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <section id="report" className="max-w-4xl mx-auto px-6 py-24">
//       <RevealOnScroll>
//         <span className="font-heading text-xs tracking-[0.2em] uppercase text-saffron">{t('form.eyebrow')}</span>
//         <h2 className="font-display text-4xl font-bold mt-2 mb-3">{t('form.title')}</h2>
//         <p className="text-white/60 mb-10">{t('form.sub')}</p>
//       </RevealOnScroll>

//       <RevealOnScroll delay={0.1}>
//         {!user ? (
//           <div className="glass glass-border-gradient rounded-3xl p-10 text-center">
//             <LogIn className="mx-auto mb-4 text-saffron" size={28} />
//             <h3 className="font-heading font-semibold text-lg mb-2">{t('form.signInPrompt')}</h3>
//             <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">{t('form.signInBody')}</p>
//             <button
//               type="button"
//               onClick={onRequireAuth}
//               className="inline-flex items-center gap-2 bg-emerald text-white font-semibold px-6 py-3 rounded-full"
//             >
//               {t('form.signInBtn')}
//             </button>
//           </div>
//         ) : (
//         <form onSubmit={handleSubmit} className="glass glass-border-gradient rounded-3xl p-8 space-y-6">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">{t('form.photoLabel')}</label>
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full border-2 border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-saffron/50 transition-colors"
//             >
//               {photo ? (
//                 <img src={photo.dataUrl} alt="Preview of the photo you attached" className="max-h-52 mx-auto rounded-xl" />
//               ) : (
//                 <span className="flex flex-col items-center gap-2 text-white/50 text-sm">
//                   <Camera size={22} /> {t('form.photoPrompt')}
//                 </span>
//               )}
//             </button>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={handlePhotoChange}
//               className="hidden"
//             />
//           </div>

//           {(aiLoading || aiError || aiAnalysis) && (
//             <AIAnalysisCard loading={aiLoading} error={aiError} analysis={aiAnalysis} />
//           )}

//           <div>
//             <label htmlFor="ghatSelect" className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
//               {t('form.ghatLabel')}
//             </label>
//             <select
//               id="ghatSelect"
//               value={ghatId}
//               onChange={(e) => setGhatId(e.target.value)}
//               className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-saffron"
//             >
//               {GHATS.map((g) => (
//                 <option key={g.id} value={g.id} className="bg-navy-900">
//                   {lang === 'hi' ? g.nameHi : g.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <span className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">{t('form.categoryLabel')}</span>
//             <div role="radiogroup" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//               {CATEGORIES.map((c) => {
//                 const active = category === c.id;
//                 return (
//                   <button
//                     key={c.id}
//                     type="button"
//                     role="radio"
//                     aria-checked={active}
//                     onClick={() => setCategory(c.id)}
//                     className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm text-left transition-colors ${
//                       active
//                         ? 'border-saffron bg-saffron/10 text-white'
//                         : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
//                     }`}
//                   >
//                     <span aria-hidden="true">{c.emoji}</span>
//                     <span>{t(`categories.${c.id}`)}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="noteInput" className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
//               {t('form.noteLabel')}
//             </label>
//             <textarea
//               id="noteInput"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder={t('form.notePlaceholder')}
//               className="w-full min-h-[90px] bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-saffron resize-y"
//             />
//           </div>

//           {status && (
//             <div
//               role="status"
//               className={`text-sm rounded-xl px-4 py-3 ${
//                 status.ok ? 'bg-emerald/15 text-emerald-light' : 'bg-red-500/15 text-red-300'
//               }`}
//             >
//               {status.msg}
//             </div>
//           )}

//           <motion.button
//             type="submit"
//             disabled={submitting}
//             whileHover={!submitting ? { y: -2 } : {}}
//             whileTap={!submitting ? { scale: 0.97 } : {}}
//             className="inline-flex items-center gap-2 bg-emerald disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-full transition-shadow"
//           >
//             {submitting && <Loader2 size={16} className="animate-spin" />}
//             {submitting ? t('form.submitting') : t('form.submit')}
//           </motion.button>
//         </form>
//         )}
//       </RevealOnScroll>
//     </section>
//   );
// }

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, LogIn, Loader2, MapPin, FileText } from "lucide-react";

import { GHATS, CATEGORIES } from "../data/constants.js";
import { compressImage } from "../lib/photo.js";
import { analyzeWastePhoto } from "../lib/wasteDetection.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";

import RevealOnScroll from "./RevealOnScroll.jsx";
import AIAnalysisCard from "./AIAnalysisCard.jsx";


export default function ReportForm({ onSubmit, onRequireAuth }) {

const { user } = useAuth();
const { t, lang } = useLanguage();


const [ghatId,setGhatId] = useState(GHATS[0].id);
const [category,setCategory] = useState(null);
const [note,setNote] = useState("");
const [photo,setPhoto] = useState(null);

const [submitting,setSubmitting] = useState(false);
const [status,setStatus] = useState(null);

const fileInputRef = useRef(null);


const [aiLoading,setAiLoading] = useState(false);
const [aiError,setAiError] = useState(false);
const [aiAnalysis,setAiAnalysis] = useState(null);



async function handlePhotoChange(e){

const file=e.target.files?.[0];

if(!file) return;


try{

const result=await compressImage(file);

setPhoto(result);

setAiAnalysis(null);
setAiError(false);

setAiLoading(true);


try{

const analysis=await analyzeWastePhoto(
result.dataUrl
);

setAiAnalysis(analysis);


}catch(err){

console.error(err);
setAiError(true);

}

finally{

setAiLoading(false);

}


}catch(err){

setStatus({
ok:false,
msg:err.message
});

}

}



async function handleSubmit(e){

e.preventDefault();


if(!category){

setStatus({
ok:false,
msg:t("form.pickCategory")
});

return;

}


setSubmitting(true);
setStatus(null);



try{


await onSubmit({

ghatId,
category,
note:note.trim(),
photoBlob:photo?.blob ?? null,
userId:user.id,
aiAnalysis

});


setStatus({

ok:true,
msg:t("form.successMsg")

});


setCategory(null);
setNote("");
setPhoto(null);
setAiAnalysis(null);
setAiError(false);


if(fileInputRef.current)
fileInputRef.current.value="";


}

catch(err){

console.error(err);

setStatus({

ok:false,
msg:t("form.errorMsg")

});


}

finally{

setSubmitting(false);

}

}



return (

<section className="bg-[#f7faf7] py-20">


<div className="max-w-5xl mx-auto px-6">


{/* HEADER */}

<RevealOnScroll>

<div className="mb-12">


<p className="
text-emerald-700
uppercase
tracking-[0.25em]
text-xs
font-bold
">

{t("form.eyebrow")}

</p>



<h1 className="
mt-4
text-5xl
md:text-6xl
font-bold
text-slate-900
leading-tight
">

{t("form.title")}

</h1>



<p className="
mt-5
text-lg
text-slate-600
max-w-2xl
">

{t("form.sub")}

</p>


</div>

</RevealOnScroll>





<RevealOnScroll delay={0.1}>


{
!user ? (


<div className="
bg-white
rounded-3xl
border
border-slate-200
shadow-xl
p-12
text-center
">


<LogIn 
size={38}
className="
mx-auto
mb-5
text-emerald-600
"
/>


<h3 className="
text-2xl
font-bold
text-slate-900
">

{t("form.signInPrompt")}

</h3>


<p className="
text-slate-500
mt-3
max-w-md
mx-auto
">

{t("form.signInBody")}

</p>


<button

onClick={onRequireAuth}

className="
mt-7
bg-emerald-600
hover:bg-emerald-700
text-white
px-8
py-3
rounded-xl
font-semibold
transition
"

>

{t("form.signInBtn")}

</button>


</div>



)

:

(



<form

onSubmit={handleSubmit}

className="
bg-white
rounded-3xl
border
border-slate-200
shadow-xl
p-8
md:p-10
space-y-8
"


>



{/* IMAGE UPLOAD */}



<div>


<label className="
flex
items-center
gap-2
text-sm
font-semibold
text-slate-700
mb-3
">

<Camera size={18}/>

{t("form.photoLabel")}

</label>



<button

type="button"

onClick={()=>fileInputRef.current?.click()}


className="

w-full

rounded-2xl

border-2
border-dashed

border-emerald-200

bg-emerald-50

hover:bg-emerald-100

transition

p-8

"


>



{

photo ?

<img

src={photo.dataUrl}

alt="uploaded"

className="
max-h-60
mx-auto
rounded-xl
"

/>

:

<div className="
flex
flex-col
items-center
gap-3
text-emerald-700
">


<Camera size={35}/>


<span className="font-medium">

{t("form.photoPrompt")}

</span>


</div>


}



</button>



<input

ref={fileInputRef}

type="file"

accept="image/*"

capture="environment"

onChange={handlePhotoChange}

className="hidden"

/>


</div>




{/* AI CARD */}


{
(aiLoading || aiError || aiAnalysis)

&&

<AIAnalysisCard

loading={aiLoading}

error={aiError}

analysis={aiAnalysis}

/>

}




{/* GHAT */}



<div>


<label className="
flex
gap-2
items-center
text-sm
font-semibold
text-slate-700
mb-3
">


<MapPin size={18}/>

{t("form.ghatLabel")}


</label>



<select

value={ghatId}

onChange={(e)=>setGhatId(e.target.value)}

className="

w-full

bg-white

border

border-slate-300

rounded-xl

px-4

py-3

text-slate-800

focus:ring-2

focus:ring-emerald-400

outline-none

"


>


{

GHATS.map(g=>(

<option

key={g.id}

value={g.id}

>

{

lang==="hi"
?
g.nameHi
:
g.name

}

</option>


))


}


</select>


</div>




{/* CATEGORY */}



<div>


<label className="
text-sm
font-semibold
text-slate-700
block
mb-3
">

{t("form.categoryLabel")}

</label>



<div className="
grid
grid-cols-2
md:grid-cols-3
gap-3
">


{

CATEGORIES.map(c=>{


const active=category===c.id;


return (


<button

type="button"

key={c.id}

onClick={()=>setCategory(c.id)}


className={`

flex

items-center

gap-2

rounded-xl

border

px-4

py-3

text-sm

transition

${

active

?

"bg-emerald-600 text-white border-emerald-600"

:

"bg-white text-slate-600 border-slate-200 hover:border-emerald-400"

}

`}


>

<span>{c.emoji}</span>

{t(`categories.${c.id}`)}


</button>


)


})


}


</div>


</div>





{/* NOTE */}


<div>


<label className="
flex
gap-2
items-center
text-sm
font-semibold
text-slate-700
mb-3
">


<FileText size={18}/>

{t("form.noteLabel")}


</label>



<textarea


value={note}

onChange={(e)=>setNote(e.target.value)}


placeholder={t("form.notePlaceholder")}


className="

w-full

min-h-[120px]

border

border-slate-300

rounded-xl

p-4

text-slate-800

outline-none

focus:ring-2

focus:ring-emerald-400

resize-none

"


/>



</div>




{/* STATUS */}



{

status &&

<div

className={`

rounded-xl

px-4

py-3

text-sm

${

status.ok

?

"bg-emerald-100 text-emerald-700"

:

"bg-red-100 text-red-700"

}

`}

>

{status.msg}

</div>


}




{/* BUTTON */}


<motion.button


type="submit"

disabled={submitting}


whileHover={{
y:-2
}}

whileTap={{
scale:.97
}}


className="

flex

items-center

gap-2

bg-emerald-600

hover:bg-emerald-700

disabled:opacity-60

text-white

font-semibold

px-8

py-3.5

rounded-xl

shadow-lg

transition

"


>


{

submitting &&

<Loader2

size={18}

className="animate-spin"

/>

}



{

submitting

?

t("form.submitting")

:

t("form.submit")

}



</motion.button>



</form>


)

}


</RevealOnScroll>


</div>


</section>


);


}