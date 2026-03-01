# Payment Slip Generator

A professional web-based payment slip generator that allows you to create, preview, and download payment slips instantly.

## Features

✅ **No Database Required** - Everything works on the frontend
✅ **Live Preview** - See changes in real-time as you type
✅ **Automatic Calculations** - Auto-calculates totals, discounts, and taxes
✅ **Flexible Tax Options** - Choose between IGST 18% or CGST 9% + SGST 9%
✅ **Multiple Export Options** - Download as PDF, Image (PNG), or Print directly
✅ **Professional Design** - Clean white background with professional styling
✅ **Fully Responsive** - Works on desktop, tablet, and mobile devices

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)

2. **Fill in the Details**
   - **Business Information**: Update shop name, GST number, address, and contact
   - **Order Details**: Enter order ID, date, and customer information
   - **Product Information**: Add product name, quantity, unit price, and discount
   - **Tax & Payment**: Select tax type and payment method

3. **Live Preview**
   - The payment slip updates automatically as you type
   - All calculations are done instantly

4. **Download or Print**
   - Click **Print** to print the slip directly
   - Click **Download PDF** to save as PDF file
   - Click **Download Image** to save as PNG image

## Tax Calculation

- **IGST (Interstate)**: 18% on the amount after discount
- **CGST + SGST (Intrastate)**: 9% CGST + 9% SGST on the amount after discount

## Calculation Formula

```
Subtotal = Quantity × Unit Price
Discount Amount = Subtotal × (Discount % / 100)
Amount After Discount = Subtotal - Discount Amount
Tax = Amount After Discount × Tax Rate
Total Amount = Amount After Discount + Tax
```

## File Structure

```
slip generator/
├── index.html     # Main HTML file with form and preview
├── style.css      # Styling and responsive design
├── script.js      # JavaScript for calculations and exports
└── README.md      # This file
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Business logic and calculations
- **html2canvas** - For capturing slip as image
- **jsPDF** - For PDF generation

## Browser Compatibility

Works on all modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## Customization

You can customize the following:
- Default shop name and details
- Color scheme (in `style.css`)
- Tax rates (in `script.js`)
- Additional fields (in `index.html`)

## Notes

- All data is temporary and stored only in the browser session
- No data is sent to any server
- You can modify the fixed business information for each slip
- The slip has a clean white background suitable for printing

## Support

For any issues or customization requests, please review the code comments in each file.

---

**Created with ❤️ for easy payment slip generation**
