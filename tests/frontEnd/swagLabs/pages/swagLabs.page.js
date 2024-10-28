const { faker } = require('@faker-js/faker');
const { expect } = require('@wdio/globals');
const { $ } = require('@wdio/globals');
const { obterElementoPorID, obterElementoPorTexto, scrollarEAguardarClique } = require('../../../../suporte/comandos')
const Page = require('./page');

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const zipCode = faker.location.zipCode();

class SwagLabsPage extends Page {

 async realizarLogin(username = '', password = '') {
   await $('~test-Username').setValue(username)
   await $('~test-Password').setValue(password)
 }

 async btnLogin() {
  await $('~test-LOGIN').click()
 }

 async validarTelaPrincipal() {
   await expect($('//android.widget.ImageView').isDisplayed()).toBeTruthy();
   await expect($(obterElementoPorTexto('Checklist')).isDisplayed()).toBeTruthy()
 }

 async adicionarProdutoAoCarrinho() {
   await $('~test-ADD TO CART').click()
 }

 async verCarrinho() {
   await $('~test-Cart').click()
 }

 async validarInfoCarrinho() {
   await expect($(obterElementoPorTexto('YOUR CART')).isDisplayed()).toBeTruthy()
   await expect($('android.view.ViewGroup').isDisplayed()).toBeTruthy()
 }

 async btnCheckout() {
   await $('~test-CHECKOUT').click()
 }

 // Checkout:information

 async infoCheckout() {
   await expect($(obterElementoPorTexto('CHECKOUT: INFORMATION')).isDisplayed()).toBeTruthy()
   await $('~test-First Name').setValue(firstName)
   await $('~test-Last Name').setValue(lastName)
   await $('~test-Zip/Postal Code').setValue(zipCode)
   await this.btnContinue()
   await expect($(obterElementoPorTexto('Payment Information:')).isDisplayed()).toBeTruthy()
   await expect($(obterElementoPorTexto('Shipping Information:')).isDisplayed()).toBeTruthy()
   await expect($(obterElementoPorTexto('Total: $32.39')).isDisplayed()).toBeTruthy()
   await scrollarEAguardarClique('test-FINISH', 'down');
   await driver.pause(3000);  
   await expect($(obterElementoPorTexto('THANK YOU FOR YOU ORDER')).isDisplayed()).toBeTruthy()
 }

 async formCheckoutError(primeiroNome = '', segundoNome = '', zipCode = '') {
  await $('~test-First Name').setValue(primeiroNome)
  await $('~test-Last Name').setValue(segundoNome)
  await $('~test-Zip/Postal Code').setValue(zipCode)
 }

 async btnContinue() {
  await $('~test-CONTINUE').click()
 }

 async validarMensagemPrimeiroNomeObrigatorio() {
  await expect($(obterElementoPorTexto('First Name is required')).isDisplayed()).toBeTruthy();
 }

 async validarMensagemSegundoNomeObrigatorio() {
  await expect($(obterElementoPorTexto('Last Name is required')).isDisplayed()).toBeTruthy();
 }

 async validarMensagemZipCodeObrigatorio() {
  await expect($(obterElementoPorTexto('Postal Code is required')).isDisplayed()).toBeTruthy();
 }

 // Login

 async validarMensagemNomeObrigatorio() {
  await expect($(obterElementoPorTexto('Username is required')).isDisplayed()).toBeTruthy();
}

async validarMensagemSenhaObrigatorio() {
  await expect($(obterElementoPorTexto('Password is required')).isDisplayed()).toBeTruthy();
}

async validarMensagemErroCrendenciasErrada() {
  await expect($(obterElementoPorTexto('Username and password do not match any user in this service.')).isDisplayed()).toBeTruthy()
}

 // Home

async voltarHome() {
  await $(obterElementoPorTexto('BACK HOME')).click();
  await $('~test-Menu').click()
  await $(obterElementoPorTexto('LOGOUT')).click()
}

}

module.exports = { SwagLabsPage };