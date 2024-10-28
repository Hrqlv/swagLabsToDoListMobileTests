const { expect } = require('@wdio/globals')
const { SwagLabsPage } = require('../pages/swagLabs.page')

let swagLabs = new SwagLabsPage();

  // Fluxo de sucesso de uma compra de produto

describe('Realizar o login e após fazer o login realizar uma compra com os produtos que desejar', () => {
    it('Realizar login', async () => {
        await driver.pause(3000);
        await swagLabs.realizarLogin('standard_user', 'secret_sauce');
        await swagLabs.btnLogin()
    })

    it ('Validar tela principal', async () => {
        await swagLabs.validarTelaPrincipal()
    })

    it('Escolher o produto e adicionar ao carrinho', async () => {
      await swagLabs.adicionarProdutoAoCarrinho()
      await swagLabs.verCarrinho()
    })

    it('Validar as informaçoes do produto ao carrinho, continuar a compra e finalizar', async () => {
        await swagLabs.validarInfoCarrinho()
        await swagLabs.btnCheckout()
        await swagLabs.infoCheckout()
        await swagLabs.voltarHome()
    })
})

  // Fluxo de erro / alternativo pata tela de Login 

describe('Realizar o fluxo alternativo / negativo da tela de login', () => {
    it('Validar erro de login com credenciais vazias para nome e senha', async () => {
        await swagLabs.btnLogin()
        await swagLabs.validarMensagemNomeObrigatorio()
        await swagLabs.realizarLogin('standard_user', '')
        await swagLabs.btnLogin()
        await swagLabs.validarMensagemSenhaObrigatorio()
    })

    it('Validar erro de login com credenciais de nome ou senha errada', async () => {
        await swagLabs.realizarLogin('standard_', 'secret_sauce')
        await swagLabs.validarMensagemErroCrendenciasErrada()
        await swagLabs.realizarLogin('standard_user', 'secret_')
        await swagLabs.validarMensagemErroCrendenciasErrada()
    })
})

  // Fluxo de erro / alternativo para tela de Checkout:information 

describe('Realizar o fluxo alternativo / negativo da tela de Checkout:information', async () => {
    beforeEach(async () => {
        await driver.pause(3000);
        await swagLabs.realizarLogin('standard_user', 'secret_sauce');
        await swagLabs.btnLogin()
        await swagLabs.validarTelaPrincipal()
        await swagLabs.adicionarProdutoAoCarrinho()
        await swagLabs.verCarrinho()
        await swagLabs.validarInfoCarrinho()
        await swagLabs.btnCheckout()
    })

    it('Validar mensagens de erros para campos obrigatórios', async () => {
        await swagLabs.btnContinue()
        await swagLabs.validarMensagemPrimeiroNomeObrigatorio()
        await swagLabs.formCheckoutError('Henrique')
        await swagLabs.btnContinue()
        await swagLabs.validarMensagemSegundoNomeObrigatorio()
        await swagLabs.formCheckoutError('Henrique', 'Lopes Velozo')
        await swagLabs.btnContinue()
        await swagLabs.validarMensagemZipCodeObrigatorio()
        await swagLabs.formCheckoutError('Henrique', 'Lopes Velozo', '18401220')
    })
})

