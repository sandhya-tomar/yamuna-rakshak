// import { useEffect, useMemo, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { GHATS } from '../data/constants.js';
// import RevealOnScroll from './RevealOnScroll.jsx';

// function ghatScore(reports, ghatId) {
//   const relevant = reports.filter((r) => r.ghatId === ghatId && r.category !== 'clean');
//   const open = relevant.filter((r) => !r.cleaned).length;
//   const total = relevant.length;
//   if (total === 0) return { open: 0, total: 0, pct: 100 };
//   return { open, total, pct: Math.round(((total - open) / total) * 100) };
// }

// const MATHURA_CENTER = [27.5008, 77.6737];
// // Bounding box roughly 5km around the ghats — panning outside this is blocked.
// const MATHURA_BOUNDS = [
//   [27.47, 77.64],
//   [27.53, 77.71],
// ];

// export default function MapSection({ reports }) {
//   const mapRef = useRef(null);
//   const containerRef = useRef(null);
//   const markersRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current || mapRef.current) return;
//     mapRef.current = L.map(containerRef.current, {
//       minZoom: 13,
//       maxZoom: 18,
//       maxBounds: MATHURA_BOUNDS,
//       maxBoundsViscosity: 1.0, // hard stop at the boundary, no rubber-banding past it
//     }).setView(MATHURA_CENTER, 14);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(mapRef.current);
//     markersRef.current = L.layerGroup().addTo(mapRef.current);

//     const resizeTimer = setTimeout(() => mapRef.current?.invalidateSize(), 300);

//     return () => {
//       clearTimeout(resizeTimer);
//       mapRef.current?.remove();
//       mapRef.current = null;
//     };
//   }, []);

//   const scores = useMemo(
//     () => GHATS.filter((g) => g.id !== 'other').map((g) => ({ ...g, score: ghatScore(reports, g.id) })),
//     [reports]
//   );

//   useEffect(() => {
//     if (!markersRef.current) return;
//     markersRef.current.clearLayers();
//     scores.forEach((g) => {
//       const pct = g.score.total === 0 ? 100 : g.score.pct;
//       const color = pct >= 70 ? '#2E8B57' : pct >= 35 ? '#F4B400' : '#c0392b';
//       const marker = L.circleMarker([g.lat, g.lng], {
//         radius: 10,
//         fillColor: color,
//         color: '#fff',
//         weight: 2,
//         fillOpacity: 0.9,
//       }).addTo(markersRef.current);
//       marker.bindPopup(
//         `<strong>${g.name}</strong><br>${
//           g.score.total === 0 ? 'No reports yet' : `${g.score.open} open of ${g.score.total} reports`
//         }`
//       );
//     });
//   }, [scores]);

//   return (
//     <section id="map" className="max-w-7xl mx-auto px-6 py-24">
//       <RevealOnScroll>
//         <span className="font-heading text-xs tracking-[0.2em] uppercase text-saffron">Live data</span>
//         <h2 className="font-display text-4xl font-bold mt-2 mb-3">Live Ghat Map</h2>
//         <p className="text-white/60 mb-10">Markers turn from red to green as ghats get cleaned up.</p>
//       </RevealOnScroll>
//       <RevealOnScroll delay={0.1}>
//         <div className="glass rounded-3xl overflow-hidden p-2">
//           <div ref={containerRef} className="h-[420px] rounded-2xl overflow-hidden" />
//         </div>
//       </RevealOnScroll>
//     </section>
//   );
// }

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { GHATS } from "../data/constants.js";
import RevealOnScroll from "./RevealOnScroll.jsx";


function ghatScore(reports, ghatId) {

const relevant = reports.filter(
(r)=>r.ghatId===ghatId && r.category!=="clean"
);

const open = relevant.filter(
(r)=>!r.cleaned
).length;


const total = relevant.length;


if(total===0)
return {
open:0,
total:0,
pct:100
};


return {

open,
total,
pct:Math.round(((total-open)/total)*100)

};


}



const MATHURA_CENTER=[
27.5008,
77.6737
];


const MATHURA_BOUNDS=[

[27.47,77.64],

[27.53,77.71]

];




