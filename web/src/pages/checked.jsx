
import { useEffect } from 'react' 
import { useNavigate } from 'react-router-dom' 
import LogoTipo from "../assets/icons/Logo.svg"
import checked from "../assets/icons/checked.svg"

function Checked() {
    const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigate]);


    return(<>

    <div  className="flex justify-center mt-[10%]">
        <div className="rounded-2xl border-3 border-[#27607B] w-[507px] h-[454px] flex flex-col items-center justify-center">
            <img className=" w-[15rem] h-[15rem]  filter-[invert(31%)_sepia(53%)_saturate(576%)_hue-rotate(155deg)_brightness(94%)_contrast(89%)]" src={checked} alt="" />
            <h1 className="text-[30px] text-[#E5B300] font-['Poppins']">Concluido !</h1>
            <p>Voltando em 3 segundos...</p>
        </div>
    </div>
    </>)
}


export default Checked