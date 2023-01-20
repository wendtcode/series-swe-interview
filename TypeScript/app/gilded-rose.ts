export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const isConjured = (name: string) => /^(?:conjured)\W/i.test(name);

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const { name, sellIn, quality } = this.items[i];

      if (name == SULFURAS) {
        // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        continue;
      }

      this.items[i].sellIn -= 1;

      if (name === AGED_BRIE) {
        // "Aged Brie" actually increases in Quality the older it gets
        this.items[i].quality = Math.min(quality + 1, MAX_QUALITY);
        continue;
      }

      if (name === BACKSTAGE_PASSES) {
        // "Backstage passes", like aged brie, increases in Quality as it's SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        if (sellIn <= 0) {
          this.items[i].quality = MIN_QUALITY;
        } else if (sellIn <= 5) {
          this.items[i].quality = Math.min(quality + 3, MAX_QUALITY);
        } else if (sellIn <= 10) {
          this.items[i].quality = Math.min(quality + 2, MAX_QUALITY);
        } else {
          this.items[i].quality = Math.min(quality + 1, MAX_QUALITY);
        }
        continue;
      }

      let qualityFactor = isConjured(name) ? 2 : 1;
      if (sellIn <= 0) {
        qualityFactor *= 2;
      }

      this.items[i].quality = Math.max(quality - qualityFactor, MIN_QUALITY);
    }

    return this.items;
  }
}
