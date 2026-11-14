//  ==========================
//  Gestione ingredienti fuori viewport
//  ==========================


// Funzione per verificare se un elemento è completamente visibile nel viewport
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
// Funzione per gestire l'aggiunta della classe al div "ingredienti_button"
function handleVisibility() {
    var ingredientiDiv = document.querySelector('.mainIngredienti');
    var ingredientiButtonDiv = document.querySelector('.ingredientiButton');

    if (isElementInViewport(ingredientiDiv)) {
        // L'elemento ".ingredienti" è visibile nel viewport
        ingredientiButtonDiv.classList.remove('show'); // Rimuovi la classe se presente
    } else {
        // L'elemento ".ingredienti" non è completamente visibile nel viewport
        ingredientiButtonDiv.classList.add('show'); // Aggiungi la classe
    }
}
  
// Aggiungi un listener per gestire l'evento di scorrimento della pagina
window.addEventListener('scroll', handleVisibility);
  
// Chiamata iniziale per gestire la visibilità quando la pagina viene caricata
handleVisibility();

function updateIconContainerHeight() {
    const iconContainer = document.getElementById('brxe-swbtte');
    const icons = document.querySelectorAll('.ingredientiButton.show');
    const iconHeight = icons.length > 0 ? icons[0].offsetHeight : 0;
    const newHeight = icons.length * iconHeight;
    iconContainer.style.height = 48 + newHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function () {
    updateIconContainerHeight();

    // Aggiungi l'evento di ridimensionamento al cambio di visibilità delle icone
    const iconElements = document.querySelectorAll('.ingredientiButton');
    iconElements.forEach(function (icon) {
        icon.addEventListener('transitionstart', updateIconContainerHeight);
    });
});

//  ==========================
//  Gestione awake
//  ==========================

document.addEventListener('DOMContentLoaded', function () {
    let wakelock = null;
  
    const offButton = document.querySelector('.off');
    const onButton = document.querySelector('.on');
    const statusDiv = document.querySelector('.status');
  
    offButton.addEventListener('click', () => {
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then((lock) => {
                console.log('Schermo attivo!');
                wakelock = lock;
                console.log(wakelock.released);
                offButton.style.display = 'none';
                onButton.style.display = 'block';
                offButton.dataset.status = 'on';
                updateStatus(true);
            }).catch((error) => {
                console.error('Impossibile attivare lo schermo:', error);
            });
        } else {
            const interval = setInterval( function(){
                window.screen.orientation.lock('portrait');
                window.screen.orientation.unlock();
                }
            , 10000);
        }
    });
  
    onButton.addEventListener('click', () => {
        if (wakelock) {
            wakelock.release();
            console.log(wakelock.released);
            wakelock = null;
            offButton.style.display = 'block';
            onButton.style.display = 'none';
            offButton.dataset.status = 'off';
            updateStatus(false);
        } else {
            clearInterval(interval);
        }
    });

    document.addEventListener("visibilitychange", async () => {
        //console.log(wakelock.released);
        if (wakelock !== null && document.visibilityState === "visible" && offButton.dataset.status === "on") {
            wakelock = await navigator.wakeLock.request("screen");
        //console.log(wakelock.released);
        }
    });
  
    function updateStatus(isActive) {
        statusDiv.textContent = isActive ? 'On' : 'Off';
    }
});
  
//  ==========================
//  Gradient headline Safari optimization
//  ==========================

document.addEventListener('DOMContentLoaded', function () {
    let heading = document.querySelector('.gradient-headline');
    heading.style.webkitBackgroundClip = 'text';
    heading.style.animation = 'none';
    setTimeout(() => {
        heading.style.animation = '';
    }, 0);
});
