/*global afterEach describe it beforeEach*/
const request = require("supertest");

describe("loading express", () => {
  let server;
  beforeEach(() => {
    server = require("../bin/www");
  });
  afterEach(() => {
    server.close();
  });
  it("responds to /", (done) => {
    request(server)
      .get("/")
      .expect(200, done);
  });
  it("responds to /users", (done) => {
    request(server)
      .get("/users")
      .expect(200, done);
  });
  it("404s other things", (done) => {
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });
});
describe("production mode", () => {
  let server;
  beforeEach(() => {
    // enableProductionMode()
    //server = require("../bin/www");
  });
  afterEach(() => {
    //server.close();
  });
});
