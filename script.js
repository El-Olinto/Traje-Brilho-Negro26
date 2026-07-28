const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const bar=$("#progressBar");
addEventListener("scroll",()=>{let p=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;bar.style.width=p+"%"});

const card=$("#hotcard"), title=$("#hotTitle"), text=$("#hotText"), principle=$("#hotPrinciple");
$$(".hotspot").forEach(b=>b.addEventListener("click",()=>{
  $$(".hotspot").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  title.textContent=b.dataset.title;text.textContent=b.dataset.text;principle.textContent=b.dataset.principle;
}));

const decon=$("#deconStage"), dnum=$("#deconNum"), dtitle=$("#deconTitle"), dtext=$("#deconText"), label=$("#deconLabel");
const steps=[
 ["A peça inteira","Começamos pelo conjunto. Azul escuro domina; vermelho e branco criam ritmo; os símbolos carregam identidade.","CAMISA"],
 ["Estampas","A arte é informação e identidade. O lobo frontal funciona como assinatura; o verso concentra a mensagem institucional.","ESTAMPAS"],
 ["Tecido / superfície","O que vemos é uma superfície com textura fina e brilho controlado. A superfície interfere na leitura da cor e da arte.","SUPERFÍCIE"],
 ["Mangas","As faixas laterais fazem a manga participar da composição. Repetição cria unidade entre os lados da peça.","MANGAS"],
 ["Gola + corpo","A gola discreta deixa o campo principal livre. O corpo oferece a área onde proporção, arte e material se encontram.","GOLA + CORPO"],
 ["Construção + proporção","Agora isolamos a ideia: uma camiseta é um sistema. Cada parte precisa conversar com as outras.","DECISÕES"]
];
let ds=0;
function updateDecon(){decon.className="decon-stage step-"+(ds+1);dnum.textContent=String(ds+1).padStart(2,"0");dtitle.textContent=steps[ds][0];dtext.textContent=steps[ds][1];label.textContent=steps[ds][2]}
$("#next").onclick=()=>{ds=(ds+1)%steps.length;updateDecon()};
$("#prev").onclick=()=>{ds=(ds-1+steps.length)%steps.length;updateDecon()};
$("#rebuild").onclick=()=>{ds=0;updateDecon();decon.scrollIntoView({behavior:"smooth",block:"center"})};

const insights={
 top:"Na referência, a assinatura frontal é pequena em relação ao corpo. Isso preserva espaço negativo e evita que a marca engula a silhueta.",
 center:"No centro, a arte ganha peso. É uma solução mais estável, mas pode reduzir a sensação de respiro do torso.",
 bottom:"Baixa, a arte se aproxima da barra e cria tensão. Pode funcionar, mas passa a competir com o fechamento vermelho."
};
$$(".pos").forEach(b=>b.onclick=()=>{$$(".pos").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#miniArt").dataset.pos=b.dataset.pos;$("#printInsight").textContent=insights[b.dataset.pos]});

$("#hue").addEventListener("input",e=>{
 const v=+e.target.value;
 $("#tint").style.filter=`hue-rotate(${v}deg)`;
 $("#colorNote").textContent=v===0?"Referência: azul profundo. A cor cria um campo visual estável para os acentos vermelhos.":v<0?"A base caminha para uma leitura mais violeta/fria: a percepção fica mais noturna e distante.":"A base caminha para uma leitura mais quente: o contraste com o vermelho diminui e a peça fica mais energética.";
});

$$(".answers button").forEach(b=>b.onclick=()=>{
 const r=$("#answerResult");r.classList.add("show");
 if(b.dataset.answer==="a") r.innerHTML="<b>Acertou.</b><br>Quando a arte cresce demais, ela reduz o espaço negativo e pode competir com a própria silhueta. O princípio aqui é <b>hierarquia + escala</b>.";
 else r.innerHTML="<b>Não é a melhor resposta.</b><br>Gola e temperatura cromática não mudam automaticamente porque a estampa aumentou. O efeito mais direto é sobre <b>escala, espaço negativo e hierarquia</b>.";
});

$("#soundBtn").onclick=()=>{const b=$("#soundBtn");b.textContent=b.textContent==="○"?"●":"○";};