export default function MapSection({reports}){


const mapRef=useRef(null);

const containerRef=useRef(null);

const markersRef=useRef(null);




useEffect(()=>{


if(!containerRef.current || mapRef.current)
return;



mapRef.current=L.map(
containerRef.current,
{

minZoom:13,

maxZoom:18,

maxBounds:MATHURA_BOUNDS,

maxBoundsViscosity:1

}

).setView(
MATHURA_CENTER,
14
);



L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{

attribution:
"&copy; OpenStreetMap contributors"

}

).addTo(mapRef.current);



markersRef.current=L.layerGroup()
.addTo(mapRef.current);



setTimeout(()=>{

mapRef.current?.invalidateSize();

},300);



return()=>{


mapRef.current?.remove();

mapRef.current=null;


};



},[]);






const scores=useMemo(()=>{


return GHATS
.filter(
(g)=>g.id!=="other"
)
.map(
(g)=>({

...g,

score:ghatScore(
reports,
g.id
)

})

);


},[reports]);





useEffect(()=>{


if(!markersRef.current)
return;



markersRef.current.clearLayers();



scores.forEach((g)=>{


const pct=g.score.total===0
?
100
:
g.score.pct;



const color=

pct>=70
?
"#198754"

:

pct>=35
?
"#f59e0b"

:

"#dc2626";





const marker=L.circleMarker(

[g.lat,g.lng],

{

radius:10,

fillColor:color,

color:"#ffffff",

weight:3,

fillOpacity:.9

}


).addTo(
markersRef.current
);




marker.bindPopup(

`

<div style="font-family:sans-serif">

<h3 style="font-weight:700;color:#123">

${g.name}

</h3>


<p>

${
g.score.total===0

?

"No reports yet"

:

`${g.score.open} open of ${g.score.total} reports`

}

</p>

</div>

`

);



});



},[scores]);





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


<div className="mb-12">


<p className="
uppercase
tracking-[0.25em]
text-xs
font-bold
text-emerald-700
">

Live Data

</p>




<h3 className="
mt-3
text-5xl
font-bold
text-slate-900
">

Live Ghat Map

</h3>



<p className="
mt-4
text-lg
text-slate-600
max-w-2xl
">

Track community reports and monitor cleanup progress
across Yamuna ghats in Mathura.

</p>



</div>


</RevealOnScroll>







<RevealOnScroll delay={0.15}>


{/*
  relative + z-0 forces this wrapper to establish its OWN stacking
  context. Without an explicit z-index here, Leaflet's internal panes
  (z-index up to ~700) escape upward and render above the fixed navbar
  (z-50) on scroll. Confining them here fixes that, and "isolate" makes
  the intent explicit for anyone editing this later.
*/}
<div className="

relative

z-0

isolate

bg-white

rounded-3xl

shadow-xl

border

border-slate-200

overflow-hidden

p-4

">


<div

ref={containerRef}

className="
h-[520px]
rounded-2xl
overflow-hidden
"

/>



</div>



</RevealOnScroll>







{/* LEGEND */}


<div className="

grid

grid-cols-1

md:grid-cols-3

gap-5

mt-8

">


<div className="
bg-white
rounded-2xl
p-5
border
border-slate-200
flex
items-center
gap-4
">


<div className="
w-4
h-4
rounded-full
bg-green-600
"/>


<div>

<h4 className="
font-semibold
text-slate-900
">

Clean

</h4>


<p className="
text-sm
text-slate-500
">

70%+ resolved

</p>


</div>


</div>






<div className="
bg-white
rounded-2xl
p-5
border
border-slate-200
flex
items-center
gap-4
">


<div className="
w-4
h-4
rounded-full
bg-yellow-500
"/>


<div>

<h4 className="
font-semibold
text-slate-900
">

Needs Attention

</h4>


<p className="
text-sm
text-slate-500
">

Cleaning in progress

</p>


</div>


</div>







<div className="
bg-white
rounded-2xl
p-5
border
border-slate-200
flex
items-center
gap-4
">


<div className="
w-4
h-4
rounded-full
bg-red-600
"/>


<div>

<h4 className="
font-semibold
text-slate-900
">

Critical

</h4>


<p className="
text-sm
text-slate-500
">

Requires action

</p>


</div>


</div>



</div>





</div>


</section>


);



}