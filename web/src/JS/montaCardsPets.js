export default function montaCardsPets(dados){
    const ulListaPets = document.querySelector('.lista-pets');

    dados.forEach((item)=>{
        ulListaPets.innerHTML+=
        `
        <li class="card-pet" data-id='${item.id}'>
            <div class="container-img">
                <img class="imgPet" src="${item.img}" alt="Foto do pet">
            </div>
            <div class="container-textos">
                <h2>${item.nome}</h2>
                <p>${item.idade} anos</p>
                <p>${item.raca} <span>- ${item.porte}</span></p>
            </div>
            
            <button>Ver mais</button>
        </li> 
        `
    })
}