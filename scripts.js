const Modal = {
    open(){
        //Abrir modal
        //Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        //Fechar o modal
        //Remover a class active do modal 
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    },
}

const transactions = [
    {
        id: 1, 
        description: 'Luz',
        amount: -50000,
        date: '24/01/2021',
    },
    {
        id: 2, 
        description: 'Website',
        amount: 500000,
        date: '24/01/2021',
    },
    {
        id: 3, 
        description: 'Internet',
        amount: -20000,
        date: '24/01/2021',
    },
    {
        id: 4, 
        description: 'App',
        amount: 20000,
        date: '24/01/2021',
    },
]

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0;
        //pegar todas as transações
        //para cada transação, 
        Transactions.all.forEach(transaction => {
            //se  ela for maior que zero
            if(transaction.amount > 0){
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        
        return income;
    },

    expenses() {
        //somar as saídas
        let expense = 0;
        //pegar todas as transações
        //para cada transação, 
        Transactions.all.forEach(transaction => {
            //se  ela for menor que zero
            if(transaction.amount < 0){
                //somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        
        return expense;
    },

    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)

    },  

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="assets/minus.svg" alt="Remover transação"></td>
        ` 

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },
    reload() {
        App.init()
    },
}

App.init()

Transaction.add({
    id: 39,
    description: 'alo',
    amount: 200,
    date:'24/01/2021'
})
