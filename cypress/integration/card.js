describe("card draging", () => {
  it("test drag", () => {
    cy.visit("/")
      .get(":nth-child(1) > .list__items > :nth-child(3)")
      .drag(":nth-child(2) > .list__items > :nth-child(3)");

    cy.get(":nth-child(1) > .list__items > :nth-child(2)").drag(
      ":nth-child(2) > .list__items > :nth-child(4)"
    );
    cy.get(":nth-child(1) > .list__items > :nth-child(1)").drag(
      ":nth-child(2) > .list__items"
    );
    cy.get(":nth-child(2) > .list__items ")
      .find("div")
      .should("have.length", 6);

    cy.get(":nth-child(1) > .list__items > :nth-child(1)").should("not.exist");

    //dropping on first card in second list will put the card on top of the list
    cy.get(":nth-child(3) > .list__items > :nth-child(1)")
      .drag(":nth-child(2) > .list__items > :nth-child(1)")
      .get(":nth-child(2) > .list__items > :nth-child(1)")
      .should("have.text", "task #7");

    //dropping on board will put the card on bottom of the list
    cy.get(":nth-child(3) > .list__items > :nth-child(1)")
      .drag(".app__main > :nth-child(2)")
      .get(":nth-child(2) > .list__items")
      .find("div")
      .last()
      .should("have.text", "task #8");

    cy.reload();
  });
  it("drop to wrong place", () => {
    cy.visit("http://localhost:3000")
      .get(":nth-child(1) > .list__items > :nth-child(3)")
      .drag(".app__main > :nth-child(1)");

    cy.get(":nth-child(1) > .list__items")
      .find("div")
      .last()
      .should("have.text", "task #3");
  });

  it("swap", () => {
    cy.visit("http://localhost:3000")
      .get(":nth-child(1) > .list__items > :nth-child(3)")
      .drag(":nth-child(1) > .list__items > :nth-child(2)");

    cy.get(":nth-child(1) > .list__items")
      .find("div")
      .last()
      .should("have.text", "task #2");
  });
});
