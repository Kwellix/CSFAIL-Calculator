let bankForm = document.getElementById("bank")
let p2 = document.getElementById("p2")
let p3 = document.getElementById("p3")
let p4 = document.getElementById("p4")
let s2 = document.getElementById("s2")
let s3 = document.getElementById("s3")
let s4 = document.getElementById("s4")
let profit1 = document.getElementById("profit1")
let profit2 = document.getElementById("profit2")
let profit3 = document.getElementById("profit3")
let profit4 = document.getElementById("profit4")
let hide1 = document.getElementById("hide1");
let hide2 = document.getElementById("hide2");
let brHide1 = document.getElementById("brHide1")
const radioButtons = document.querySelectorAll('input[name="btnWay"]');
let radioButton1 = document.getElementById("btnWay");
let radioButton2 = document.getElementById("btnWay2");
    
//---------------------------EVENT LISTENER---------------------------

bankForm.addEventListener("input", () => {
    Action()
})

radioButton1.onclick = function () {
    Action()
}

radioButton2.onclick = function () {
    Action()
}

function Action(){
    let bank = bankForm.value
    const data = new Calculator(+bank)
    
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            
            if (radioButton.value === "double") {
                data.calculations234()
                p2.textContent = data.way234P_2 + "$"
                p3.textContent = data.way234P_3 + "$"
                p4.textContent = data.way234P_4 + "$"
                s2.textContent = data.way234S_2 + "$"
                s3.textContent = data.way234S_3 + "$"
                s4.textContent = data.way234S_4 + "$"
                profit1.textContent = "(+" + data.calculateProfit(data.way234P_2) + "$)" 
                profit2.textContent = "(+" + data.calculateProfit2(data.way234P_3, data.way234P_2) + "$)" 
                profit3.textContent = "(+" + data.calculateProfit3(data.way234P_4, data.way234P_3, data.way234P_2) + "$)" 
                profit4.textContent = "(+" + data.calculateProfit(data.way234S_2) + "$)" 
                hide1.style.display = "flex"
                hide2.style.display = "flex"
                profit5.style.visibility = "hidden"
                brHide1.style.display = "inline"
                brHide2.style.display = "inline"
            
            } else if (radioButton.value === "triple") {
                data.calculations34()
                p3.textContent = data.way34P_3 + "$"
                p4.textContent = data.way34P_4 + "$"
                s3.textContent = data.way34S_3 + "$"
                s4.textContent = data.way34S_4 + "$"
                profit2.textContent = "(+" + data.calculateProfit(data.way34P_3) + "$)" 
                profit3.textContent = "(+" + data.calculateProfit2(data.way34P_4, data.way34P_3) + "$)" 
                profit5.textContent = "(+" + data.calculateProfit(data.way34S_3) + "$)" 
                hide1.style.display = "none"
                hide2.style.display = "none"
                profit5.style.visibility = "visible"
                brHide1.style.display = "none"
                brHide2.style.display = "none"
            }
            break;
        }
    }
}

//---------------------------CLASS SECTION---------------------------

class Calculator {
    constructor(value){
        this.bank = +(value).toFixed(2)
    }

    calculateProfit(value){
        return (value * 1.2 - value).toFixed(2)
    }

    calculateProfit2(value, value2){
        return ((value * 1.2 - value) - value2).toFixed(2)
    }

    calculateProfit3(value, value2, value3){
        return ((value * 1.2 - value) - value2 - value3).toFixed(2)
    }

    makeWay34Safe(value){
        let bank4 = +(value / 1.2).toFixed(2) 
        let bank3 = +(value - bank4).toFixed(2)
        return [bank4, bank3]
    }

    makeWay34Profit(value){
        let bank4 = +(value * 0.85).toFixed(2)
        let bank3 = +(value - bank4).toFixed(2)
        return [bank4, bank3]
    }

    makeWay234Safe(value){
        let bank4 = +(value / 1.2).toFixed(2) 
        let bank3 = this.makeWay34Safe(bank4)[1]
        let bank2 = +(this.bank - bank4 - bank3).toFixed(2) 
        return [bank4, bank3, bank2]
    }

    makeWay234Profit(value){
        let bank4 = +(value * 0.85).toFixed(2) 
        let bank3 = this.makeWay34Profit(bank4)[1]
        let bank2 = +(this.bank - bank4 - bank3).toFixed(2)
        return [bank4, bank3, bank2]
    }

    calculations34(){
        let way34P = this.makeWay34Profit(this.bank) 
        this.way34P_4 = way34P[0] 
        this.way34P_3 = way34P[1] 
        
        let way34S = this.makeWay34Safe(this.bank)
        this.way34S_4 = way34S[0]  
        this.way34S_3 = way34S[1]
    }

    calculations234(){
        let way234S = this.makeWay234Safe(this.bank)
        this.way234S_4 = way234S[0]
        this.way234S_3 = way234S[1]
        this.way234S_2 = way234S[2]
        
        let way234P = this.makeWay234Profit(this.bank)
        this.way234P_4 = way234P[0]
        this.way234P_3 = way234P[1]
        this.way234P_2 = way234P[2]
    }
}