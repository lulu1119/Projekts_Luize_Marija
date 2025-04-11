  const jautajums = document.getElementById("jautajums");
  const radioGrupa = document.getElementById("radioGrupa");
  const poga = document.getElementById("poga");
  const jaIzvele = document.getElementById("jaIzvele");

    
 
    function updateDateTime(){
      const now = new Date();
      document.getElementById("dateTime").innerHTML = now.toLocaleString(); // formatē Date objektu kā datuma un laika virkni atbilstoši lietotāja reģiona iestatījumiem.
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

  
    //Funkcija, kas tiek izsaukta, kad lietotājs ievada vārdu
    document.getElementById("lietotajs").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const name = document.getElementById("lietotajs").value;
        if (name !== "") {
          jautajums.innerHTML = `${name}, vai gribi uzspēlēt atmiņas spēli?`;
          jautajums.style.display = "block"; // maina 'display' īpašību uz block, nodrošinot to, ka tiks parādīts jautājums
          radioGrupa.style.display = "block"; //pēc jautājuma parādīšanas, tiks parādītas radio pogas jā/nē. 
        }
      }
    });
  
 
    // Funkcija, kas tiek izsaukta, kad tiek atzīmēta radio poga "Jā"
    jaIzvele.addEventListener("change", function() {
      if (jaIzvele.checked) {  //pārbauda, vai radio poga "jā" ir atzīmēta
        poga.style.display = "inline-block"; //Kad radio poga "Jā" tiek izvēlēta, parādās "sākt spēli" poga.
      }
    });  



    // Funkcija "Nē" izvēlei, kas liek pārlādēt lapu
    document.getElementById("neIzvele").addEventListener("click", speletVelreiz);
    function speletVelreiz() {
      const apstiprinajums = confirm("Nāc spēlēt nākošreiz!");  
      if (apstiprinajums) {  // Ja lietotājs noklikšķina "OK"
        location.reload();   // Pārlādē lapu
      }
    }
    

 

// Funkcija, kas pārvirza uz spēles lapu
poga.addEventListener("click", function() {
  window.location.href = "game.html"; // Pāriet uz spēles lapu
});
