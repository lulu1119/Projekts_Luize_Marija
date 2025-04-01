function poga (){
    info.innerHTML = ievade.value;
    

}

const poguSkaits = document.querySelectorAll(".drum").length

//cikls,kas iterē cauri visām pogām
for (let i = 0; i < poguSkaits; i++){

//funkcija, kas iedarbina skaņu, nospiežot pogu ar peli
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        //const audio = new Audio('sounds/tom-1.mp3');
        //audio.play();
        //console.log(this.innerHTML)
        let poga = this.innerHTML
        atskano(poga)
        pogasAnimacija(poga)
       
    })
}

//funkcija, kas iedarbina skaņu, nospiežot attiecīgo taustiņu
document.addEventListener("keydown", function(event){
    atskano(event.key)
    pogasAnimacija(event.key)
})



//funkcija, kas atskaņo skaņas
function atskano(key){
    switch (key) {
        case "w":
            const crash = new Audio('sounds/crash.mp3');
            crash.play();
            break;

        case "a":
            const kick = new Audio('sounds/kick-bass.mp3');
            kick.play();
            break;

        case "s":
            const snare = new Audio('sounds/snare.mp3');
            snare.play();
            break;

        case "d":
            const tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;

        case "j":
            const tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play();
            break;


        case "k":
            const tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play();
            break;


        case "l":
            const tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play();
            break;





        default: console.log()

    }
}
