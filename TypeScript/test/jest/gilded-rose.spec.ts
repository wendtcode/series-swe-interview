import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("Sulfuras", () => {
    it("does not change", () => {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0]).toMatchObject(items[0]);
    });
  });
  describe("Aged Brie", () => {
    it("increases in quality", () => {
      const items = [new Item("Aged Brie", 2, 0)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(1);
    });
    it("but never more than 50", () => {
      const items = [new Item("Aged Brie", 2, 0)];
      const gildedRose = new GildedRose(items);
      let i = 100;
      while (i--) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(-98);
    });
  });
  describe("Backstage Passes", () => {
    it("increases in quality", () => {
      const startingQuality = 20;
      const items = [
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          15,
          startingQuality
        ),
      ];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(startingQuality + 1);
    });
    it("increases in quality by 2 when sellBy < 11", () => {
      const startingQuality = 25;
      const items = [
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          10,
          startingQuality
        ),
      ];
      const results = new GildedRose(items).updateQuality();

      expect(results[0].quality).toBe(startingQuality + 2);
      expect(results[0].sellIn).toBe(9);
    });
    it("increases in quality by 3 when sellBy < 6", () => {
      const startingQuality = 35;
      const items = [
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          5,
          startingQuality
        ),
      ];
      const results = new GildedRose(items).updateQuality();

      expect(results[0].quality).toBe(startingQuality + 3);
      expect(results[0].sellIn).toBe(4);
    });
    it("but goes to 0 after the concert date", () => {
      const startingQuality = 50;
      const items = [
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          0,
          startingQuality
        ),
      ];
      const results = new GildedRose(items).updateQuality();

      expect(results[0].quality).toBe(0);
      expect(results[0].sellIn).toBe(-1);
    });
  });
  describe("Conjured", () => {
    it("decreases in quality twice as fast", () => {
      const startingQuality = 20;
      const items = [new Item("Conjured Mana Cake", 3, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(startingQuality - 2);
    });
    it("but never less than 0", () => {
      const startingQuality = 0;
      const items = [new Item("Conjured Mana Cake", 3, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(0);
    });
    it("decreases in quality twice as fast after sellBy date", () => {
      const startingQuality = 20;
      const items = [new Item("Conjured Mana Cake", 0, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(startingQuality - 4);
    });
  });
  describe("Everything else", () => {
    it("decreases in quality", () => {
      const startingQuality = 20;
      const items = [new Item("+5 Dexterity Vest", 10, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(startingQuality - 1);
    });
    it("but never less than 0", () => {
      const startingQuality = 0;
      const items = [new Item("+5 Dexterity Vest", 10, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(0);
    });
    it("decreases in quality twice as fast after sellBy date", () => {
      const startingQuality = 20;
      const items = [new Item("+5 Dexterity Vest", 0, startingQuality)];
      const results = new GildedRose(items).updateQuality();
      expect(results[0].quality).toBe(startingQuality - 2);
    });
  });
});
