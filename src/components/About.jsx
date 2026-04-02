import catImage from "../assets/gato_sem-fundo 1.png";

export default function About() {
  return (
    <section className="w-full bg-[#f3f3f3] px-8 pt-5 pb-0">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="mb-2 ml-6 font-poppins text-[18px] font-bold text-[#2E617D]">
          Sobre:
        </h2>

        <div className="flex items-end justify-between gap-10">
          <div className="flex flex-1 ml-15 ">
            <img
              src={catImage}
              alt="Gato"
              className="w-[320px] object-contain"
            />
          </div>

          <div className="mr-4 mb-4 mr-25 w-full max-w-[460px] rounded-[38px] bg-[#F0872C] px-8 py-5  text-white">
            <p className="font-poppins text-[14px] leading-[1.45] font-medium">
              Somos uma ONG sem fins lucrativos dedicada a transformar a vida de
              animais que precisam de um novo começo.
            </p>

            <p className="mt-1 font-poppins text-[14px] leading-[1.45] font-medium">
              Nosso propósito é conectar pets resgatados a pessoas dispostas a
              oferecer amor, cuidado e um lar seguro.
            </p>

            <p className="mt-1 font-poppins text-[14px] leading-[1.45] font-medium">
              Acreditamos que todo animal merece uma segunda chance. Por isso,
              trabalhamos para facilitar o processo de adoção responsável,
              aproximando tutores e pets de forma simples, segura e cheia de
              carinho.
            </p>

            <p className="mt-1 font-poppins text-[14px] leading-[1.45] font-medium">
              Adotar é um ato de amor — e juntos podemos mudar muitas vidas.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
}