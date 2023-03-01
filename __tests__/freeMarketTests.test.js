import {
  getProductsByCategory,
  getProductsBySearchInput,
  getProductDescription,
  getCategoryName,
} from "../src/lib/MELIendpointsAPI";

describe("getProductsByCategory", () => {
  test("returns an array of products for a valid category ID", async () => {
    const result = await getProductsByCategory("MLA1055");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result[0]).toBe("object");
  });

  test("returns an empty array for an invalid category ID", async () => {
    const result = await getProductsByCategory("invalidID");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("getProductsBySearchInput", () => {
  test("returns an array of products for a valid search input", async () => {
    const result = await getProductsBySearchInput("iphone");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result[0]).toBe("object");
  });

  test("returns an empty array for an invalid search input", async () => {
    const result = await getProductsBySearchInput("");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("getProductDescription", () => {
  test("returns the product description for a valid product ID", async () => {
    const result = await getProductDescription("MLA123456");
    expect(typeof result).toBe("string");
  });

  test("returns a message indicating the description is not available for an invalid product ID", async () => {
    const result = await getProductDescription("invalidID");
    expect(typeof result).toBe("string");
    expect(result).toBe("Description not available");
  });
});

describe("getCategoryName", () => {
  test("returns an empty string for an invalid category ID", async () => {
    const result = await getCategoryName("invalidID");
    expect(typeof result).toBe("undefined");
  });
});
