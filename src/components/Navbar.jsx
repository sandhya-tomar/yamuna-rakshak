// import { useEffect, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Droplets, Languages, Menu, Shield, User, X } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth.jsx';
// import { useLanguage } from '../hooks/useLanguage.jsx';

// const links = [{ label: 'Home', path: '/' }, { label: 'Report', path: '/report' }, { label: 'Live map', path: '/map' }, { label: 'NGO network', path: '/reuse' }, { label: 'Activity', path: '/activity' }];

// export default function Navbar({ onOpenAuth, onOpenAdmin, onNavigate, activePath }) {
  
//   const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false); const { user, profile, isAdmin, signOut } = useAuth(); const { lang, toggleLang, t } = useLanguage();
//   const isHome = activePath === '/';
//   useEffect(() => { const listener = () => setScrolled(window.scrollY > 18); window.addEventListener('scroll', listener); return () => window.removeEventListener('scroll', listener); }, []);
//   const go = (path) => { setOpen(false); onNavigate(path); };
//   const itemClass = (path) => `text-sm font-semibold transition-colors ${activePath === path ? 'text-emerald' : 'text-slate-600 hover:text-[#10283b]'}`;
//   return <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .55 }} className={`fixed z-50 transition-all ${isHome ? 'top-5 inset-x-0 px-4' : 'top-0 inset-x-0 border-b bg-white/95 border-slate-200 backdrop-blur-xl shadow-sm'}`}>
//     <div className={`max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between ${isHome ? 'rounded-2xl bg-white/95 shadow-[0_10px_28px_rgba(26,48,36,.12)]' : ''}`}><button type="button" onClick={() => go('/')} className="flex items-center gap-2.5 font-heading font-bold text-lg text-[#10283b]"><span className="w-9 h-9 rounded-full bg-[#1f8870] flex items-center justify-center"><Droplets size={18} className="text-white" /></span><span className="tracking-[-.04em]">Yamuna <span className="text-emerald">Rakshak</span></span></button>
//       <nav className="hidden lg:flex items-center gap-7">{links.map(link => <button key={link.path} type="button" onClick={() => go(link.path)} className={itemClass(link.path)}>{link.label}</button>)}{isAdmin && <button type="button" onClick={onOpenAdmin} className="flex items-center gap-1.5 text-sm font-semibold text-saffron"><Shield size={14} /> {t('nav.admin')}</button>}</nav>
//       <div className="hidden sm:flex items-center gap-3"><button type="button" onClick={toggleLang} aria-label="Toggle language" className="flex items-center gap-1 text-xs font-bold text-slate-600 border border-slate-200 rounded-full px-3 py-2 hover:border-emerald"><Languages size={13} />{lang === 'en' ? 'HI' : 'EN'}</button><button type="button" onClick={() => go('/contact')} className="bg-[#1f78a8] hover:bg-[#17638b] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors">Contact</button>{user ? <button type="button" onClick={signOut} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200" aria-label="Sign out" title={profile?.full_name || user.email}><User size={16}/></button> : <button type="button" onClick={onOpenAuth} className="text-sm font-semibold text-slate-700 border border-slate-300 rounded-full px-4 py-2.5">{t('nav.signIn')}</button>}</div>
//       <button type="button" onClick={() => setOpen(!open)} className="sm:hidden w-10 h-10 grid place-items-center rounded-full border border-slate-300 text-[#10283b]" aria-label="Toggle navigation">{open ? <X size={19}/> : <Menu size={20}/>}</button>
//     </div>
//     <AnimatePresence>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="sm:hidden overflow-hidden border-t border-slate-200 bg-white"><nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">{links.map(link => <button key={link.path} type="button" onClick={() => go(link.path)} className={`${itemClass(link.path)} text-left rounded-xl px-4 py-3 hover:bg-slate-50`}>{link.label}</button>)}<button type="button" onClick={() => go('/contact')} className="text-left rounded-xl px-4 py-3 text-sm font-semibold text-[#1f78a8]">Contact</button>{isAdmin && <button type="button" onClick={() => { setOpen(false); onOpenAdmin(); }} className="text-left rounded-xl px-4 py-3 text-sm text-saffron"><Shield size={14} className="inline mr-2" />{t('nav.admin')}</button>}<div className="flex gap-3 pt-3"><button type="button" onClick={toggleLang} className="border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-700">{lang === 'en' ? 'हिंदी' : 'English'}</button>{user ? <button type="button" onClick={signOut} className="border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-700">Sign out</button> : <button type="button" onClick={() => { setOpen(false); onOpenAuth(); }} className="bg-emerald rounded-full px-4 py-2 text-xs font-semibold text-white">{t('nav.signIn')}</button>}</div></nav></motion.div>}</AnimatePresence>
//   </motion.header>;
// }
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Languages, LogIn, Menu, Phone, User, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useLanguage } from '../hooks/useLanguage.jsx';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Report', path: '/report' },
  { label: 'Live map', path: '/map' },
  { label: 'NGO network', path: '/reuse' },
  { label: 'Activity', path: '/activity' },
];


