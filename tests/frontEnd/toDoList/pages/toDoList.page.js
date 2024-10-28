const { expect } = require('@wdio/globals');
const { $ } = require('@wdio/globals');
const { obterElementoPorID, obterElementoPorTexto } = require('../../../../suporte/comandos')
const Page = require('./page');


class ToDoListPage extends Page {

    async habilitarPermicoes() {
        await $(obterElementoPorID({ testID: 'com.android.permissioncontroller:id/permission_allow_button' })).click()
    }

    async pularEtapa() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip' })).click()
    }

    async validarTituloInicial() {
        await expect($(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/logo_image' }))).toBeDisplayed({ timeout: 5000 })
    }

    async clicarBtnAddTarefa() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/main_btn1' })).click()
    }

    async clicarBtnCheckList() {
        await $(obterElementoPorTexto('Checklist')).click()
    }

    async clicarBtnText() {
        await $(obterElementoPorTexto('Text')).click()
    }

    async addItemCheckList() {
        await $(obterElementoPorTexto('Add Item')).click()
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/edit' })).setValue('Realizar Test 1')
        await $(obterElementoPorTexto('OK')).click()
    }

    async addItemText() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/edit_note' })).setValue('Realizar Test 2')
    }

    async btnSalvar() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/back_btn' })).click()
    }

    async btnVoltar() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/back_btn' })).click()
    }

    async verFormato() {
        await $(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/text_button_center' })).click()
    }

    async clicarEmVer() {
        await $(obterElementoPorTexto('VIEW')).click()
    }

    async list() {
        await $(obterElementoPorTexto('List')).click()
        await expect($(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/note_list' }))).toBeDisplayed({ timeout: 3000 })
    }

    async details() {
        await this.verFormato()
        await $(obterElementoPorTexto('Details')).click()
        await expect($(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/note_list' }))).toBeDisplayed({ timeout: 3000 })
    }

    async grid() {
        await this.verFormato()
        await $(obterElementoPorTexto('Grid')).click()
        await expect($(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/note_grid' }))).toBeDisplayed({ timeout: 3000 })
    }

    async largeGrid() {
        await this.verFormato()
        await $(obterElementoPorTexto('Large grid')).click()
        await expect($(obterElementoPorID({ testID: 'com.socialnmobile.dictapps.notepad.color.note:id/note_grid' }))).toBeDisplayed({ timeout: 10000 })
    }
}

module.exports = { ToDoListPage };