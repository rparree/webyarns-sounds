import {nextAudioActions} from "../../src/helpers";


describe("determining sound actions", () => {
    it("Stop one, start another", () => {
        const c = ["abc", "def"];
        const n = ["abc", "toto"];
        const [toStop, toStart] = nextAudioActions(c, n);
        // expect(toStart).to.equal(["toto"]);
        cy.wrap(toStart)
            .should('deep.equal', ["toto"])
        cy.wrap(toStop)
            .should('deep.equal', ["def"])
    })

    it("Stop all", () => {
        const c = ["abc", "def"];
        const n = [];
        const [toStop, toStart] = nextAudioActions(c, n);
        cy.wrap(toStart)
            .should('deep.equal', [])
        cy.wrap(toStop)
            .should('deep.equal', ["abc", "def"])
    })
    it("Continue one", () => {
        const c = ["abc", "def"];
        const n = ["abc"];
        const [toStop, toStart] = nextAudioActions(c, n);
        cy.wrap(toStart)
            .should('deep.equal', [])
        cy.wrap(toStop)
            .should('deep.equal', ["def"])
    })

    it("Restart one on next", () => {
        const c = ["abc", "def"];
        const n = ["!abc"];
        const [toStop, toStart] = nextAudioActions(c, n);
        cy.wrap(toStart)
            .should('deep.equal', ["abc"])
        cy.wrap(toStop)
            .should('deep.equal', ["def"])
    })
    it("Restarted one on next", () => {
        const c = ["!abc", "def"];
        const n = ["abc"];
        const [toStop, toStart] = nextAudioActions(c, n);
        cy.wrap(toStart)
            .should('deep.equal', [])
        cy.wrap(toStop)
            .should('deep.equal', ["def"])
    })

    it("Restarted one restarted on next", () => {
        const c = ["!abc", "def"];
        const n = ["!abc"];
        const [toStop, toStart] = nextAudioActions(c, n);
        cy.wrap(toStart)
            .should('deep.equal', ["abc"])
        cy.wrap(toStop)
            .should('deep.equal', ["def"])
    })
})
