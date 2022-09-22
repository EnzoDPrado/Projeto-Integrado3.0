const express = require('express');

const cors = require('cors');

//Importando funções com o body parser
const bodyParser = require('body-parser');
const {getAluno, getAlunos, getAlunoDisciplinas, getAlunosByDisciplinas} = require('./modulos/alunos.js');
const {getCursos} = require('./modulos/cursos.js');

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


app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.');
});
