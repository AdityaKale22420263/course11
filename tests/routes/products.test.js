const request = require("supertest");
const app = require("../../src/app");
const { createProducts } = require("../support/product_helpers");

const BASE_URL = "/products";

test("should get a single product", async () => {
  const products = await createProducts(1);
  const testProduct = products[0];

  const response = await request(app).get(`${BASE_URL}/${testProduct.id}`).expect(200);

  expect(response.body.name).toBe(testProduct.name);
});

describe("UPDATE Product", () => {
  test("should update a product", async () => {
    const products = await createProducts(1);
    const productToUpdate = products[0];
    const updatePayload = {
      name: "Updated Name",
      description: "Updated Description",
      price: "123.45",
      category: productToUpdate.category,
      available: !productToUpdate.available,
    };

    const response = await request(app)
      .put(`${BASE_URL}/${productToUpdate.id}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body.id).toBe(productToUpdate.id);
    expect(response.body.name).toBe(updatePayload.name);
    expect(response.body.price).toBe(parseFloat(updatePayload.price));
    expect(response.body.available).toBe(updatePayload.available);
  });
});
