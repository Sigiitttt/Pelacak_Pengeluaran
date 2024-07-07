$(document).ready(function() {
    // Variabel untuk menyimpan data pengeluaran
    let expenses = [];

    // Fungsi untuk menambahkan pengeluaran baru
    function addExpense(description, amount, category) {
        const expense = {
            description: description,
            amount: parseFloat(amount),
            category: category,
            date: new Date().toLocaleDateString()
        };
        expenses.push(expense);
        renderExpenses();
    }

    // Fungsi untuk menampilkan daftar pengeluaran
    function renderExpenses() {
        const expenseList = $('#expense-list');
        expenseList.empty();
        let totalAmount = 0;

        // Dapatkan kategori filter yang dipilih
        const filterCategory = $('#filter-category').val();

        // Looping melalui array expenses
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];

            // Filter berdasarkan kategori
            if (filterCategory === 'Semua' || expense.category === filterCategory) {
                totalAmount += expense.amount;
                const row = `<tr>
                                <td>${expense.description}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>${expense.category}</td>
                                <td>${expense.date}</td>
                             </tr>`;
                expenseList.append(row);
            }
        }

        // Menambahkan total pengeluaran jika tidak dalam mode filter
        if (filterCategory === 'Semua') {
            const totalRow = `<tr>
                                <td><strong>Total</strong></td>
                                <td><strong>${totalAmount.toFixed(2)}</strong></td>
                                <td colspan="2"></td>
                              </tr>`;
            expenseList.append(totalRow);
        }
    }

    // Event handler untuk form submit
    $('#expense-form').submit(function(event) {
        event.preventDefault();
        const description = $('#description').val();
        const amount = $('#amount').val();
        const category = $('#category').val();

        if (description && amount && category) {
            addExpense(description, amount, category);
            $('#description').val('');
            $('#amount').val('');
            $('#category').val('');
        }
    });

    // Event handler untuk filter category change
    $('#filter-category').change(function() {
        renderExpenses();
    });
});