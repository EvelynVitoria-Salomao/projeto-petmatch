import Header from "./Header";
import instagram from "../assets/icons/instagram.svg";
import email from "../assets/icons/email.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import youtube from "../assets/icons/youtube.svg";
import dog_pata_levantada from "../assets/img/dog_pata_levantada.png";
import Ossos from "../assets/img/Ossos.svg";
import Patinhas from "../assets/img/Patinhas.svg";



const HeroSection= ()=>{
    return(
        <section className="pt-[20px] sm:pt-[60px] h-[620px] sm:h-[760px] overflow-hidden">
            <Header/>
            {/**container do conteúdo em si */}
            <div className="m-auto w-[90%] sm:w-[75%] max-w-[1100px] flex justify-between"> 
                
                <div className="min-w-[0px] sm:min-w-[400px] flex flex-col">
                    <h1 className="text-[46px] text-secondary font-medium max-w-[18ch] 
                    sm:mt-[160px] mt-[80px] mb-[34px] sm:text-[40px] center">
                        Encontre um amigo para a vida inteira!
                    </h1>


                    <div className="w-[360px]">
                        <div className="flex justify-between mb-[20px]">
                            <a className="w-[150px] h-[40px] rounded-[31px] bg-accent 
                            text-[#FFFFFF] text-base flex items-center justify-center 
                            shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer">
                                Adote um Pet
                            </a>

                            <a className="w-[190px] h-[40px] rounded-[31px] bg-accent 
                            text-[#FFFFFF] text-base flex items-center justify-center 
                            shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer">
                                Cadastre um pet
                            </a>
                        </div>
                        
                        <div className="w-[200px] flex justify-between items-center self-center m-auto">
                            <a href="#">
                                <img className="md:w-[30px] md:h-[31px]" src={instagram} alt="icone instagram"/>
                            </a>
                            <a href="#">
                                <img className="md:w-[39px] md:h-[31px]" src={youtube} alt="icone youtube" />
                            </a>
                            <a href="#" className=" min-w-[34px]">
                                <img className="m-auto" src={whatsapp} alt="icone whatsapp" />
                            </a>
                            <a href="#">
                                <img className="md:w-[36px] md:h-[31px]" src={email} alt="icone email" />
                            </a>
                        </div>

                    </div>
                </div>

                {/* container img cachorro, patinhas e ossos */}
                <div className="flex relative min-w-[550px] hidden md:flex">
                    <span>
                        <img src={dog_pata_levantada} alt="" />
                    </span>

                    <div className="flex mt-[85px] absolute right-[-50px]">
                        <span>
                            <img src={Patinhas} alt="" />
                        </span>
                        
                        <span className="mt-[20px] absolute right-[-70px]"> 
                            <img src={Ossos} alt="" />
                        </span>
                    </div>
                </div>
            
            </div>
        </section>
    )
} 
export default HeroSection