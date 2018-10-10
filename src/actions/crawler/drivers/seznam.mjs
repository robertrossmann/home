class SeznamDriver {
  url = 'https://www.sreality.cz/hledani/pronajem/byty/brno?velikost=3%2B1,4%2Bkk,4%2B1&stari=mesic&plocha-od=70&plocha-do=200&cena-od=0&cena-do=15000'
  selector = '.property a.title'

  async parseUrl(element) {
    const href = await element.getProperty('href')
    const url = await href.jsonValue()

    href.dispose()

    return url
  }
}

export default SeznamDriver
