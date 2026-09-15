import { X, MessageCircle } from "lucide-react";

function ModalPet({ pet, onClose, onAdotar }) {
  const { pet: dadosPet, ong } = pet;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#27607B] rounded-[10px] w-full max-w-3xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-5 flex items-center justify-center md:w-1/2">
          <img
            className="max-h-[320px] object-contain rounded-[10px] border border-[#27607BD9]"
            src={dadosPet.urlImagem}
            alt={dadosPet.nome}
          />
        </div>

        <div className="p-6 flex flex-col gap-3 text-white md:w-1/2 relative">
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold text-[#FF7A00]">{dadosPet.nome}</h2>
          <p><span className="font-semibold">ONG:</span> {ong.nomeFantasia}</p>
          <p><span className="font-semibold">Cidade:</span> {ong.cidade} - {ong.uf}</p>
          {dadosPet.descricao && (
            <p className="text-sm text-white/90">{dadosPet.descricao}</p>
          )}

          <button
            className="mt-4 flex items-center justify-center gap-2 bg-[#FF7A00] text-[#27607B]
            font-medium rounded-3xl py-3 px-4 shadow-[0px_3px_0px_1px_rgba(0,0,0,0.658)]
            cursor-pointer hover:brightness-95"
            onClick={onAdotar}
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPet;
