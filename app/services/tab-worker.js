import Service from '@ember/service';

export default Service.extend({
  async run(faucet) {
    const tab = await browser.tabs.create( { active: true, url: faucet.url });

  },
});
