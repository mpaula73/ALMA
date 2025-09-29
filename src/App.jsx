import almaFace from './images/alma-face.jpg';
import almaEgg from './images/alma-egg.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pantallas adicionales
function Informacion() {
  return <div className="p-6 text-center text-pink-600">ℹ Aquí encontrarás información útil sobre tu embarazo.</div>;
}

function Calendario() {
  return <div className="p-6 text-center text-pink-600">📅 Aquí podrás ver tu calendario de citas y recordatorios.</div>;
}

function Historial() {
  return <div className="p-6 text-center text-pink-600">📋 Aquí estará tu historial clínico.</div>;
}

function Ejercitarse() {
  return <div className="p-6 text-center text-pink-600">🏃 Videos y rutinas de ejercicio para embarazadas.</div>;
}

function Nutricion() {
  return <div className="p-6 text-center text-pink-600">🥗 Consejos y dietas para tu nutrición.</div>;
}

function ConectarAlma() {
  return (
    <div className="p-6 text-center text-pink-600">
      🤖 Aquí te explicamos cómo conectar con <b>Alma (Alexa)</b>.  
      <br />
      👉 Ve a la app de Alexa en tu celular y activa la skill de Alma.  
    </div>
  );
}

// Pantalla principal con iconos
function Home() {
  const rosaTexto = { color: "#E34F92" };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col font-sans text-lg">
      {/* 🔍 Barra de búsqueda */}
      <header className="p-4">
        <div className="flex items-center bg-pink-200 rounded-full px-3 py-2 shadow">
          <span className="text-black text-lg mr-2">🔍</span>
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-pink-200 w-full outline-none placeholder-black text-black"
          />
        </div>
      </header>

      {/* Imagen cara de Alma */}
      <div className="flex justify-center">
        <div className="w-56 h-32 bg-pink-200 flex items-center justify-center rounded-lg shadow">
          <img src={almaFace} alt="Alma Face" className="object-contain max-h-full" />
        </div>
      </div>

      {/* Para ti */}
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-2" style={rosaTexto}>
          Para ti
        </h2>
        <hr className="border-pink-300 mb-6" />

        {/* Grid de cuadros */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
          {/* Información */}
          <Link to="/informacion">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src="https://www.vidaysalud.com/wp-content/uploads/iStock_000004701536XSmall_isabelle-Limbach-1200x824.jpg"
                  alt="Información"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Información
              </p>
            </div>
          </Link>

          {/* Calendario */}
          <Link to="/calendario">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src="https://img.freepik.com/vector-premium/icono-calendario-31-dias-dias-semana-ilustracion-vectorial-rosa_292645-213.jpg"
                  alt="Calendario"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Calendario
              </p>
            </div>
          </Link>

          {/* Historial */}
          <Link to="/historial">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/558/558161.png"
                  alt="Historial"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Historial Clínico
              </p>
            </div>
          </Link>

          {/* Ejercitarse */}
          <Link to="/ejercitarse">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src="https://www.shutterstock.com/image-vector/vector-illustration-pregnant-woman-doing-260nw-2455810905.jpg"
                  alt="Ejercitarse"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Ejercitarse
              </p>
            </div>
          </Link>

          {/* Nutrición */}
          <Link to="/nutricion">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src="https://img.freepik.com/vector-premium/mujer-embarazada_681458-250.jpg"
                  alt="Nutrición"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Nutrición
              </p>
            </div>
          </Link>

          {/* Conectar a Alma */}
          <Link to="/conectar-alma">
            <div>
              <div className="bg-white rounded-xl border-4 border-pink-300 flex items-center justify-center shadow-sm w-24 h-24 mx-auto hover:shadow-md">
                <img
                  src={almaEgg}
                  alt="Alma"
                  className="w-12 h-12"
                />
              </div>
              <p className="mt-2" style={rosaTexto}>
                Conectar a Alma
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Barra inferior */}
      <footer className="fixed bottom-0 w-full bg-white border-t-2 border-pink-300 shadow-md py-2">
        <div className="flex justify-around">
          <Link to="/">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946433.png"
                alt="Inicio"
                className="w-6 h-6"
              />
              <span className="text-xs" style={rosaTexto}>Inicio</span>
            </div>
          </Link>

          <Link to="/calendario">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt="Calendario"
                className="w-6 h-6"
              />
              <span className="text-xs" style={rosaTexto}>Calendario</span>
            </div>
          </Link>

          <Link to="/informacion">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3097/3097144.png"
                alt="Info"
                className="w-6 h-6"
              />
              <span className="text-xs" style={rosaTexto}>Info</span>
            </div>
          </Link>

          <Link to="/conectar-alma">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt="Alma"
                className="w-6 h-6"
              />
              <span className="text-xs" style={rosaTexto}>Alma</span>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}

// App principal con Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/ejercitarse" element={<Ejercitarse />} />
        <Route path="/nutricion" element={<Nutricion />} />
        <Route path="/conectar-alma" element={<ConectarAlma />} />
      </Routes>
    </Router>
  );
}