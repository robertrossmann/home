/* eslint-disable no-await-in-loop */
import { Action } from '@atlas.js/atlas'
import * as drivers from './drivers'

class Crawler extends Action {
  static requires = ['service:browser']

  async run() {
    const { browser } = this.component('service:browser')

    for (const [name, Driver] of Object.entries(drivers)) {
      this.log.info({ name }, 'driver')

      const driver = new Driver()
      const page = await browser.newPage()

      await page.goto(driver.url)
      const elements = await page.$$(driver.selector)
      const urls = await Promise.all(elements.map(element => driver.parseUrl(element)))

      this.log.info({ urls }, 'selector results')

      await page.close()
    }
  }
}

export default Crawler
