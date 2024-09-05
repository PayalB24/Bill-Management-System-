
 const units = {
    "Kg":1,
    "g":1000
};

document.getElementById('product-count').addEventListener('input', function () {
    const count = this.value;
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const productSelect = document.createElement('input');
        productSelect.className = 'product-select';
        productSelect.required = true;
        productSelect.placeholder = 'Enter the Product'
        productSelect.style.display = 'block';
        productSelect.style.marginBottom = '10px';
        productSelect.style.padding = '8px';
        productSelect.style.border = '1px solid black';
        productSelect.style.borderRadius = '4px';
        productSelect.innerHTML = '<input type="text">Enter Product</input>';
        // productSelect.innerHTML += '<input type="text">Enter Product</input>';

        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.className = 'price-input';
        priceInput.placeholder = 'Enter product price';
        productSelect.style.display = 'block';
        productSelect.style.marginBottom = '10px';
        productSelect.style.padding = '8px';
        productSelect.style.border = '1px solid black';
        productSelect.style.borderRadius = '4px';
        priceInput.required = true;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        productSelect.style.display = 'block';
        productSelect.style.marginBottom = '10px';
        productSelect.style.padding = '8px';
        productSelect.style.border = '1px solid black';
        productSelect.style.borderRadius = '4px';
        quantityInput.min = 1;
        quantityInput.max = 10;
        quantityInput.value = 1;
        quantityInput.required = true;

        const unitSelect = document.createElement('select');
        unitSelect.className = 'product-select';
        unitSelect.required = true;
        unitSelect.innerHTML = '<option value="">Unit</option>';
        for (let unit in units) {
            unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        }

        container.appendChild(productSelect);
        container.appendChild(priceInput);
        container.appendChild(quantityInput);
        container.appendChild(unitSelect)
        
    }
});

function createBill() {
    const name = document.getElementById('customer-name').value;
    const mobile = document.getElementById('customer-mobile').value;
    const address = document.getElementById('customer-address').value;
    const productSelects = document.querySelectorAll('.product-select');
    const priceInput = document.querySelectorAll('.price-input');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    let billDetails = '<table style="width: 100%; border-collapse: collapse;">';
    billDetails += '<tr style="border: 1px solid black;"><th style="border: 1px solid black; padding: 8px;">Product</th><th style="border: 1px solid black; padding: 8px;">Price (₹)</th><th style="border: 1px solid black; padding: 8px;">Quantity</th><th style="border: 1px solid black; padding: 8px;">Amount (₹)</th></tr>';
    let totalAmount = 0;

    for (let i = 0; i < productSelects.length; i++) {
        const product = productSelects[i].value;
        const quantity = quantityInputs[i].value;
        if (product) {
            const price = priceInput[i].value;
            const amount = price * quantity;
            billDetails += `<tr style="text-align: center; border: 1px solid black;"><td style="border: 1px solid black; padding: 8px;">${product}</td><td style="border: 1px solid black; padding: 8px;">${price}</td><td>${quantity}</td style="border: 1px solid black; padding: 8px;"><td style="border: 1px solid black; padding: 8px;">${amount}</td></tr>`;
            totalAmount += amount;
        }
    }

    billDetails += '</table>';

    document.getElementById('customer-details').innerHTML = `<p>Customer: ${name}</p><p>Mobile: ${mobile}</p><p>Address: ${address}</p>`;
    document.getElementById('product-details').innerHTML = billDetails;
    document.getElementById('total-amount').innerText = `Total Amount: ₹${totalAmount}`;
    document.getElementById('bill').style.display = 'block';
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    const element = document.querySelector('.bill');
    await html2canvas(element, {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.save('bill.pdf');
    });
}

function printBill() {
    const printContents = document.getElementById('bill').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}