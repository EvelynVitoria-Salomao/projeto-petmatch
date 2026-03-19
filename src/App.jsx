import './App.css'
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black w-full overflow-x-hidden">
      
      {/* O conteúdo principal do site */}
      <main className="flex-grow flex items-center justify-center w-full">
        <h1 className="text-white text-4xl font-bold">Projeto funcionando 🚀</h1>
      </main>

      {/* O Footer agora está livre para ocupar a largura total */}
      <Footer />
      
    </div>
  )
}

export default App