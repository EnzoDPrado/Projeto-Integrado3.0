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

//Function para mostrar os cursos de acordo a sigla de uma materia
const getCursosByID = (sigla = '') => {
    let holdCurso = [];
    let erro = true;
    sigla = sigla.toUpperCase();


    cursos.forEach(item => {
        if(sigla == item.sigla){ 
            holdCurso.push(
                {
                    nome: item.nome,
                    sigla: item.sigla,
                    icone: item.icone,
                    carga: item.carga
                }
            )
            erro = false;
        }
    })
    if(erro == false)
    return holdCurso;
    else
    return false;
}


module.exports = {
    getCursos,
    getCursosByID,
}


