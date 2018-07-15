import path from 'path'
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
      await page.screenshot({ path: path.resolve(this.atlas.root, '..', 'seznam.png') })
      await page.close()
    }
  }
}

export default Crawler
