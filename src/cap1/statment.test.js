
import statment from "./statement";
import plays from "./plays";
import invoices from "./invoices";

describe("Statement", () => {
    it("should generate a statement for the invoice", () => {
        const invoice = invoices[0];
        const expectedOutput = `Statement for BigCo\n` +
            `  Hamlet: $650.00 (55 seats)\n` +
            `  As You Like It: $580.00 (35 seats)\n` +
            `  Othello: $500.00 (40 seats)\n` +
            `Amount owed is $1,730.00\n` +
            `You earned 47 credits\n`;

        expect(statment(invoice, plays)).toBe(expectedOutput);
    });
    it("should handle empty invoices", () => {
        const emptyInvoice = { customer: "EmptyCo", performances: [] };
        const expectedOutput = `Statement for EmptyCo\n` +
            `Amount owed is $0.00\n` +
            `You earned 0 credits\n`;

        expect(statment(emptyInvoice, plays)).toBe(expectedOutput);
    });
    
});

