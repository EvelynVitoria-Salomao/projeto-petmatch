import React from "react"
import LogoTipo from "../assets/icons/Logo.svg"
import SvgSetaLogIn from "./SvgSetaLogIn.jsx"

const Header = ()=>{
    const [mostraOps, setMostraOps] = React.useState(false)

    function mostraMaisOpcoes(){
        setMostraOps((prev)=>!prev)
        console.log(mostraOps)
    }

    return(
        <header className="flex justify-between items-center m-auto h-[70px] max-w-[95%] 
        lg:max-w-[80%]">
            <img src={LogoTipo} alt="logotipo" className="h-[40px] sm:h-[58px] lg:h-[62px]"/>

            <div className="flex items-center relative">
                <a className={`text-primary font-medium  cursor-pointer text-lg md:inline-block 
                md:mr-[20px] ${mostraOps ? 'inline-block absolute top-[70px] right-[40px] mr-[0px]'
                : 'hidden'}`}>
                    Cadastrar ONG
                </a>
               
                <a className="flex justify-center items-center bg-secondary text-[#FFFFFF] 
                text-lg w-[100px] h-[46px] rounded-[40px] shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] 
                cursor-pointer sm:w-[110px] md:w-[130px] md:h-[40px]">
                    Login 
                    <SvgSetaLogIn/>
                </a>

                <button className="w-[80px] h-[46px] bg-[#ededed] rounded-[10px] ml-[14px]
                text-[#404040] shadow-[3px_4px_4px_0px_rgba(0,0,0,0.10)] cursor-pointer 
                md:hidden" onClick={mostraMaisOpcoes}>
                    {!mostraOps ? 'Mais':'X'}
                </button>
            </div>
        </header>
    )
} 
export default Header