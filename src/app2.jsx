// Alma App Prototype (single-file React component)
// Diseño: colores rosa E34F92 para títulos, negro para texto
// Tailwind CSS assumed available in the project
// NOTE: This is a prototype UI + client-side logic. For production, connect to backend, storage, and secure auth.

import React, { useState, useEffect } from 'react';

const PINK = '#E34F92';

function TopHeader({ title }) {
  return (
    <div className="p-4 flex items-center justify-between" style={{ background: 'white' }}>
      <h1 className="text-2xl font-bold" style={{ color: PINK }}>{title}</h1>
    </div>
  );
}

function Home({ onNavigate }) {
  return (
    <div className="p-6 space-y-6">
      <div className="w-full h-48 rounded-lg bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">😊</div>
          <div className="mt-2 text-lg font-semibold" style={{ color: PINK }}>Bienvenida, futura mamá</div>
          <div className="mt-1 text-sm text-black">Alma está lista para ayudarte</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card label="Información" onClick={() => onNavigate('info')} />
        <Card label="Calendario" onClick={() => onNavigate('calendar')} />
        <Card label="Historial Clínico" onClick={() => onNavigate('records')} />
        <Card label="Ejercitarse" onClick={() => onNavigate('exercises')} />
        <Card label="Nutrición" onClick={() => onNavigate('nutrition')} />
        <Card label="Conectar a Alma" onClick={() => onNavigate('connect')} />
      </div>
    </div>
  );
}

function Card({ label, onClick }) {
  return (
    <button onClick={onClick} className="rounded-lg p-4 bg-white shadow text-center">
      <div className="mb-2 text-3xl">🌸</div>
      <div style={{ color: PINK, fontWeight: 700 }}>{label}</div>
    </button>
  );
}

