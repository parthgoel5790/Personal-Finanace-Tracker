let transactions=JSON.parse(localStorage.getItem("finance-data"))|| [];
const financeForm=document.getElementById("finance-form");
const nameInput=document.getElementById("transaction-name");
const typeSelect=document.getElementById("transaction-type");
const amountInput=document.getElementById("transaction-amount");
const ledgerList=document.getElementById("transaction-list");
const totalBalance=document.getElementById("total-balance");
const netIncome=document.getElementById("net-income");
const netExpenses=document.getElementById("net-expenses");
function updateTransactionSummaries(){
    let total=0.0;
    let income=0.0;
    let expense=0.0;
    transactions.forEach(element => {
        if(element.type=="expense"){
            total-=element.amount;
            expense+=element.amount;
        }
        else{
            total+=element.amount;
            income+=element.amount;
        }
    });
    totalBalance.innerText=`$${total.toFixed(2)}`;
    netIncome.innerText=`$${income.toFixed(2)}`;
    netExpenses.innerText=`$${expense.toFixed(2)}`;
}
function addTransactionToDom(currTransaction){
    let sign,color;
    if(currTransaction.type=="expense"){
        sign="-";
        color="text-fail";
    }
    else{
        sign="+";
        color="text-success";
    }
    let htmltemplate;
    if(color=="text-fail"){
        htmltemplate=`<li class="high"><span>${currTransaction.name}</span> ${sign}$${currTransaction.amount} <button class="delete-btn" data-id=${currTransaction.id}>&#10060</button></li>`;
    }
    else{
        htmltemplate=`<li class="low"><span>${currTransaction.name}</span> ${sign}$${currTransaction.amount} <button class="delete-btn" data-id=${currTransaction.id}>&#10060</button></li>`;
    }
    
    ledgerList.insertAdjacentHTML("beforeend",htmltemplate);
    
}
financeForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const namevalue=nameInput.value;
    const typevalue=typeSelect.value;
    const amountvalue=parseFloat(amountInput.value);
    let currTransaction={
        id:Date.now(),
        name:namevalue,
        type:typevalue,
        amount:amountvalue
    }
    transactions.push(currTransaction);
    addTransactionToDom(currTransaction);
    updateTransactionSummaries();
    console.log(transactions);
    financeForm.reset();
    saveToLocalStorage();

})
ledgerList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-btn")){
        const deleteId=parseInt(event.target.getAttribute("data-id"));
        transactions=transactions.filter(item=>item.id!=deleteId);
        e.target.parentElement.remove();
        updateTransactionSummaries();
    }
    saveToLocalStorage();
})
function saveToLocalStorage(){
    const stringData=JSON.stringify(transactions);
    localStorage.setItem("finance-data",stringData);
}
transactions.forEach(item=>addTransactionToDom(item));
updateTransactionSummaries();