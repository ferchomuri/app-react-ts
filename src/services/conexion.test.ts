import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { get, getWithParams, post, put, remove } from "./conexion";

describe("API calls", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should make a simple GET request", async () => {
    const data = { message: "GET success" };
    const endpoint = "/test-endpoint";

    mock.onGet(endpoint).reply(200, data);

    const response = await get<typeof data>(endpoint);
    expect(response).toEqual(data);
  });

  it("should make a GET request with params", async () => {
    const data = { message: "GET with params success" };
    const endpoint = "/test-endpoint";
    const params = { param1: "value1" };

    mock.onGet(endpoint, { params }).reply(200, data);

    const response = await getWithParams<typeof data>(endpoint, params);
    expect(response).toEqual(data);
  });

  it("should make a POST request", async () => {
    const data = { message: "POST success" };
    const postData = { name: "John" };
    const endpoint = "/test-endpoint";

    mock.onPost(endpoint, postData).reply(200, data);

    const response = await post<typeof data>(endpoint, postData);
    expect(response).toEqual(data);
  });

  it("should make a PUT request", async () => {
    const data = { message: "PUT success" };
    const putData = { name: "John" };
    const endpoint = "/test-endpoint";

    mock.onPut(endpoint, putData).reply(200, data);

    const response = await put<typeof data>(endpoint, putData);
    expect(response).toEqual(data);
  });

  it("should make a DELETE request", async () => {
    const data = { message: "DELETE success" };
    const endpoint = "/test-endpoint";

    mock.onDelete(endpoint).reply(200, data);

    const response = await remove<typeof data>(endpoint);
    expect(response).toEqual(data);
  });
});