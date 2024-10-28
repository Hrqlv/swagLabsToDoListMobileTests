const obterElementoPorID = ({ testID, attribute }) => {
    if (driver.isAndroid) {
      if (attribute) {
        return `//*[@resource-id="${testID}" and ${attribute}]`;
      } else {
        return `//*[@resource-id="${testID}"]`;
      }
    } else {
      return `~${testID}`;
    }
  }

const obterElementoPorTexto = (text) => {
    if (driver.isAndroid) {
      return `//*[@text="${text}"]`;
    } else {
      return `//*[@label="${text}"]`;
    }
  };

  const scrollarEAguardarClique = async (accessibilityID, direcao = 'down') => {
    let elemento;

    if (driver.isAndroid) {
        elemento = await driver.$(
            `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("${accessibilityID}"))`
        );
    } else {
        elemento = await driver.$(`~${accessibilityID}`);
    }
    if (await elemento.isDisplayed()) {
        await elemento.click();
    } else {
        throw new Error(`Elemento ${accessibilityID} não encontrado após o scroll.`);
    }
};

  module.exports = { obterElementoPorID, obterElementoPorTexto, scrollarEAguardarClique }