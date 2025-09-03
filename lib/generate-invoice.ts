// Simple PDF invoice generator using client-side JS
export function generateInvoice(invoiceData: {
  id: string
  date: string
  amount: string
  company: string
  address: string
  items: Array<{ description: string; amount: string }>
}): Blob {
  // Create a simple HTML invoice
  const invoiceHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Invoice ${invoiceData.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
        }
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
          border-collapse: collapse;
        }
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <div style="font-weight: bold; color: #f43f5e;">Cretio</div>
                  </td>
                  <td style="text-align: right;">
                    Invoice #: ${invoiceData.id}<br />
                    Created: ${invoiceData.date}<br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Cretio, Inc.<br />
                    123 Business Street<br />
                    San Francisco, CA 94107
                  </td>
                  <td style="text-align: right;">
                    ${invoiceData.company}<br />
                    ${invoiceData.address}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="heading">
            <td>Item</td>
            <td style="text-align: right;">Price</td>
          </tr>
          ${invoiceData.items
            .map(
              (item) => `
            <tr class="item">
              <td>${item.description}</td>
              <td style="text-align: right;">${item.amount}</td>
            </tr>
          `,
            )
            .join("")}
          <tr class="total">
            <td></td>
            <td style="text-align: right;">Total: ${invoiceData.amount}</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `

  // Convert HTML to Blob
  const blob = new Blob([invoiceHtml], { type: "text/html" })
  return blob
}