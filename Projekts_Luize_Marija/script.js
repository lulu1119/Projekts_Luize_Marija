document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById("userName");
    const question = document.getElementById("question");
    const radioGroup = document.getElementById("radioGroup");
    const startButton = document.getElementById("startButton");
    const dateTime = document.getElementById("dateTime");

    // Rāda datumu un laiku
    const now = new Date();
    dateTime.textContent = now.toLocaleString("lv-LV");

    // Kad tiek ievadīts vārds
    userNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const name = userNameInput.value.trim();
            if (name !== "") {
                question.textContent = `${name}, vai gribi uzspēlēt atmiņas spēli?`;
                question.style.display = "block";
                radioGroup.style.display = "block";
            }
        }
    });
    // Parāda pogu, ja izvēlēts "Jā"
    radioGroup.addEventListener("change", () => {
        const choice = document.querySelector('input[name="choice"]:checked').value;
        startButton.style.display = choice === "yes" ? "inline-block" : "none";
    });

    // Spēles sākšana
    window.saktSpeli = () => {
        const choice = document.querySelector('input[name="choice"]:checked').value;
        if (choice === "yes") {
            // Pāriet uz spēles lapu
            window.location.href = "game.html";
        }
    };
});
