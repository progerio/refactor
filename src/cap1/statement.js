
import  plays  from "./plays.json";

export default function statment(invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    
    for (let perf of invoice.performances) {
        result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    
    result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
    result += `You earned ${totalVolumeCredits(invoice)} credits\n`;
    
    return result;
}

function amountFor(aPerformace) { 
    let result = 0;
    switch (playFor(aPerformace).type) { 
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
                throw new Error(`Unknown type: ${playFor(aPerformace).type}`);
        }
    return result;
}

function playFor(aPerformance){ 
    return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if (playFor(aPerformance).type === "comedy") {
        result += Math.floor(aPerformance.audience / 5);
    }
    return result;
}


function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber / 100);
}

function totalVolumeCredits(invoice) {
    let result = 0;
    for (let perf of invoice.performances) {
        result += volumeCreditsFor(perf);
    }
    return result;   
}

function totalAmount(invoice) {
    let result = 0;
    for (let perf of invoice.performances) {
        result += amountFor(perf);
    }
    return result;
}