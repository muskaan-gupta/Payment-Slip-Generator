// Products array to store multiple products
let products = [];
let productIdCounter = 0;

// Initialize with current date
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('orderDate').value = today;
    
    // Add first product by default
    addProduct();
    
    // Add real-time update listeners
    addRealtimeListeners();
    
    // Initial preview update
    updatePreview();
});

// Add real-time listeners to all input fields
function addRealtimeListeners() {
    const inputs = document.querySelectorAll('input:not([data-product]), select:not([data-product]), textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });
    
    // Add validation for customer name (only letters and spaces)
    const customerNameInput = document.getElementById('customerName');
    customerNameInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });
    
    // Add validation for customer phone (only numbers and basic phone characters)
    const customerPhoneInput = document.getElementById('customerPhone');
    customerPhoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
    });
}

// Add a new product
function addProduct() {
    const productId = productIdCounter++;
    products.push({ id: productId, name: '', quantity: 1, price: 0 });
    
    const container = document.getElementById('productsContainer');
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.id = `product-${productId}`;
    
    productDiv.innerHTML = `
        <div class="product-header">
            <strong>Product ${products.length}</strong>
            <button type="button" class="btn-remove-product" onclick="removeProduct(${productId})">Remove</button>
        </div>
        <label>Product Name</label>
        <input type="text" data-product="${productId}" data-field="name" placeholder="Enter product name" required>
        
        <label>Quantity</label>
        <input type="number" data-product="${productId}" data-field="quantity" value="1" min="1" required>
        
        <label>Unit Price (₹)</label>
        <input type="number" data-product="${productId}" data-field="price" placeholder="Enter unit price" step="0.01" min="0" required>
    `;
    
    container.appendChild(productDiv);
    
    // Add event listeners to the new product inputs
    productDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            updateProductData(productId, input.dataset.field, input.value);
        });
    });
    
    updatePreview();
}

// Remove a product
function removeProduct(productId) {
    if (products.length <= 1) {
        alert('At least one product is required!');
        return;
    }
    
    // Remove from array
    products = products.filter(p => p.id !== productId);
    
    // Remove from DOM
    const productDiv = document.getElementById(`product-${productId}`);
    productDiv.remove();
    
    // Update product numbers
    updateProductNumbers();
    updatePreview();
}

// Update product numbers in the UI
function updateProductNumbers() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        const header = item.querySelector('.product-header strong');
        if (header) {
            header.textContent = `Product ${index + 1}`;
        }
    });
}

// Update product data in array
function updateProductData(productId, field, value) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (field === 'name') {
            product.name = value;
        } else if (field === 'quantity') {
            product.quantity = parseFloat(value) || 0;
        } else if (field === 'price') {
            product.price = parseFloat(value) || 0;
        }
        updatePreview();
    }
}

