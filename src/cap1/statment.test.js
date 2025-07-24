
import statment from "./statement";
import plays from "./plays.json";
import invoices from "./invoices.json";

describe("Statement", () => {
    it("should generate a statement for the invoice", () => {
        const expectedOutput = `Statement for BigCo\n` +
            ` Hamlet:$650.00 (55 seats)\n` +
            ` As You Like It:$580.00 (35 seats)\n` +
            ` Othello:$500.00 (40 seats)\n` +
            `Amount owed is $1,730.00\n` +
            `You earned 47 credits\n`;
        const invoice = invoices[0];
        expect(statment(invoice, plays)).toBe(expectedOutput);
    });
});

