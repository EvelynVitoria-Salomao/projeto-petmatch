export enum EspecieEnum {
	Cachorro = "Cachorro",
	Gato = "Gato",
	Outro = "Outro",
}

export enum SexoEnum {
	M = "M",
	F = "F",
}

export enum PorteEnum {
	P = "P",
	M = "M",
	G = "G",
}

export type PetQueryParams = {
	especie?: EspecieEnum;
	sexo?: SexoEnum;
	porte?: PorteEnum;
	cidade?: string;
	nomeOng?: string;
};

export type PetRequest = {
	nome: string;
	especie: EspecieEnum;
	raca: string;
	sexo: SexoEnum;
	porte: PorteEnum;
	dataNascimento: Date;
	descricao: string;
	urlImagem: string;
};
