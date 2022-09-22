var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://img.icons8.com/sf-black-filled/ffffff/344/source-code.png",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/wired/ffffff/344/networking-manager.png",
        "carga" :   "1200"
    }
];

//Function para mostrar os cursos
const getCursos = () => {
    let holdCursos = [];

    cursos.forEach(item => {
        holdCursos.push(
            {
                nome: item.nome,
                sigla: item.sigla,
                icone: item.icone,
                carga: item.carga
            }
        )
    })

    return holdCursos;
}

module.exports = {
    getCursos,
}


