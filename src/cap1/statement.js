
export default function statment(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);
        
        // soma creditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);
        // soma um credito extra para cada dez espectadores de comedia
        if (play.type === "comedy") {
            volumeCredits += Math.floor(perf.audience / 5);
        } 
        // exibe a linha para esta requisição
        result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    
    return result;
}

function amountFor(aPerformace, play) { 
    let result = 0;
    switch (play.type) { 
            case "tragedy":
                result = 40000;
                if (aPerformace.audience > 30) {
                    result += 1000 * (aPerformace.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformace.audience > 20) {
                    result += 10000 + 500 * (aPerformace.audience - 20);
                }
                result += 300 * aPerformace.audience;
                break;
            default:
                throw new Error(`Unknown type: ${play.type}`);
        }
    return result;
}
