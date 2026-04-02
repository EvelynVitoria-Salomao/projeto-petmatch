import dogImage from "../assets/dog_fone_sem_fundo 1.png";

export default function Contact() {
  return (
    <section className="w-full bg-[#E5B300] px-5 py-4">
      <div className="mx-auto flex max-w-[900px] items-center justify-between gap-6">
        <div className="w-full max-w-[390px] rounded-[22px] bg-[#f3f3f3] px-6 py-5 shadow-sm">
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="nome:"
              className="h-[28px] w-full rounded-[6px] border border-[#F0872C] bg-transparent px-3 text-[12px] text-[#7a7a7a] outline-none placeholder:text-[#b07a50]"
            />

            <div className="flex gap-3">
              <input
                type="tel"
                placeholder="fone:"
                className="h-[28px] w-full rounded-[6px] border border-[#F0872C] bg-transparent px-3 text-[12px] text-[#7a7a7a] outline-none placeholder:text-[#b07a50]"
              />

              <input
                type="email"
                placeholder="e-mail:"
                className="h-[28px] w-full rounded-[6px] border border-[#F0872C] bg-transparent px-3 text-[12px] text-[#7a7a7a] outline-none placeholder:text-[#b07a50]"
              />
            </div>

            <textarea
              placeholder="mensagem:"
              rows={4}
              className="w-full resize-none rounded-[6px] border border-[#F0872C] bg-transparent px-3 py-2 text-[12px] text-[#7a7a7a] outline-none placeholder:text-[#b07a50]"
            />

            <div className="flex justify-center">
              <button
                type="button"
                className="h-[28px] min-w-[74px] rounded-full bg-[#2E617D] px-5 text-[11px] font-medium text-white transition hover:opacity-90"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <img
            src={dogImage}
            alt="Cachorro com telefone"
            className="w-[380px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}