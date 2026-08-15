// import { useMemo, useState } from 'react';
// import { ArrowUpRight, Boxes, CheckCircle2, HandHeart, MapPin, Recycle, Search, Shirt, Sparkles, Sprout } from 'lucide-react';
// import { useLanguage } from '../hooks/useLanguage.jsx';
// import RevealOnScroll from './RevealOnScroll.jsx';

// const PARTNERS = [
//   { name: 'Goonj', type: 'Community development', area: 'Mathura collection drive', accepts: ['Clothes', 'Household'], tags: ['clothes', 'household'], note: 'Clean, wearable clothing and useful household essentials.', icon: Shirt, color: 'saffron' },
//   { name: 'Plastic for Change', type: 'Plastic recovery', area: 'Pickup partner network', accepts: ['Plastic', 'Packaging'], tags: ['plastic'], note: 'Sorted PET bottles, rigid plastic and clean packaging.', icon: Boxes, color: 'river' },
//   { name: 'Sankalp Taru', type: 'Local environment group', area: 'Mathura–Vrindavan', accepts: ['Clothes', 'E-waste'], tags: ['clothes', 'ewaste'], note: 'Donation drives and responsible handover support.', icon: HandHeart, color: 'emerald' },
// ];

// export default function ReuseNetwork() {
//   const { lang } = useLanguage();
//   const [filter, setFilter] = useState('all');
//   const [query, setQuery] = useState('');
//   const isHindi = lang === 'hi';
//   const labels = isHindi
//     ? { eyebrow: 'कचरे को संसाधन बनाएं', title: 'रीयूज़ नेटवर्क', body: 'पुराने कपड़े, प्लास्टिक और उपयोगी सामान सही संस्था तक पहुँचाएँ। छोटी-सी वस्तु किसी के लिए बड़ी मदद बन सकती है।', search: 'सामान या संस्था खोजें', all: 'सभी', clothes: 'कपड़े', plastic: 'प्लास्टिक', ewaste: 'ई-वेस्ट', household: 'घरेलू सामान', accepts: 'स्वीकार करते हैं', find: 'संस्था देखें', promise: 'दान करने से पहले वस्तुओं को साफ़, सूखा और अलग-अलग रखें।' }
//     : { eyebrow: 'Turn waste into a resource', title: 'Reuse Network', body: 'Give old clothes, plastic, and useful household items a second life through the right community partner.', search: 'Search an item or organisation', all: 'All', clothes: 'Clothes', plastic: 'Plastic', ewaste: 'E-waste', household: 'Household', accepts: 'Accepts', find: 'View organisation', promise: 'Before donating, keep items clean, dry, and sorted by material.' };
//   const filters = [['all', labels.all], ['clothes', labels.clothes], ['plastic', labels.plastic], ['ewaste', labels.ewaste], ['household', labels.household]];
//   const results = useMemo(() => PARTNERS.filter((partner) => (filter === 'all' || partner.tags.includes(filter)) && `${partner.name} ${partner.type} ${partner.accepts.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

