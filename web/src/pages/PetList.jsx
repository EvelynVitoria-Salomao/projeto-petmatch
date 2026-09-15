import { useState } from "react"
import ListaPet from "../components/ListaDePets"
import Header from "../components/Header"

function PetList(){
    const filtrosIniciais = { nomeOng: "", especie: "", porte: "", cidade: "" }
    const [filtros, setFiltros] = useState(filtrosIniciais)
    const [filtrosAplicados, setFiltrosAplicados] = useState(filtrosIniciais)

    function atualizaFiltro(campo, valor) {
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
    }

    function buscar() {
        setFiltrosAplicados(filtros)
    }

    return (
        <div className="bg-[#27607B]">

            <header className="bg-white h-20"> <Header/> </header>

            <h1 className="text-[30px] font-Poppins mt-[8%] flex text-center justify-center text-[#FF7A00] ">Encontre seu Pet</h1>

            <span className="flex flex-wrap  justify-center gap-4 mb-20 mt-[8%]  grid-cols-1">

                <input
                    className="rounded-4xl w-35 p-3 bg-white shadow-md border"
                    type="text"
                    placeholder="Ong"
                    value={filtros.nomeOng}
                    onChange={(e) => atualizaFiltro("nomeOng", e.target.value)}
                />

                <select
                    className="rounded-4xl p-3 bg-white shadow-md border"
                    value={filtros.especie}
                    onChange={(e) => atualizaFiltro("especie", e.target.value)}
                >
                    <option value="">Espécie</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outro">Outro</option>
                </select>

                <select
                    className="rounded-4xl p-3 bg-white shadow-md border"
                    value={filtros.porte}
                    onChange={(e) => atualizaFiltro("porte", e.target.value)}
                >
                    <option value="">Porte</option>
                    <option value="P">Pequeno</option>
                    <option value="M">Médio</option>
                    <option value="G">Grande</option>
                </select>

                <input
                    className="rounded-4xl w-35 p-3 bg-white shadow-md border"
                    type="text"
                    placeholder="Cidade"
                    value={filtros.cidade}
                    onChange={(e) => atualizaFiltro("cidade", e.target.value)}
                />

                <button
                    className="rounded-4xl p-3 bg-secondary shadow-md border text-white cursor-pointer"
                    onClick={buscar}
                >
                    Buscar
                </button>

                <button className="rounded-4xl p-3 bg-secondary shadow-md border text-white">Cadastrar Pet</button>
            </span>

            <div><ListaPet filtros={filtrosAplicados}/></div>

        </div>
    )
}

export default PetList
