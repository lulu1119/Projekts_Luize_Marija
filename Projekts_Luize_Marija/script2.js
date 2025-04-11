const bildes = [
  { image: "puke.jpg" },
  { image: "puke2.jpg" },
  { image: "puke3.jpg" },
  { image: "puke4.jpg" },
  { image: "puke5.jpg" },
  { image: "puke6.jpg" }
];


const kartinas = bildes.concat(bildes); //Dubulto masīvu

//Fisher-Yates shuffle funkcija, kas sajauc kartīšu masīvu
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));  //Nejauša indeksa izvēle no atlikušā elementu skaita
    [array[i], array[j]] = [array[j], array[i]]; //Apmaina elementus masīvā, lai sajauktu kartītes
  }
  return array;
}



let pirmaKartina = null;
let otraKartina = null;
let kartinuBlokesana = false;  //Kartīšu bloķēšana, lai nepieļautu vairāk nekā divu kartīšu apgriešanu vienlaicīgi
let pagriezieni = 0;
let pari = 0;
let laiks = 0;
let interval;


const laukums = document.getElementById("spelesLauks");
const laikaParadisana = document.getElementById("laiks");
const apgriesanasSkaits = document.getElementById("pagriezieni");


//Funkcija spēles sākšanai
function sakums() {
  clearInterval(interval); //pārtrauc iepriekšējo laika skaitītāju
  laiks = 0;  //Sākotnējais laiks
  pagriezieni = 0;
  pari = 0; 
  laikaParadisana.innerHTML = laiks;  //Atjaunina laiku spēles sākumā
  apgriesanasSkaits.innerHTML = pagriezieni;
  laukums.innerHTML = "";  //Iztīra spēles laukumu, noņemot visas iepriekšējās kartinas pirms jaunas spēles.


// Sajauc kartītes
  const shuffled = shuffle(kartinas); 

// Pievieno kartītes spēles laukumā
  for (let i = 0; i < shuffled.length; i++) {
    const image = shuffled[i].image;
    const card = document.createElement("div");  //Jauna div elementa izveidošana katrai kartītei
    card.classList.add("card"); //Pievieno CSS klasi kartītei
    card.dataset.image = image;  //Saglabā attēla nosaukumu datu atribūtā
    
  
    const frontFace = document.createElement("img");  //Attēls priekšpusē
    frontFace.src = image;  //Attēla avots
    frontFace.classList.add("front");   //CSS klase priekšpusei

  
    const backFace = document.createElement("div"); ; //Aizmugurei pievieno div elementu
    backFace.classList.add("back"); // CSS klase aizmugurei
  
    card.appendChild(frontFace);  //Pievieno priekšpusi kartītei
    card.appendChild(backFace); //Pievieno aizmuguri kartītei
    card.addEventListener("click", griesana); //Pievieno klikšķa notikumu katrai kartītei
    laukums.appendChild(card); //Pievieno kartīti spēles laukumā
  }
  

  interval = setInterval(() => {
    laiks++;
    laikaParadisana.innerHTML = laiks;
  }, 1000);
}



//Funkcija, kas tiek izsaukta, kad lietotājs noklikšķina uz kartītes
function griesana() {
  if (kartinuBlokesana) {
    return; //Ja ir aktivizēta kartīšu bloķēšana, tad neļauj pagriezt karti
  }

  if (this.classList.contains("flipped")) {
    return; //Ja karte jau ir pagriezta, tad neļauj veikt otro pagriešanu
  }

  this.classList.add("flipped"); // Pagriež kartīti
  pagriezieni++;
  apgriesanasSkaits.innerHTML = pagriezieni;


  //Ja tas ir pirmais pagrieziens
  if (!pirmaKartina) {
    pirmaKartina = this;  //Saglabā pirmo pagrieztu kartīti
    return;
  }

   //Ja ir pagriezta otrā kartīte
  otraKartina = this;
  parbaude(); //Salīdzina abas kartītes
}


//Funkcija, lai salīdzinātu divas pagrieztās kartītes
function parbaude() {
  if (pirmaKartina.dataset.image === otraKartina.dataset.image) {
    pari += 2;
    apgrieztVelreiz();

    if (pari === kartinas.length) {    //Ja visi pāri ir atrasti
      clearInterval(interval);
      setTimeout(() => {
        alert(`Apsveicam! 🎉\n\nLaiks: ${laiks} s\nPagriezienu skaits: ${pagriezieni}\n\nSāc jaunu spēli, nospiežot "Spēlēt atkārtoti"!`);
      }, 300);
    }



  } else {
    kartinuBlokesana = true;  //Bloķē iespēju pagriezt citas kartītes
    setTimeout(() => {
      pirmaKartina.classList.remove("flipped");  //Atgriež kartītes uz sākotnējo stāvokli, ja tās nesakrīt
      otraKartina.classList.remove("flipped");
      apgrieztVelreiz();
    }, 1000);
  }
}


//Funkcija, lai atjaunotu sākotnējo stāvokli pēc katras pārbaudes
function apgrieztVelreiz() {
  [pirmaKartina, otraKartina] = [null, null];  //Notīra saglabātās kartītes
  kartinuBlokesana = false;   //Atļauj turpmāko pagriešanu
}

document.getElementById("restart").addEventListener("click", sakums);
sakums(); 