// Main function to update preview
function updatePreview() {
    // Get form values
    const shopName = document.getElementById('shopName').value || 'ADA AROMAS OPC PVT LTD';
    const gstNumber = document.getElementById('gstNumber').value || '06ABDCA3412B1ZH';
    const shopAddress = document.getElementById('shopAddress').value || 'S.C.O. 6, 2nd Floor, Swastik Vihar, Mansa Devi Complex, Sector 5 Panchkula Haryana: 134114';
    const shopPhone = document.getElementById('shopPhone').value || '+91 9876753198';
    const shopEmail = document.getElementById('shopEmail').value || 'admin@adaaromas.co.in';
    
    const orderId = document.getElementById('orderId').value || 'ORD-177230914810';
    const orderDate = document.getElementById('orderDate').value;
    const customerName = document.getElementById('customerName').value || 'Customer Name';
    const customerPhone = document.getElementById('customerPhone').value || 'Phone';
    const customerAddress = document.getElementById('customerAddress').value || 'Address';
    
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const taxType = document.getElementById('taxType').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('notes').value;
    
    // Format date
    const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) : '2026-02-28';
    
    // Update business info
    document.getElementById('previewShopName').textContent = shopName;
    document.getElementById('previewShopAddress').textContent = shopAddress;
    document.getElementById('previewGST').textContent = gstNumber;
    document.getElementById('previewShopPhone').textContent = shopPhone;
    document.getElementById('previewEmail').textContent = shopEmail;
    
    // Update order info
    document.getElementById('previewOrderId').textContent = orderId;
    document.getElementById('previewDate').textContent = formattedDate;
    
    // Update customer info
    document.getElementById('previewCustomerName').textContent = customerName;
    document.getElementById('previewCustomerPhone').textContent = customerPhone;
    document.getElementById('previewCustomerAddress').textContent = customerAddress;
    
    // Update products table
    const tableBody = document.getElementById('previewProductsTable');
    tableBody.innerHTML = '';
    
    let subtotal = 0;
    
    products.forEach(product => {
        const productTotal = product.quantity * product.price;
        subtotal += productTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name || 'Product Name'}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price.toFixed(2)}</td>
            <td>₹${productTotal.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Calculate discount
    const discountAmount = (subtotal * discount) / 100;
    const afterDiscount = subtotal - discountAmount;
    
    // Calculate tax based on type
    let tax1 = 0, tax2 = 0;
    let tax1Label = '', tax2Label = '';
    
    if (taxType === 'igst') {
        tax1 = afterDiscount * 0.18; // IGST 18%
        tax1Label = 'IGST (18%)';
        document.getElementById('taxRow2').style.display = 'none';
    } else {
        tax1 = afterDiscount * 0.09; // CGST 9%
        tax2 = afterDiscount * 0.09; // SGST 9%
        tax1Label = 'CGST (9%)';
        tax2Label = 'SGST (9%)';
        document.getElementById('taxRow2').style.display = 'flex';
    }
    
    const totalTax = tax1 + tax2;
    const totalAmount = afterDiscount + totalTax;
    
    // Update calculations in preview
    document.getElementById('previewSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('previewDiscountPercent').textContent = discount;
    document.getElementById('previewDiscountAmount').textContent = discountAmount.toFixed(2);
    document.getElementById('previewAfterDiscount').textContent = afterDiscount.toFixed(2);
    
    // Show/hide discount row
    const discountRow = document.getElementById('discountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
    } else {
        discountRow.style.display = 'none';
    }
    
    // Update tax labels and values
    document.getElementById('taxLabel1').textContent = tax1Label + ':';
    document.getElementById('taxValue1').textContent = tax1.toFixed(2);
    
    if (taxType === 'cgst_sgst') {
        document.getElementById('taxLabel2').textContent = tax2Label + ':';
        document.getElementById('taxValue2').textContent = tax2.toFixed(2);
    }
    
    // Update total amount
    document.getElementById('previewTotalAmount').textContent = totalAmount.toFixed(2);
    
    // Update payment info
    document.getElementById('previewPaymentMethod').textContent = paymentMethod;
    
    // Update notes
    const notesSection = document.getElementById('notesSection');
    if (notes.trim()) {
        notesSection.style.display = 'block';
        document.getElementById('previewNotes').textContent = notes;
    } else {
        notesSection.style.display = 'none';
    }
}

// Print function
function printSlip() {
    window.print();
}

// Download as PDF
function downloadPDF() {
    const slip = document.getElementById('paymentSlip');
    const orderId = document.getElementById('orderId').value || 'slip';
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = 'Generating PDF...';
    loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px 40px;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:10000;font-size:1.2rem;font-weight:bold;color:#667eea;';
    document.body.appendChild(loadingMsg);
    
    // Use html2canvas to capture the slip
    html2canvas(slip, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        
        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        // Calculate image dimensions to fit A4
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;
        
        // Calculate scaled dimensions to fit on single page with margins
        let finalWidth = pdfWidth - 10; // 5mm margin on each side
        let finalHeight = finalWidth / ratio;
        
        // If height exceeds page height, scale down further
        if (finalHeight > pdfHeight - 10) {
            finalHeight = pdfHeight - 10; // 5mm margin top and bottom
            finalWidth = finalHeight * ratio;
        }
        
        // Center the content
        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;
        
        // Create PDF with single page
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
        
        // Save PDF
        pdf.save(`payment-slip-${orderId}.pdf`);
        
        // Remove loading message
        document.body.removeChild(loadingMsg);
        
        // Show success message
        showMessage('PDF downloaded successfully!', 'success');
    }).catch(error => {
        console.error('Error generating PDF:', error);
        document.body.removeChild(loadingMsg);
        showMessage('Error generating PDF. Please try again.', 'error');
    });
}

// Download as Image
function downloadImage() {
    const slip = document.getElementById('paymentSlip');
    const orderId = document.getElementById('orderId').value || 'slip';
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = 'Generating Image...';
    loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px 40px;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:10000;font-size:1.2rem;font-weight:bold;color:#667eea;';
    document.body.appendChild(loadingMsg);
    
    // Use html2canvas to capture the slip
    html2canvas(slip, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `payment-slip-${orderId}.png`;
            link.click();
            
            // Clean up
            URL.revokeObjectURL(url);
            document.body.removeChild(loadingMsg);
            
            // Show success message
            showMessage('Image downloaded successfully!', 'success');
        }, 'image/png');
    }).catch(error => {
        console.error('Error generating image:', error);
        document.body.removeChild(loadingMsg);
        showMessage('Error generating image. Please try again.', 'error');
    });
}

// Show message notification
function showMessage(message, type) {
    const msg = document.createElement('div');
    msg.textContent = message;
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(msg);
    
    // Remove after 3 seconds
    setTimeout(() => {
        msg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(msg);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
