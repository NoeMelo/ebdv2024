let coloresPasteles = [
    "#FFD1DC", // Rosa pastel
    "#A2CFFE", // Azul pastel
    "#77DD77", // Verde pastel
    "#FDFD96", // Amarillo pastel
    "#B39EB5", // Lila pastel
    "#FFE5B4", // Melocotón pastel
    "#CFFFAF", // Menta pastel
    "#E6E6FA", // Lavanda pastel
    "#FFB347", // Albaricoque pastel
    "#FF7F50", // Coral pastel
    "#FFD1DC", // Rosa pastel
    "#A2CFFE", // Azul pastel
    "#77DD77", // Verde pastel
    "#FDFD96", // Amarillo pastel
    "#B39EB5", // Lila pastel
    "#FFE5B4", // Melocotón pastel
    "#CFFFAF", // Menta pastel
    "#E6E6FA", // Lavanda pastel
    "#FFB347", // Albaricoque pastel
    "#FF7F50"  // Coral pastel
];

let grupos = [
    {
        nombres: "Valientes de David",
        puntaje: 95,
        icon: "🕊️" // Paloma
    },
    {
        nombres: "Amigos de Daniel",
        puntaje: 88,
        icon: "🐋" // Ballena
    },
    {
        nombres: "Varones Galileos",
        puntaje: 92,
        icon: "🦁" // León
    },
    {
        nombres: "Amigos de Jesús",
        puntaje: 98,
        icon: "🦚" // Pavo real
    }
];

grupos.sort((a, b) => b.puntaje - a.puntaje);

let personas = [
    {
        nombres: "Grecia Oré",
        puntaje: 95,
        icon: "🦜" // Paloma
    },
    {
        nombres: "Josué Lovato",
        puntaje: 88,
        icon: "🦊" // Ballena
    },
    {
        nombres: "Gaby Rueda",
        puntaje: 92,
        icon: "🐹" // León
    },
    {
        nombres: "Tania Rios",
        puntaje: 98,
        icon: "🐱" // Pavo real
    },
    {
        nombres: "Noe Melo",
        puntaje: 100,
        icon: "🦖" // Cordero
    },
    {
        nombres: "Luis Vinces",
        puntaje: 100,
        icon: "🐻‍❄️" // Cordero
    }
];

personas.sort((a, b) => b.puntaje - a.puntaje);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ruleta {
    constructor(items, canvasId) {
        this.data = items;
        this.dibujo_id = canvasId;
        this.ruletaNames = this.getRuletaNames();
        this.dibujo = new Winwheel({
            'canvasId'     : this.dibujo_id,
            'numSegments'  : this.ruletaNames.length,     // Specify number of segments.
            'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
            'textFontSize' : 20,    // Set font size as desired.28
            'textAlignment' : 'outer',    // Set font size as desired.
            'textDirection'   : 'reversed',
            'textMargin'     : 15, 
            'segments'     : this.ruletaNames, // Define segments including colour and text.
            'animation'    :       // Specify the animation to use.
            {
                'type'     : 'spinToStop',
                'duration' : 5,     // Duration in seconds.
                'spins'    : 8,     // Number of complete spins.
                'callbackFinished' : this.alertPrize
            }
        });
        this.wheelSpinning = false;
    }

    // Método para obtener detalles del auto
    getRuletaNames() {
        let names = []
        this.data.forEach(element => {
            names.push({
                'fillStyle' : coloresPasteles[getRandomInt(0,coloresPasteles.length)],
                'text' : element.nombres
            });
        });
        return names;
    }

    startSpin(){
        // Ensure that spinning can't be clicked again while already running.
        if (this.wheelSpinning == false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            this.dibujo.animation.spins = 8;

            // Begin the spin animation by calling startAnimation on the wheel object.
            this.dibujo.startAnimation();

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            this.wheelSpinning = true;
        }
    }
    // Método para cambiar el año del auto
    alertPrize(indicatedSegment) {
        // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
        // alert("You have won " + indicatedSegment.text);
        Swal.fire({
        title: indicatedSegment.text,
        text: "¿Cuál es el reto?",
        icon: "success"
        });
    }
    
    resetWheel(){
        this.dibujo.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        this.dibujo.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        this.dibujo.draw();                // Call draw to render changes to the wheel.
        this.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    }
}

window.onload = function() {
    let ruletaGrupos = new Ruleta(grupos,'canvas_grupos');
    let ruletaParticipantes = new Ruleta(personas,'canvas_personas');
    document.getElementById("run-wheel-groups").addEventListener("click", function() {
        
        if (ruletaGrupos.wheelSpinning == false){
            ruletaGrupos.startSpin();
        }else{
            ruletaGrupos.resetWheel();
            ruletaGrupos.startSpin();
        }
    });
    document.getElementById("run-wheel-persons").addEventListener("click", function() {

        if (ruletaParticipantes.wheelSpinning == false){
            ruletaParticipantes.startSpin();
        }else{
            ruletaParticipantes.resetWheel();
            ruletaParticipantes.startSpin();
        }
    });
}