export default function Navbar({
  onOpenAuth,
  onOpenAdmin,
  onNavigate,
  activePath
}) {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);


  const {
    user,
    profile,
    isAdmin,
    signOut
  } = useAuth();


  const {
    lang,
    toggleLang,
    t
  } = useLanguage();



  const isHome = activePath === '/';



  useEffect(() => {

    const listener = () => {
      setScrolled(window.scrollY > 18);
    };

    window.addEventListener('scroll', listener);

    return () =>
      window.removeEventListener('scroll', listener);

  }, []);




  const go = (path) => {
    setOpen(false);
    setAccountOpen(false);
    onNavigate(path);
  };



  const itemClass = (path) =>
    `text-sm font-semibold transition-colors ${
      activePath === path
      ? 'text-emerald'
      : 'text-slate-600 hover:text-[#10283b]'
    }`;



  return (

<motion.header

initial={{y:-80,opacity:0}}

animate={{y:0,opacity:1}}

transition={{duration:.55}}

className={`fixed z-50 transition-all w-full ${
isHome
? 'top-5 px-4'
: 'top-0 border-b bg-white/95 border-slate-200 backdrop-blur-xl shadow-sm'
}`}

>


<div
className={`
max-w-7xl mx-auto px-6 h-[76px]
flex items-center justify-between

${isHome 
? 'rounded-2xl bg-white/95 shadow-[0_10px_28px_rgba(26,48,36,.12)]'
:''
}

`}
>



{/* LOGO */}

<button
type="button"
onClick={()=>go('/')}
className="flex items-center gap-2.5 font-heading font-bold text-lg text-[#10283b]"
>

<span className="w-9 h-9 rounded-full bg-[#1f8870] flex items-center justify-center">
<Droplets size={18} className="text-white" />
</span>

<span className="tracking-[-.04em]">
Yamuna <span className="text-emerald">Rakshak</span>
</span>

</button>





{/* DESKTOP LINKS */}

<div className="hidden sm:flex items-center gap-7">


{
links.map(link=>(

<button

key={link.path}

type="button"

onClick={()=>go(link.path)}

className={itemClass(link.path)}

>

{link.label}

</button>

))

}



{
isAdmin &&

<button

onClick={onOpenAdmin}

className="text-sm font-semibold text-saffron"

>

{t('nav.admin')}

</button>

}



<button

onClick={toggleLang}

className="
flex items-center gap-1.5
text-xs font-bold
text-slate-600
border border-slate-200
rounded-full
px-3.5 py-2
hover:border-[#1f8870]
hover:text-[#1f8870]
transition-colors
"

>

<Languages size={13}/>

{
lang==='en'
?'हिंदी'
:'EN'
}

</button>





<button

onClick={()=>go('/contact')}

className="
flex items-center gap-1.5
bg-[#1f78a8]
hover:bg-[#17638b]
text-white
text-sm
font-semibold
px-4 py-2.5
rounded-full
shadow-[0_4px_14px_rgba(31,120,168,.28)]
hover:shadow-[0_6px_18px_rgba(31,120,168,.38)]
hover:-translate-y-0.5
transition-all
"

>

<Phone size={14}/>

Contact

</button>





{/* USER */}

{
user ?

<div className="relative">


<button

type="button"

onClick={()=>setAccountOpen(!accountOpen)}

className="
w-10 h-10 rounded-full
bg-slate-100
flex items-center justify-center
text-[#10283b]
hover:bg-slate-200
transition
"

>

<User size={18}/>

</button>



{
accountOpen &&

<div

className="
absolute right-0 top-12
w-60
rounded-2xl
bg-white
border border-slate-200
shadow-xl
p-3
"

>



<div className="
px-3 py-3
border-b border-slate-100
mb-2
">


<p className="
font-semibold
text-sm
text-[#10283b]
truncate
">

{
profile?.full_name || 'Volunteer'
}

</p>


<p className="
text-xs
text-slate-400
truncate
mt-1
">

{user.email}

</p>


</div>





<button

onClick={()=>go('/profile')}

className="
w-full text-left
px-3 py-2.5
rounded-xl
text-sm
text-slate-700
hover:bg-slate-50
"

>

👤 My Profile

</button>





<button

onClick={()=>go('/my-reports')}

className="
w-full text-left
px-3 py-2.5
rounded-xl
text-sm
text-slate-700
hover:bg-slate-50
"

>

📄 My Reports

</button>





<button

onClick={()=>{
setAccountOpen(false);
signOut();
}}

className="
w-full text-left
px-3 py-2.5
rounded-xl
text-sm
font-semibold
text-red-500
hover:bg-red-50
"

>

🚪 Sign out

</button>



</div>

}



</div>


:

<button

onClick={onOpenAuth}

className="
flex items-center gap-1.5
bg-[#1f8870]
hover:bg-[#187159]
text-white
font-semibold
text-sm
px-4
py-2.5
rounded-full
shadow-[0_4px_14px_rgba(31,136,112,.3)]
hover:shadow-[0_6px_18px_rgba(31,136,112,.4)]
hover:-translate-y-0.5
transition-all
"

>

<LogIn size={14}/>

{t('nav.signIn')}

</button>

}



</div>





{/* MOBILE BUTTON */}

<button

type="button"

onClick={()=>setOpen(!open)}

className="
sm:hidden
w-10 h-10
rounded-full
border
border-slate-300
grid place-items-center
"

>

{
open
?
<X size={20}/>
:
<Menu size={20}/>
}

</button>



</div>





{/* MOBILE MENU */}

{
open &&

<div className="
sm:hidden
bg-white
border-t
border-slate-200
px-6 py-4
space-y-2
">


{
links.map(link=>(

<button

key={link.path}

onClick={()=>go(link.path)}

className="
block
w-full
text-left
px-4 py-3
rounded-xl
text-sm
font-semibold
hover:bg-slate-50
"

>

{link.label}

</button>

))

}




{
user ?

<button

onClick={()=>{
signOut();
setOpen(false);
}}

className="
w-full
text-left
px-4 py-3
rounded-xl
text-sm
font-semibold
text-red-500
hover:bg-red-50
"

>

🚪 Sign out

</button>

:

<button

onClick={()=>{
setOpen(false);
onOpenAuth();
}}

className="
flex items-center justify-center gap-1.5
bg-[#1f8870]
text-white
px-4 py-3
rounded-full
text-sm
font-semibold
shadow-[0_4px_14px_rgba(31,136,112,.3)]
"

>

<LogIn size={15}/>

{t('nav.signIn')}

</button>

}



<button

onClick={toggleLang}

className="
w-full
flex items-center justify-center gap-1.5
border border-slate-200
rounded-full
px-4 py-3
text-sm font-semibold
text-slate-600
"

>

<Languages size={14}/>

{
lang==='en'
?'हिंदी में देखें'
:'View in English'
}

</button>



</div>

}


</motion.header>

  );

}