// --- Información (preguntas frecuentes, consejos) ---
function Info() {
  const faqs = [
    { q: '¿Qué debo tomar antes del embarazo?', a: 'Ácido fólico: 400 mcg diario antes de concebir y durante el embarazo temprano, según profesional de salud.' },
    { q: '¿Qué alimentos evitar?', a: 'Evitar alcohol, mariscos crudos y quesos no pasteurizados. Priorizar frutas, verduras y proteínas limpias.' },
    { q: '¿Cuándo sentiré movimientos del bebé?', a: 'Generalmente entre la semana 18 y 22 en embarazos primerizos.' },
  ];

  return (
    <div className="p-6 space-y-4">
      <TopHeader title="Información para tu embarazo" />
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            <div style={{ color: PINK, fontWeight: 700 }}>{f.q}</div>
            <div className="mt-2 text-black">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Calendario con eventos (cliente simple) ---
function Calendar({ events, setEvents }) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');

  function addEvent() {
    if (!date || !title) return;
    const ev = { id: Date.now(), date, title };
    const next = [...events, ev].sort((a,b)=> a.date.localeCompare(b.date));
    setEvents(next);
    localStorage.setItem('alma_events', JSON.stringify(next));
    setDate(''); setTitle('');
  }

  function removeEvent(id){
    const next = events.filter(e=>e.id!==id);
    setEvents(next);
    localStorage.setItem('alma_events', JSON.stringify(next));
  }

  return (
    <div className="p-6">
      <TopHeader title="Calendario Rosa" />
      <p className="mt-2 text-black">Registra citas, semanas de embarazo y recordatorios. Los recordatorios se gestionan desde las notificaciones.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <label className="block mb-1 font-semibold" style={{ color: PINK }}>Título del evento</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded p-2" placeholder="Ej: Cita con ginecólogo" />
          <label className="block mt-3 mb-1 font-semibold" style={{ color: PINK }}>Fecha</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border rounded p-2" />
          <button onClick={addEvent} className="mt-3 w-full py-2 rounded" style={{ background: PINK, color: 'white' }}>Agregar evento</button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold" style={{ color: PINK }}>Próximos</h3>
          <ul className="mt-3 space-y-2">
            {events.length===0 && <li className="text-black">No hay eventos guardados</li>}
            {events.map(ev=> (
              <li key={ev.id} className="flex justify-between items-center bg-pink-50 p-2 rounded">
                <div>
                  <div className="text-sm font-semibold" style={{ color: PINK }}>{ev.title}</div>
                  <div className="text-xs text-black">{ev.date}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>removeEvent(ev.id)} className="text-sm px-2 py-1 rounded border">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// --- Historial Clínico (upload, folders editable) ---
function Records() {
  const [folders, setFolders] = useState(() => JSON.parse(localStorage.getItem('alma_folders')||'[]'));
  const [newFolder, setNewFolder] = useState('');

  useEffect(()=>{ localStorage.setItem('alma_folders', JSON.stringify(folders)); }, [folders]);

  function addFolder(){ if(!newFolder) return; setFolders(prev=>[...prev,{id:Date.now(),name:newFolder,files:[]}]); setNewFolder(''); }
  function removeFolder(id){ setFolders(prev=>prev.filter(f=>f.id!==id)); }
  function renameFolder(id, name){ setFolders(prev=>prev.map(f=> f.id===id?{...f,name}:f)); }
  function handleFileUpload(e, folderId){
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      setFolders(prev=> prev.map(f=> f.id===folderId?{...f, files:[...(f.files||[]), {id:Date.now(), name:file.name, data}]}:f));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="p-6">
      <TopHeader title="Sube tu historial clínico" />
      <p className="mt-2 text-black">Organiza tus documentos: ecografías, exámenes y fotos del embarazo.</p>

      <div className="mt-4">
        <div className="flex gap-2">
          <input value={newFolder} onChange={e=>setNewFolder(e.target.value)} placeholder="Nombre carpeta" className="p-2 border rounded w-full" />
          <button onClick={addFolder} className="px-4 py-2 rounded" style={{ background: PINK, color: 'white' }}>Crear</button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map(folder=> (
            <div key={folder.id} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <input className="font-bold" value={folder.name} onChange={e=>renameFolder(folder.id, e.target.value)} style={{ color: PINK, fontWeight: 700 }} />
                <button onClick={()=>removeFolder(folder.id)} className="text-sm">Eliminar</button>
              </div>
              <div className="mt-2">
                <label className="block text-sm mb-1">Agregar archivo</label>
                <input type="file" accept="image/,application/pdf,video/" onChange={e=>handleFileUpload(e, folder.id)} />
                <div className="mt-2 space-y-2">
                  {(folder.files||[]).map(f=> (
                    <div key={f.id} className="text-sm border rounded p-2">
                      <div style={{ color: PINK, fontWeight: 700 }}>{f.name}</div>
                      <a className="text-xs" href={f.data} target="_blank" rel="noreferrer">Ver / Descargar</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Exercises (videos + tips) ---
function Exercises(){
  const items = [
    {id:1, title:'Ejercicios de respiración prenatal', src:'#'},
    {id:2, title:'Movilidad pélvica suave', src:'#'},
  ];
  return (
    <div className="p-6">
      <TopHeader title="Ejercicios para ti" />
      <p className="mt-2 text-black">Videos cortos y ejercicios seguros durante el embarazo (consulta siempre a tu médico).</p>
      <div className="mt-4 space-y-4">
        {items.map(i=> (
          <div key={i.id} className="bg-white p-4 rounded shadow">
            <div style={{ color: PINK, fontWeight: 700 }}>{i.title}</div>
            <div className="mt-2">Video: (aquí puedes incrustar YouTube o archivo local)</div>
            <div className="mt-2">
              <video controls width="100%" src={i.src}></video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Nutrition (recipes, tips) ---
function Nutrition(){
  const tips = [
    'Prioriza frutas y verduras diarias',
    'Consumo de proteínas magras',
    'Hidratación: beber al menos 8 vasos al día'
  ];
  return (
    <div className="p-6">
      <TopHeader title="Nutrición amorosa" />
      <p className="mt-2 text-black">Consejos nutricionales durante el embarazo.</p>
      <ul className="mt-4 space-y-2">
        {tips.map((t,i)=>(<li key={i} className="bg-white p-3 rounded shadow"><div style={{ color: PINK, fontWeight: 700 }}>{t}</div></li>))}
      </ul>
    </div>
  );
}

// --- Connect Alma (WebSocket example) ---
function Connect() {
  const [status, setStatus] = useState('Desconectado');
  const [ws, setWs] = useState(null);

  function connectToAlma(){
    // Asume que en la Raspberry Pi corres un servidor WebSocket en ws://192.168.1.50:8765
    const socket = new WebSocket('ws://192.168.1.50:8765');
    socket.onopen = ()=>{ setStatus('Conectado'); setWs(socket); }
    socket.onclose = ()=>{ setStatus('Desconectado'); setWs(null); }
    socket.onmessage = (m)=>{ alert('Mensaje de Alma: '+m.data); }
    socket.onerror = ()=> setStatus('Error');
  }

  function sendTest(){ if(ws) ws.send(JSON.stringify({type:'speak', text:'Hola desde la app'})); }

  return (
    <div className="p-6">
      <TopHeader title="Conectar a Alma" />
      <p className="mt-2 text-black">Conecta la app a tu dispositivo Alma (Raspberry Pi). Usa WebSocket o HTTP.</p>
      <div className="mt-4 space-y-3">
        <div>Estado: <strong style={{ color: PINK }}>{status}</strong></div>
        <div className="flex gap-2">
          <button onClick={connectToAlma} className="px-4 py-2 rounded" style={{ background:PINK, color:'white' }}>Conectar</button>
          <button onClick={sendTest} className="px-4 py-2 rounded border">Enviar prueba</button>
        </div>
        <div className="mt-3 text-sm text-black">* En la Raspberry Pi ejecuta un servidor WebSocket que reciba comandos y reproduzca TTS / active ASR.</div>
      </div>
    </div>
  );
}

// --- Notifications, Settings, Profile ---
function Notifications({ events }){
  return (
    <div className="p-6">
      <TopHeader title="Notificaciones" />
      <div className="mt-4 space-y-2">
        {events.length===0 ? <div className="text-black">No hay notificaciones</div> : events.map(e=>(<div key={e.id} className="p-3 bg-white rounded shadow"><div style={{ color:PINK, fontWeight:700 }}>{e.title}</div><div className="text-xs">{e.date}</div></div>))}
      </div>
    </div>
  );
}

function Settings(){
  return (
    <div className="p-6">
      <TopHeader title="Ajustes" />
      <div className="mt-4 space-y-3">
        <div className="p-3 bg-white rounded shadow">Cambiar idioma</div>
        <div className="p-3 bg-white rounded shadow">Cerrar sesión</div>
        <div className="p-3 bg-white rounded shadow">Política de privacidad</div>
      </div>
    </div>
  );
}

function Profile(){
  const [created, setCreated] = useState(() => !!localStorage.getItem('alma_profile'));
  const [profile, setProfile] = useState(()=> JSON.parse(localStorage.getItem('alma_profile')||'{}'));
  const [form, setForm] = useState({name:'',email:'',id:'',address:'',dob:'',password:''});

  function create(){ localStorage.setItem('alma_profile', JSON.stringify(form)); setProfile(form); setCreated(true); }
  function signOut(){ localStorage.removeItem('alma_profile'); setProfile({}); setCreated(false); }

  return (
    <div className="p-6">
      <TopHeader title="Tu perfil" />
      {!created ? (
        <div className="space-y-3">
          <input placeholder="Nombre" className="w-full p-2 border rounded" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Correo" className="w-full p-2 border rounded" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input placeholder="Cédula" className="w-full p-2 border rounded" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} />
          <input placeholder="Dirección" className="w-full p-2 border rounded" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
          <input type="date" className="w-full p-2 border rounded" value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} />
          <input placeholder="Contraseña" type="password" className="w-full p-2 border rounded" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <button onClick={create} className="w-full py-2 rounded" style={{ background:PINK, color:'white' }}>Crear cuenta</button>
        </div>
      ) : (
        <div className="space-y-3">
          <div style={{ color:PINK, fontWeight:700 }}>{profile.name}</div>
          <div className="text-black">{profile.email}</div>
          <div className="text-black">{profile.id}</div>
          <button onClick={signOut} className="w-full py-2 rounded border">Cerrar sesión</button>

          <div className="mt-4 p-3 bg-white rounded shadow">
            <h4 style={{ color:PINK, fontWeight:700 }}>¿Cómo te sientes hoy?</h4>
            <p className="mt-2 text-black">Selecciona una opción y Alma te dará un consejo breve.</p>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded bg-pink-50">Feliz</button>
              <button className="px-3 py-2 rounded bg-pink-50">Cansada</button>
              <button className="px-3 py-2 rounded bg-pink-50">Preocupada</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Bottom Navigation (fixed) ---
function BottomNav({ active, onNav }){
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 flex justify-around" style={{ zIndex:50 }}>
      <button onClick={()=>onNav('home')} className="flex flex-col items-center text-sm"><div>🏠</div><div style={{ color: PINK }}>Inicio</div></button>
      <button onClick={()=>onNav('notifications')} className="flex flex-col items-center text-sm"><div>🔔</div><div style={{ color: PINK }}>Notificaciones</div></button>
      <button onClick={()=>onNav('settings')} className="flex flex-col items-center text-sm"><div>⚙</div><div style={{ color: PINK }}>Ajustes</div></button>
      <button onClick={()=>onNav('profile')} className="flex flex-col items-center text-sm"><div>👤</div><div style={{ color: PINK }}>Perfil</div></button>
    </div>
  );
}

export default function App(){
  const [route, setRoute] = useState('home');
  const [events, setEvents] = useState(()=> JSON.parse(localStorage.getItem('alma_events')||'[]'));

  useEffect(()=>{ localStorage.setItem('alma_events', JSON.stringify(events)); }, [events]);

  return (
    <div className="min-h-screen pb-20 bg-pink-10">
      {route==='home' && <Home onNavigate={setRoute} />}
      {route==='info' && <Info />}
      {route==='calendar' && <Calendar events={events} setEvents={setEvents} />}
      {route==='records' && <Records />}
      {route==='exercises' && <Exercises />}
      {route==='nutrition' && <Nutrition />}
      {route==='connect' && <Connect />}
      {route==='notifications' && <Notifications events={events} />}
      {route==='settings' && <Settings />}
      {route==='profile' && <Profile />}

      <BottomNav active={route} onNav={setRoute} />
    </div>
  );
}

/*
INSTRUCCIONES PARA INTEGRACIÓN CON RASPBERRY PI (ALMA):
- Ejecuta en la Raspberry Pi un servidor WebSocket que reciba mensajes JSON: {type: 'speak', text: '...'} y los reproduzca con TTS.
- Para activar ASR remoto, la app podría enviar {type: 'start_listen'} y Alma responderá con mensajes {type:'transcript', text:'...'}.
- Ejemplo de servidor simple en Python (websocket): use websockets library y pyttsx3/gTTS en la Pi.

SEGURIDAD Y PRIVACIDAD:
- Usa HTTPS/WSS para comunicación segura.
- Autentica sesiones (tokens) para que solo la app autorizada controle a Alma.

ESTADO: Este prototipo es cliente-side; para producción necesitas backend, autenticación, almacenamiento seguro de archivos (S3 o servidor) y revisión médica de contenidos.
*/