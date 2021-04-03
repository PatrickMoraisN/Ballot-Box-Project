const seuVotoPara = document.querySelector('.d1-1 span');
const cargo = document.querySelector('.d1-2 span');
const descricao = document.querySelector('.d1-4')
const aviso = document.querySelector('.d2');
const lateral = document.querySelector('.d1-right');
const numeros = document.querySelector('.d1-3')
const botoes = document.querySelector('.teclado');


let etapaAtual = 0;
let numero = '';
let branco = false;

const comecarEtapa = () => {
  let etapa = etapas[etapaAtual];
  let numeroHtml = '';
  numero = '';
  branco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="num pisca"></div>';
    } else {
      numeroHtml += '<div class="num"></div>';
    }
  }
  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

const clicou = () => {
  botoes.addEventListener('click', (event) => {
    if (event.target.innerHTML !== 'corrige' && event.target.innerHTML !== 'branco' && event.target.innerHTML !== 'confirma') {
      let elNum = document.querySelector('.num.pisca');
      elNum.innerHTML = event.target.innerHTML;
      numero = `${numero}${event.target.innerHTML}`;
      elNum.classList.remove('pisca');
      if (elNum.nextElementSibling !== null) {
        elNum.nextElementSibling.classList.add('pisca')
      } else {
        atualizaInterface();
      }
    }
  })
}

const atualizaInterface = () => {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((cand) => cand.numero === numero ? true : false)

  if (candidato.length > 0) {
    candidato = candidato[0]
    seuVotoPara.style.display = 'block';
    descricao.innerHTML = `NOME : ${candidato.nome} <br> PARTIDO : ${candidato.partido}`;
    aviso.style.display = 'block';

    let fotosHtml = ''
    for (let i in candidato.fotos) {
      if(candidato.fotos[i].url.small){
        fotosHtml += `<div class="d1-image small"><img src="./images/${candidato.fotos[i].url}" alt="" >${candidato.fotos[i].legenda}</div>`;
      }else{
        fotosHtml += `<div class="d1-image"><img src="./images/${candidato.fotos[i].url}" alt="" >${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

const corrige = () => {
  document.querySelector('.corrige').addEventListener('click', () => comecarEtapa());
}

const brancoVoto = () => {
  document.querySelector('.branco').addEventListener('click', () => {
    if (numero === '') {
      branco = true;
      seuVotoPara.style.display = 'block';
      aviso.style.display = 'block';
      numeros.innerHTML = '';
      descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    }
  });
}

const confirmar = () => {
  document.querySelector('.confirma').addEventListener('click', () => {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (branco === true) {
      votoConfirmado = true;
    } else if (numero.length === etapa.numeros) {
      votoConfirmado = true;
    }

    if(votoConfirmado){
      etapaAtual++
      if(etapas[etapaAtual] !== undefined){
        comecarEtapa();
      } else {
        document.querySelector('.tela').innerHTML = '<div class="aviso-gigante">FIM</div>';
      }
    }
  })
}

window.onload = () => {
  clicou();
  comecarEtapa();
  corrige();
  brancoVoto();
  confirmar();
}