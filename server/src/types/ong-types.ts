export type OngRequest = {
	cnpj: string;
	razaoSocial: string;
	nomeFantasia: string;
	telefone: string;
	whatsapp: string;
	email: string;
	site?: string;
	instagram: string;
	urlImagem: string;
	cep: string;
	uf: string;
	cidade: string;
	bairro: string;
	logradouro: string;
	numero: number;
};

export type OngQueryParams = {
	cnpj?: string;
	razaoSocial?: string;
	nomeFantasia?: string;
	telefone?: string;
	whatsapp?: string;
	email?: string;
	site?: string;
};