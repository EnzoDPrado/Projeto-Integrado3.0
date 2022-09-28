const express = require('express');

const cors = require('cors');

//Importando funções com o body parser
const bodyParser = require('body-parser');
const {getAluno, getAlunos, getAlunoDisciplinas, getAlunosByDisciplinas, getAnos} = require('./modulos/alunos.js');
const {getCursos, getCursosByID} = require('./modulos/cursos.js');

const app = express();

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//request para mostrar um aluno de acordo com a matricula passada
app.get('/aluno/:matricula', cors(), async function(request,response,next){
    let matricula = request.params.matricula
    let aluno = getAluno(matricula);
    let holdAlunoInfo = {}

    if(aluno){
        holdAlunoInfo.AlunoInfos = aluno;
        response.status(200);
        response.json(holdAlunoInfo);
    }else{
        request.params(404);
    }
});

//Request para mostrar os alunos
app.get('/alunos', cors(), async function(request, response, next){
    let alunos = getAlunos();
    let holdAlunos = {}

    holdAlunos.alunos = alunos;
    response.status(200);
    response.json(holdAlunos);
});

//Request para pegar as disciplinas de um aluno atraves do numero da matricula
app.get('/disciplinas/:matricula', cors(), async function(request,response, next){
    let numMatricula = request.params.matricula;
    let disciplinas = getAlunoDisciplinas(numMatricula);
    let infosDisciplinas = {};

    if(disciplinas){
        infosDisciplinas.disciplinas = disciplinas;
        response.status(200);
        response.json(infosDisciplinas);
    }else{
        response.status(404);
    }
});

//Request para pegar os alunos de tal disciplina(***DS ou RDS****)
app.get('/alunos/:disciplina', cors(), async function(request,response, next){
    let nomeDisciplina = request.params.disciplina;
    let getAlunos = getAlunosByDisciplinas(nomeDisciplina);
    let alunosDisciplina = {};

    if(getAlunos){
        alunosDisciplina.alunos = getAlunos;
        response.status(200);
        response.json(alunosDisciplina);
    }else{
        response.status(404);
    }
});

//Request para mostrar os cursos
app.get('/cursos', cors(), async function(request, response, next){
    let cursos = getCursos();
    let holdCursos = {};

    holdCursos.cursosInfos = cursos;
    response.status(200);
    response.json(holdCursos);
});

//EndPoint para pegar os anos disponiveis de cada materia
app.get('/curso/anoFinalization/:materia', cors(), async function (request, response, next){
    let materia = request.params.materia;
    let anos = getAnos(materia);
    let holdAnos = {};

    holdAnos.anosDisponiveis = anos;
    response.status(200);
    response.json(holdAnos);
})

//EndPoint para pegar as informações de um curso apenas pela sigla
app.get('/curso/:sigla', cors(), async function(request, response, next){
    let sigla = request.params.sigla;
    let getCurso = getCursosByID(sigla);
    let holdInfos = {};

    if(getCurso){
        holdInfos.cursoInfos = getCurso;
        response.status(200);
        response.json(holdInfos);
    }else{
        response.status(400);
    }
})

app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.');
});
