import { Link } from 'react-router-dom'
import LogoTipo from "../assets/icons/Logo.svg"
import { useNavigate } from 'react-router-dom';

function NewPassword() {


    const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault(); // Evita o recarregamento da página
            // Aqui depois você coloca a lógica de enviar para o back-end...
            
            navigate('/Login/checked'); // Redireciona via código
        };



    return (
        <>
       
            <form onSubmit={handleSubmit} className="flex justify-center mt-10 md:mt-[10%] px-4 w-full">
                
          
                <div className="rounded-2xl border-3 border-[#27607B] w-full max-w-[507px] min-h-[454px] flex flex-col items-center justify-center p-6 md:p-8 bg-white box-border">
                    
                    <img src={LogoTipo} alt="Logo" className="w-54 h-24 object-contain mb-4" />
                    
                    <h1 className="text-[#27607B] text-xl md:text-[25px] font-['Poppins'] text-center font-semibold mb-6">
                        Criar Nova Senha
                    </h1>
               
                    <input 
                        className="border-[1.5px] border-[#27607B] rounded-2xl w-full max-w-[420px] h-[40px] mb-4 pl-[15px] outline-none" 
                        type="password" 
                        placeholder='Nova senha' 
                    />
                    
                    <input 
                        className="border-[1.5px] border-[#27607B] rounded-2xl w-full max-w-[420px] h-[40px] mb-6 pl-[15px] outline-none" 
                        type="password" 
                        placeholder='Repita sua senha' 
                    />
                  
                   
                   
                        <button 
                            type="submit"
                            className="font-['Poppins'] border border-[#27607B] bg-[#E5B300] text-white rounded-2xl w-full h-[45px] mb-6 text-[20px] cursor-pointer hover:brightness-105 transition-all"
                        >
                            Enviar
                        </button>
               
                    
                    <Link className="text-[#27607B] text-[18px] font-['Poppins'] cursor-pointer hover:underline" to="/Login">
                        Voltar
                    </Link>
                    
                </div>
            </form>
        </>
    )
}

export default NewPassword