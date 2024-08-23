import { describe, test } from "node:test";
import assert from "node:assert";
import { hashPassword } from "../../libs/hash";

describe("unit test", () => {
  describe("hashpassword", () => {
    const password = "secreto";
    const passHashed = hashPassword(password);

    test("should be a string", () => {
      assert.equal(typeof passHashed, "string");
    });

    test("should had length equal 60", () => {
      assert.equal(passHashed.length, 60);
    });

    test("should not equal to input", () => {
      assert.notEqual(passHashed, password);
    });
  });
});
