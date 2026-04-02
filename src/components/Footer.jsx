import pawLogo from "../assets/patinha_fundo_verde 1.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2E617D] px-6 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={pawLogo} alt="Pet Match" className="h-[28px]" />
          <span className="text-[18px] font-semibold text-white">
            Pet Match
          </span>
        </div>

        {/* TEXTO CENTRAL */}
        <div className="text-[10px] font-semibold text-[#E5B300]">
          desenvolvido DevSquad 2025
        </div>

        {/* REDES SOCIAIS */}
        <div className="flex items-center gap-3 text-[#FF8A00]">
          
          {/* Instagram */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="1" />
          </svg>

          {/* YouTube */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.2-.9C15.6 5 12 5 12 5s-3.6 0-6.8.1c-.5.1-1.4.1-2.2.9C2.4 6.6 2.2 8 2.2 8S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 6.6.1 6.6.1s3.6 0 6.8-.1c.5-.1 1.4-.1 2.2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l5 2.5-5 2.5z" />
          </svg>

          {/* WhatsApp */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 3.5A11 11 0 003.3 17.4L2 22l4.8-1.2A11 11 0 1020 3.5zm-8 16a9 9 0 01-4.6-1.3l-.3-.2-2.8.7.7-2.7-.2-.3A9 9 0 1112 19.5zm4.8-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 .1-.2-.2-.3-.3-.6-.1-.2.2-.7.3-.9.1-.2-.2-1-1-1.9-2.1-.7-1-.8-1.4-.6-1.6.2-.2.3-.3.4-.5.1-.2.1-.3 0-.5 0-.1-.7-1.7-1-2.3-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3 1 2.6 1.1 2.8.1.2 2 3.1 5 4.3.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.2-.3-.3-.6-.4z" />
          </svg>

          {/* Email */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </div>
      </div>
    </footer>
  );
}