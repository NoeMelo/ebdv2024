
/**********************
 * Google Sheets
 *********************/
let ruletaParticipantes;
const sheetDataHandler_participantes = (sheetData) => {

    sheetData.sort((a, b) => b.puntos - a.puntos);
    ruletaParticipantes = new Ruleta(sheetData,'canvas_personas');
    // leaderboards
    let lb_asistentes = document.getElementById("leaderboard_asistentes");
    load_items_grupos(sheetData, lb_asistentes);
    //console.log(sheetData);
  };

let ruletaGrupos;
const sheetDataHandler_grupos = (sheetData) => {

    sheetData.sort((a, b) => b.puntos - a.puntos);
    ruletaGrupos = new Ruleta(sheetData,'canvas_grupos');
    // leaderboards
    let lb_grupos = document.getElementById("leaderboard_grupos");
    load_items_grupos(sheetData, lb_grupos);
    //console.log(sheetData);
  };
/**********************
 * HTML painters 
 *********************/

let load_items_participantes = (data, htmltag) =>{
    let content = '';
    var counter = 0;
    data.forEach(element => {
        var position = "";
        if (counter == 0){
            position = "🥇";
        }
        if(counter == 1){
            position = "🥈";
        }
        if(counter == 2){
            position = "🥉";
        }
        content +=`
        <div class="row item">
                    <div class="col-1 text-center mx-2"><p class="item-icon">${element.icon}</p></div>
                    <div class="col-7"><p class="item-name">${element.nombre} ${element.apellidos}</p></div>
                    <div class="col text-end"><p class="item-score">${position} ${element.puntos}</p></div>
        </div>
        `;
        counter +=1;
    });
    htmltag.innerHTML = content;
}
let load_items_grupos = (data, htmltag) =>{
    let content = '';
    var counter = 0;
    data.forEach(element => {
        var position = "";
        if (counter == 0){
            position = "🥇";
        }
        if(counter == 1){
            position = "🥈";
        }
        if(counter == 2){
            position = "🥉";
        }
        content +=`
        <div class="row item">
                    <div class="col-1 text-center mx-2"><p class="item-icon">${element.icon}</p></div>
                    <div class="col-7"><p class="item-name">${element.nombre}</p></div>
                    <div class="col text-end"><p class="item-score">${position} ${element.puntos}</p></div>
        </div>
        `;
        counter +=1;
    });
    htmltag.innerHTML = content;
}
/**********************
 * Onload 
 *********************/

window.onload = function() {
    // download data of spreadsheet
    getSheetData({
        sheetID: "1kLUdjEbjDm_RWo-ATNdTH2fVhWGoQgkYflyg4cMRsSc",
        sheetName: "asistentes",
        query: 'SELECT * WHERE C <> ""',
        callback: sheetDataHandler_participantes,
      });
      getSheetData({
        sheetID: "1kLUdjEbjDm_RWo-ATNdTH2fVhWGoQgkYflyg4cMRsSc",
        sheetName: "grupos",
        query: "",
        callback: sheetDataHandler_grupos,
      });

    // ruleta
    document.getElementById("canvas_grupos").addEventListener("click", function() {
        
        if (ruletaGrupos.wheelSpinning == false){
            ruletaGrupos.startSpin();
        }else{
            ruletaGrupos.resetWheel();
            ruletaGrupos.startSpin();
        }
    });
    document.getElementById("canvas_personas").addEventListener("click", function() {

        if (ruletaParticipantes.wheelSpinning == false){
            ruletaParticipantes.startSpin();
        }else{
            ruletaParticipantes.resetWheel();
            ruletaParticipantes.startSpin();
        }
    });
}

/* var grupos = [
    {
        nombres: "Valientes de David",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🕊️" // Paloma
    },
    {
        nombres: "Amigos de Daniel",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🐋" // Ballena
    },
    {
        nombres: "Varones Galileos",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🦁" // León
    },
    {
        nombres: "Amigos de Jesús",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🦚" // Pavo real
    }
];

grupos.sort((a, b) => b.puntaje - a.puntaje);

let participantes = [
    {
        nombres: "Grecia Oré",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🦜" // Paloma
    },
    {
        nombres: "Josué Lovato",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🦊" // Ballena
    },
    {
        nombres: "Gaby Rueda",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🐹" // León
    },
    {
        nombres: "Tania Rios",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🐱" // Pavo real
    },
    {
        nombres: "Noe Melo",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🦖" // Cordero
    },
    {
        nombres: "Luis Vinces",
        puntaje: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
        icon: "🐻‍❄️" // Cordero
    }
]; */
