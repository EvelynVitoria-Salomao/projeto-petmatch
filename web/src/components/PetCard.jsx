
const CardPet =  ({img, nome, localizacao}) => {

function saibaMais(){
  // deve buscar as infos do pet, incluir isso no modal e abri-lo
}

function adotar(){

}

  return (
    <li className="w-[244px] h-[330px] rounded-3xl bg-white 
    shadow-[6px_4px_2px_0px_rgba(30,30,30,0.2)]">
       <div className="max-w-[80%] m-auto mb-2.5">
            <img className="max-w-full block" src={img} alt={nome}></img>
       </div>

       <div className="h-11 px-7 mb-3">
            <h3 className="text-xl font-bold text-secondary font-poppins">{nome}</h3>
            <p className="text-sm text-accent font-poppins">{localizacao}</p>
       </div>

        <div className="px-7  flex justify-between items-center">
            <button 
              className="text-xs font-medium bg-accent text-white 
              font-poppins px-2 py-2 rounded-2xl shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)]
              cursor-pointer" 
              onClick={saibaMais}>
                Conheça +
            </button>
            <button 
              className="text-xs font-medium bg-secondary text-white
               font-poppins px-4 py-2 rounded-2xl shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)]
               cursor-pointer" 
              onClick={adotar}>
                Adotar +
            </button>
        </div>
    </li>
  )
}

export default CardPet