import Service from '@atlas.js/service'
import puppeteer from 'puppeteer'

class Puppeteer extends Service {
  prepare() {
    return {
      puppeteer,
      browser: null,
    }
  }

  async start(client) {
    client.browser = await puppeteer.launch()
  }

  async stop(client) {
    await client.browser.close()
  }
}

export default Puppeteer
