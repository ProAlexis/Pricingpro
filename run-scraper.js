import { runMasterScraper } from './scrapers/master-scraper.js';

runMasterScraper()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });