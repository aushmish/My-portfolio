const playingSounds = {};

document.querySelectorAll(".clickable").forEach(icon => {

  icon.addEventListener("click", () => {

    const baseName = icon.dataset.sound;

    const mp3 = "audio/" + baseName + ".mp3";
    const ogg = "audio/" + baseName + ".ogg";

    const stopSound = () => {
      playingSounds[baseName].pause();
      playingSounds[baseName].currentTime = 0;
      delete playingSounds[baseName];
      icon.classList.remove("active");
    };

    if (playingSounds[baseName]) {
      stopSound();
      return;
    }

    const audio = new Audio();
    audio.src = mp3;

    audio.onerror = () => {
      audio.src = ogg;
      audio.onerror = null;
      audio.play().catch(err => console.log(err));
    };

    playingSounds[baseName] = audio;

    audio.play().catch(err => console.log(err));
    icon.classList.add("active");

    audio.onended = () => {
      stopSound();
    };
  });

});