//   return <section id="reuse" className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
//     <RevealOnScroll><div className="border-y border-white/15 py-10 sm:py-12"><div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-end"><div><span className="font-heading text-xs tracking-[.2em] uppercase text-emerald-light">{labels.eyebrow}</span><h2 className="font-display text-4xl sm:text-5xl tracking-[-.04em] leading-[1.05] font-semibold mt-4">A second life for useful materials.</h2><p className="text-white/65 leading-relaxed max-w-xl mt-5">{labels.body}</p></div><div className="border-b border-white/30 py-3 flex items-center gap-3"><Search className="text-emerald-light shrink-0" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="bg-transparent outline-none text-sm text-white placeholder:text-white/35 w-full" aria-label={labels.search} /></div></div><div className="grid sm:grid-cols-3 mt-10 border-t border-white/15"><div className="border-b sm:border-b-0 sm:border-r border-white/15 py-6 sm:pr-6"><Shirt className="text-saffron mb-5" size={22}/><p className="text-[10px] uppercase tracking-[.18em] text-white/45">Old material</p><h3 className="font-heading font-semibold mt-1">Clothes & household goods</h3></div><div className="border-b sm:border-b-0 sm:border-r border-white/15 py-6 sm:px-6"><Recycle className="text-emerald-light mb-5" size={22}/><p className="text-[10px] uppercase tracking-[.18em] text-white/45">Transformation</p><h3 className="font-heading font-semibold mt-1">Sorted through trusted partners</h3></div><div className="py-6 sm:pl-6"><Sprout className="text-blue-300 mb-5" size={22}/><p className="text-[10px] uppercase tracking-[.18em] text-white/45">New purpose</p><h3 className="font-heading font-semibold mt-1">Resources for people & place</h3></div></div></div></RevealOnScroll>
//     <RevealOnScroll delay={.08}><div className="flex flex-wrap gap-2 mt-8">{filters.map(([key, label]) => <button type="button" key={key} onClick={() => setFilter(key)} className={`rounded-full px-4 py-2 text-sm transition-colors ${filter === key ? 'bg-saffron text-navy-950 font-semibold' : 'border border-white/15 text-white/65 hover:border-white/35'}`}>{label}</button>)}</div></RevealOnScroll>
//     <div className="grid md:grid-cols-3 gap-5 mt-6">{results.map(({ name, type, area, accepts, note, icon: Icon, color }, index) => <RevealOnScroll key={name} delay={index * .06}><article className="glass rounded-md p-6 h-full flex flex-col"><span className={`w-10 h-10 rounded-md flex items-center justify-center mb-6 ${color === 'saffron' ? 'bg-saffron/15 text-saffron' : color === 'river' ? 'bg-river/25 text-blue-300' : 'bg-emerald/15 text-emerald-light'}`}><Icon size={21} /></span><p className="text-xs uppercase tracking-wider text-white/40">{type}</p><h3 className="font-heading font-semibold text-xl mt-1">{name}</h3><p className="flex items-center gap-1.5 text-xs text-white/45 mt-2"><MapPin size={13} />{area}</p><p className="text-sm text-white/60 leading-relaxed mt-5">{note}</p><div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{labels.accepts}</p><div className="flex flex-wrap gap-1.5">{accepts.map((item) => <span key={item} className="text-xs rounded-sm bg-white/10 px-2.5 py-1 text-white/70">{item}</span>)}</div></div><a href="/report" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron">{labels.find}<ArrowUpRight size={15} /></a></article></RevealOnScroll>)}</div>
//     {results.length === 0 && <div className="glass rounded-2xl p-8 text-center text-white/55 mt-6">{isHindi ? 'कोई संस्था नहीं मिली। दूसरी श्रेणी चुनें।' : 'No partner found. Try another material category.'}</div>}
//     <RevealOnScroll delay={.18}><div className="rounded-2xl border border-emerald/25 bg-emerald/10 mt-6 px-5 py-4 flex gap-3 items-start text-sm text-emerald-light"><CheckCircle2 size={18} className="shrink-0 mt-0.5" /><span>{labels.promise}</span><Sparkles size={16} className="ml-auto shrink-0 text-saffron" /></div></RevealOnScroll>
//   </section>;
// }

import { useMemo, useState } from "react";

import {
ArrowUpRight,
Boxes,
CheckCircle2,
HandHeart,
MapPin,
Recycle,
Search,
Shirt,
Sparkles,
Sprout
} from "lucide-react";

import { useLanguage } from "../hooks/useLanguage.jsx";
import RevealOnScroll from "./RevealOnScroll.jsx";


const PARTNERS=[

{
name:"Goonj",
type:"Community development",
area:"Mathura collection drive",
accepts:["Clothes","Household"],
tags:["clothes","household"],
note:"Clean wearable clothes and useful household items are reused for community support.",
icon:Shirt
},


{
name:"Plastic for Change",
type:"Plastic recovery",
area:"Pickup partner network",
accepts:["Plastic","Packaging"],
tags:["plastic"],
note:"Plastic waste is collected, sorted and moved towards responsible recycling.",
icon:Boxes
},


{
name:"Sankalp Taru",
type:"Environment group",
area:"Mathura–Vrindavan",
accepts:["Clothes","E-waste"],
tags:["clothes","ewaste"],
note:"Supports donation drives and responsible material handover.",
icon:HandHeart
}

];



