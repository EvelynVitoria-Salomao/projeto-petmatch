import React from "react"
import CardPet from "./PetCard"
// importar aqui o useNavigate do React router dom
import { useNavigate } from "react-router-dom"


const dadosTestPets = [
    {
        id:1,
        img:'/src/assets/img/pet-teste.jpg',
        nome:'Bob',
        localizacao:'São Paulo - SP'    
    },
    {
        id:2,
        img:'/src/assets/img/pet-teste.jpg',
        nome:'Bob',
        localizacao:'São Paulo - SP'    
    },
    {
        id:3,
        img:'/src/assets/img/pet-teste.jpg',
        nome:'Bob',
        localizacao:'São Paulo - SP'    
    },
    {
        id:4,
        img:'/src/assets/img/pet-teste.jpg',
        nome:'Bob',
        localizacao:'São Paulo - SP'    
    },
    {
        id:5,
        img:'/src/assets/img/pet-teste.jpg',
        nome:'Bob',
        localizacao:'São Paulo - SP'    
    },
]

const PreviewPetList =  () => {
const [listaPets, setListaPets] = React.useState([])
//hook useNavigate do React router dom para navegação
const navigate = useNavigate()

React.useEffect(()=>{

    async function buscaListaPets(){
        // aqui viria requisição e o set seria com os dados retornados
        setListaPets(dadosTestPets)
    } 
    buscaListaPets()
},[])


  return (
    <section className="max-w-[100%] bg-primary relative z-[5]">
        <div className="max-w-[95%] m-auto flex flex-col items-center">   
            <div className="max-w-[100%] mb-12">
                <h2 className="self-start text-3xl font-poppins text-secondary 
                font-medium pt-10 pb-6">
                    Escolha seu pet :
                </h2>
            
                <ul className="max-w-[100%] grid grid-cols-[244px_244px_244px_244px] 
                max-xl:grid-cols-[244px_244px_244px] max-md:grid-cols-[244px_244px]
                max-sm:grid-cols-[244px]
                gap-12 items-center justify-items-center">
                    {listaPets.length > 0 && listaPets.map((pet)=>
                        <CardPet key={pet.id}
                        img={pet.img}
                        nome={pet.nome}
                        localizacao={pet.localizacao}
                        />
                    )}
                    
                </ul>
            </div>        
            
            {/* button deve ser substituido por <Link to="/rota">Ver todos </Link> do React Router Dom*/}
            <button className="block mb-7 px-5 py-2 bg-secondary 
            text-white font-poppins font-medium rounded-3xl 
            shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer" 
            onClick={()=> navigate('/PetList')} >
                Ver todos
            </button>
        </div>
    </section>
  )
}

export default PreviewPetList