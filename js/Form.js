var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault(event);
    var formulario = document.querySelector("#form-adiciona");

     var paciente = obtemPacienteFormulario(formulario);

     var erro = validaPaciente(paciente);

     if(erro.length > 0){
         exibeMensagemErro(erro);
         
         return;
     }
     adicionaPacientenaTabela(paciente);
    
    formulario.reset();
    var mensagensErro = document.querySelector("#mensagens-erros");
    mensagensErro.innerHTML = "";
});

function adicionaPacientenaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPacienteFormulario(formulario){

    var paciente = {
        nome: formulario.nome.value,
        peso: formulario.peso.value,
        altura: formulario.altura.value,
        gordura: formulario.gordura.value,
        imc: calculaImc(formulario.peso.value, formulario.altura.value)
    }
    return paciente;
}
function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;

}
function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){
    var erros = []; 

    if(!validaPeso(paciente.peso)) erros.push("Peso é invalido");
        
    
    if(!validaAltura(paciente.altura)) erros.push("Altura é invalida");
    
    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }
    if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }
    if(paciente.peso.length == 0){
        erros.push("Peso não pode ser em branco");
    }
    if(paciente.altura.length == 0){
        erros.push("Altura não pode ser em branco");
    }

    return erros;
}
function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagens-erros");
    ul.innerHTML = "";
    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}