export default function ReuseNetwork(){


const {lang}=useLanguage();

const [filter,setFilter]=useState("all");

const [query,setQuery]=useState("");



const isHindi=lang==="hi";



const labels=isHindi?

{

eyebrow:"कचरे को संसाधन बनाएं",

title:"रीयूज़ नेटवर्क",

body:"पुरानी वस्तुओं को सही संस्था तक पहुँचाकर उन्हें नया जीवन दें।",

search:"सामान या संस्था खोजें",

all:"सभी",

clothes:"कपड़े",

plastic:"प्लास्टिक",

ewaste:"ई-वेस्ट",

household:"घरेलू सामान",

accepts:"स्वीकार करते हैं",

find:"संस्था देखें",

promise:"वस्तुओं को साफ़, सूखा और अलग करके जमा करें।"

}

:

{

eyebrow:"TURN WASTE INTO VALUE",

title:"Reuse Network",

body:"Connect reusable materials with trusted organisations and give waste a second life.",

search:"Search item or organisation",

all:"All",

clothes:"Clothes",

plastic:"Plastic",

ewaste:"E-waste",

household:"Household",

accepts:"Accepts",

find:"View organisation",

promise:"Keep materials clean, dry and separated before donation."

};



const filters=[

["all",labels.all],

["clothes",labels.clothes],

["plastic",labels.plastic],

["ewaste",labels.ewaste],

["household",labels.household]

];




const results=useMemo(()=>{


return PARTNERS.filter(

partner=>

(filter==="all" || partner.tags.includes(filter))

&&

`${partner.name} ${partner.type} ${partner.accepts.join(" ")}`

.toLowerCase()

.includes(query.toLowerCase())

);


},[filter,query]);






return (

<section
id="reuse"
className="
bg-[#f7faf7]
py-24
"
>


<div className="
max-w-7xl
mx-auto
px-6
">


{/* HEADER */}


<RevealOnScroll>


<div className="max-w-3xl">


<p className="
text-emerald-700
uppercase
tracking-[0.25em]
text-xs
font-bold
">

{labels.eyebrow}

</p>


<h2 className="
mt-4
text-5xl
font-bold
text-slate-900
">

{labels.title}

</h2>


<p className="
mt-5
text-lg
text-slate-600
">

{labels.body}

</p>


</div>



</RevealOnScroll>






{/* REUSE JOURNEY */}



<div className="
grid
md:grid-cols-3
gap-5
mt-12
">


<div className="
bg-white
rounded-3xl
p-7
border
border-slate-200
shadow-sm
">


<Shirt
className="text-emerald-600 mb-5"
/>


<p className="
text-xs
uppercase
tracking-widest
text-slate-400
">

Old Material

</p>


<h3 className="
font-bold
text-xl
mt-2
">

Clothes & Useful Items

</h3>


</div>



<div className="
bg-white
rounded-3xl
p-7
border
border-slate-200
shadow-sm
">


<Recycle
className="text-green-600 mb-5"
/>


<p className="
text-xs
uppercase
tracking-widest
text-slate-400
">

Transformation

</p>


<h3 className="
font-bold
text-xl
mt-2
">

Sorted & Reused

</h3>


</div>




<div className="
bg-white
rounded-3xl
p-7
border
border-slate-200
shadow-sm
">


<Sprout
className="text-emerald-600 mb-5"
/>


<p className="
text-xs
uppercase
tracking-widest
text-slate-400
">

New Purpose

</p>


<h3 className="
font-bold
text-xl
mt-2
">

Community Impact

</h3>


</div>



</div>






{/* SEARCH */}



<div className="
mt-12
flex
items-center
gap-3
bg-white
border
border-slate-200
rounded-2xl
px-5
py-4
shadow-sm
">


<Search
className="text-emerald-600"
/>


<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder={labels.search}

className="
w-full
outline-none
text-slate-800
"

/>


</div>







{/* FILTERS */}


<div className="
flex
flex-wrap
gap-3
mt-6
">


{

filters.map(([key,label])=>(


<button

key={key}

onClick={()=>setFilter(key)}

className={`

px-5

py-2

rounded-full

text-sm

font-medium

transition

${

filter===key

?

"bg-emerald-600 text-white"

:

"bg-white border border-slate-200 text-slate-600"

}

`}


>

{label}

</button>


))


}


</div>







{/* NGO CARDS */}



<div className="
grid
md:grid-cols-3
gap-6
mt-10
">


{


results.map((partner,index)=>{


const Icon=partner.icon;


return (


<RevealOnScroll

key={partner.name}

delay={index*.08}

>


<article

className="
bg-white
rounded-3xl
border
border-slate-200
p-7
shadow-sm
hover:shadow-xl
transition
h-full
flex
flex-col
"

>


<div className="
w-12
h-12
rounded-2xl
bg-emerald-50
flex
items-center
justify-center
text-emerald-600
mb-6
">


<Icon size={24}/>


</div>



<p className="
text-xs
uppercase
tracking-wider
text-slate-400
">

{partner.type}

</p>


<h3 className="
text-2xl
font-bold
text-slate-900
mt-2
">

{partner.name}

</h3>



<p className="
flex
gap-2
items-center
text-sm
text-slate-500
mt-3
">

<MapPin size={15}/>

{partner.area}

</p>



<p className="
text-slate-600
mt-5
leading-relaxed
">

{partner.note}

</p>



<div className="mt-6">


<p className="
text-xs
font-bold
uppercase
text-slate-400
mb-3
">

{labels.accepts}

</p>


<div className="flex flex-wrap gap-2">


{

partner.accepts.map(item=>(


<span

key={item}

className="
bg-emerald-50
text-emerald-700
px-3
py-1
rounded-full
text-xs
"

>

{item}

</span>


))


}


</div>


</div>




<a

href="/report"

className="
mt-auto
pt-7
inline-flex
items-center
gap-2
text-emerald-700
font-semibold
"


>

{labels.find}

<ArrowUpRight size={16}/>

</a>



</article>


</RevealOnScroll>


)


})


}



</div>






{/* NOTE */}


<div className="
mt-8
bg-emerald-50
border
border-emerald-200
rounded-2xl
p-5
flex
gap-3
items-center
text-emerald-800
">


<CheckCircle2/>

<span>

{labels.promise}

</span>


<Sparkles className="ml-auto"/>


</div>




</div>


</section>


);


}