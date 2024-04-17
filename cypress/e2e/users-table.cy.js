/// <reference types="cypress" />
const mockedUsers = [
  {
    id: 1,
    first_name: "mark",
    last_name: "zuckerberg",
    email: "jzQXG@example.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    first_name: "alex",
    last_name: "zuckerberg",
    email: "jzQXG@example.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
];
describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept({ method: "GET", url: "*/users?page=1" }, (req) => {
      return req.reply({
        body: {
          data: mockedUsers,
        },
      });
    }).as("getUsers");
  });

  it("displays list of users items by default", () => {
    cy.get("table > tbody > tr").should("have.length", 2);
  });

  it("Can add new user", () => {
    const newUser = {
      first_name: "ali",
      last_name: "ali",
      email: "jzQXG@example.com",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    };

    cy.intercept({ method: "POST", url: "*/users" }).as("createUser");
    cy.get("button").contains("Create User").click();
    cy.get("input[name='first_name']").type(newUser.first_name);
    cy.get("input[name='last_name']").type(newUser.last_name);
    cy.get("input[name='email']").type(newUser.email);
    cy.get("input[name='avatar']").type(newUser.avatar);
    cy.get('button[type="submit"]').click();
    cy.wait("@createUser");
    cy.get("table > tbody > tr").should("have.length", 3);
  });

  it("Can delete user", () => {
    cy.intercept({ method: "DELETE", url: "*/users" }).as("deleteUser");
    cy.get(
      "table > tbody > tr:first-child > td:last-child > button[aria-label='delete']"
    ).click();
    cy.get("table > tbody > tr").should("have.length", 1);
  });

  it("Can Update user", () => {
    const userForUpdate = {
      first_name: "new ali",
      last_name: "new ali",
      email: "newali@example.com",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    };

    cy.intercept({ method: "PATCH", url: "*/users" }).as("updateuser");
    cy.get(
      "table > tbody > tr:first-child > td:last-child > button[aria-label='edit']"
    ).click();

    cy.get("input[name='first_name']").clear().type(userForUpdate.first_name);
    cy.get("input[name='last_name']").clear().type(userForUpdate.last_name);
    cy.get("input[name='email']").clear().type(userForUpdate.email);
    cy.get("input[name='avatar']").clear().type(userForUpdate.avatar);
    cy.get('button[type="submit"]').click();
    cy.get("table > tbody > tr")
      .should("contain", userForUpdate.first_name)
      .should("contain", userForUpdate.last_name)
      .should("contain", userForUpdate.email);
  });
});
