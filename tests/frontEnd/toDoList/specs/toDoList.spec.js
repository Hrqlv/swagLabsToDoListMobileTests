const { expect } = require('@wdio/globals')
const { ToDoListPage } = require('../pages/toDoList.page')

let toDoList = new ToDoListPage();

describe('Adicionar tarefas em dois formatos como texto e checklist', () => {
    beforeEach(async () => {
        await toDoList.habilitarPermicoes()
        await toDoList.pularEtapa()
        await toDoList.validarTituloInicial()
    })

    it('Adicionar a tarefa como checklist e texto e por fim validar as opçoes de formato', async () => {
        // CheckList
        await toDoList.clicarBtnAddTarefa()
        await toDoList.clicarBtnCheckList()
        await toDoList.addItemCheckList()
        await toDoList.btnSalvar()
        await toDoList.btnVoltar()

        // Texto
        await toDoList.clicarBtnAddTarefa()
        await toDoList.clicarBtnText()
        await toDoList.addItemText()
        await toDoList.btnSalvar()
        await toDoList.btnVoltar()

        // Ver formato
        await toDoList.verFormato()
        await toDoList.clicarEmVer()
        await toDoList.list()
        await toDoList.details()
        await toDoList.grid()
        await toDoList.largeGrid()
    })
})

