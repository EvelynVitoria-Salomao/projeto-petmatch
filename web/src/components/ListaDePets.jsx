import React from "react"
import CardPet from "./PetCard"
import ModalPet from "./ModalPet"
import { apiUrl } from "../lib/environment"

const ListaPet = ({ filtros = {} }) => {
  const [listaPets, setListaPets] = React.useState([])
  const [carregando, setCarregando] = React.useState(true)
  const [petSelecionado, setPetSelecionado] = React.useState(null)

  React.useEffect(() => {
    async function buscaListaPets() {
      setCarregando(true)
      try {
        const params = new URLSearchParams()
        if (filtros.nomeOng) params.set("nomeOng", filtros.nomeOng)
        if (filtros.especie) params.set("especie", filtros.especie)
        if (filtros.porte) params.set("porte", filtros.porte)
        if (filtros.cidade) params.set("cidade", filtros.cidade)

        const response = await fetch(`${apiUrl}/api/pets?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
        const json = await response.json()
        setListaPets(json)
      } catch (e) {
        console.log(e)
      } finally {
        setCarregando(false)
      }
    }
    buscaListaPets()
  }, [filtros])

  async function buscaDetalhesPet(pet) {
    try {
      const response = await fetch(`${apiUrl}/api/pets/${pet.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      if (!response.ok) return null
      return await response.json()
    } catch (e) {
      console.log(e)
      return null
    }
  }

  function abrirWhatsapp(whatsapp) {
    const numero = whatsapp ? whatsapp.replace(/\D/g, "") : ""
    if (!numero) {
      alert("Esta ONG ainda não cadastrou um WhatsApp de contato.")
      return
    }
    window.open(`https://wa.me/${numero}`, "_blank")
  }

  async function handleSaibaMais(pet) {
    const detalhes = await buscaDetalhesPet(pet)
    if (detalhes) setPetSelecionado(detalhes)
  }

  async function handleAdotar(pet) {
    const detalhes = await buscaDetalhesPet(pet)
    abrirWhatsapp(detalhes?.ong?.whatsapp)
  }

  return (
    <section className="max-w-[100%]  bg-primary relative z-[5]">
        <div className="max-w-[95%] m-auto flex flex-col items-center">   
            <div className="max-w-[100%] mb-12">

                <ul className="max-w-[100%] grid grid-cols-[244px_244px_244px_244px] 
                max-xl:grid-cols-[244px_244px_244px] max-md:grid-cols-[244px_244px]
                max-sm:grid-cols-[244px]
                gap-12 items-center justify-items-center">
                    {listaPets.map((pet) =>
                        <CardPet
                          key={pet.id}
                          pet={pet}
                          onSaibaMais={handleSaibaMais}
                          onAdotar={handleAdotar}
                        />
                    )}
                </ul>

                {!carregando && listaPets.length === 0 && (
                  <p className="text-white text-center mt-10">
                    Nenhum pet encontrado com esses filtros.
                  </p>
                )}
            </div>        
        </div>

        {petSelecionado && (
          <ModalPet
            pet={petSelecionado}
            onClose={() => setPetSelecionado(null)}
            onAdotar={() => abrirWhatsapp(petSelecionado.ong?.whatsapp)}
          />
        )}
    </section>
  )
}

export default ListaPet
