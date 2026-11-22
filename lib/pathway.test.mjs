// Run with: npm test  (Node strips the TypeScript types itself)
import { test } from "node:test";
import assert from "node:assert/strict";
import { decide } from "./pathway.ts";

test("institutions get the institutions programme", () => {
  assert.equal(decide({ who: "institution" }).programme, "Go Global for Institutions");
});
test("school students get Mission QS100, even when asking about exposure", () => {
  assert.equal(decide({ who: "parent", stage: "g8-10", goal: "top-uni" }).programme, "Mission QS100");
  assert.equal(decide({ who: "student", stage: "g11-12", goal: "exposure" }).programme, "Mission QS100");
});
test("undergraduates wanting short exposure get Leadership School Finland", () => {
  assert.equal(decide({ who: "student", stage: "ug", goal: "exposure" }).programme, "Leadership School Finland 2026");
});
test("graduates aiming for funding get Future Fellows with region-specific links", () => {
  const r = decide({ who: "student", stage: "pg", goal: "fellowship", region: "uk" });
  assert.equal(r.programme, "Future Fellows");
  assert.ok(r.explore.some((e) => e.label.includes("Chevening")));
});
