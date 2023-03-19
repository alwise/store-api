import ThermalPrinter, { PrinterTypes, TableAlign } from "browser-thermal-printer";
import Printer from 'node-printer'
import moment from 'moment';

const getPrinters = () => {
  console.log('Printers:====================================');
  console.log(process.env.PRINTER_NAME, Printer?.list());
  console.log('====================================');
  return Printer.list();
}

const printContent = async (data: any) => {
  try {
    const options = {
      // media: 'Custom.200x600mm',
      n: 1,
      q: 100
    };
    // Printer.list();
    const printer = new Printer(process.env.PRINTER_NAME);
    printer.printBuffer(data, options);
  } catch (error) {
    console.log('Print error====================================');
    console.log(error?.message);
    console.log('====================================');
  }
}

const purchaseReceiptData = (data: any) => {
  const printer = new ThermalPrinter(PrinterTypes.EPSON);
  //   printer.alignCenter();
  //   await printer.printImage('./assets/olaii-logo-black-small.png');
  printer.drawLine();
  printer.alignCenter();
  //   printer.newLine();
  printer.setTextQuadArea();
  printer.println("ED Yeboah Cold Store");
  printer.setTextSize(0, 0)
  printer.println("Asafo, Near Star Oil");
  printer.println("0209860893 / 0544832925");
  printer.setTextSize(0, 0);
  printer.table([`${data?.metaData?.isCredit ? "Credit Purchase " : "Cash Sales "}#${data?.metaData?.reference} `, moment(`${data?.metaData?.date}`).format("YYYY-MM-DD HH:mm")]);
  printer.alignLeft();
  printer.print(`Sold by: ${data?.metaData?.seller} ...  `);
  printer.alignRight();
  printer.println(` Customer: ${data?.metaData?.customerName || 'n/a'}`);
  printer.alignCenter();
  printer.drawLine();


  //   printer.upsideDown(true);
  //   printer.println("Hello World upside down!");
  //   printer.upsideDown(false);
  //   printer.drawLine();

  //   printer.invert(true);
  //   printer.println("Hello World inverted!");
  //   printer.invert(false);
  //   printer.drawLine();

  //   printer.println("Special characters");
  //   printer.drawLine();

  //   printer.setTypeFontB();
  //   printer.println("Type font B");
  //   printer.setTypeFontA();
  //   printer.println("Type font A");
  //   printer.drawLine();

  //   printer.alignLeft();
  //   printer.println("This text is on the left");
  //   printer.alignCenter();
  //   printer.println("This text is in the middle");
  //   printer.alignRight();
  //   printer.println("This text is on the right");
  //   printer.alignLeft();
  //   printer.drawLine();

  //   printer.setTextDoubleHeight();
  //   printer.println("This is double height");
  //   printer.setTextDoubleWidth();
  //   printer.println("This is double width");
  //   printer.setTextQuadArea();
  //   printer.println("This is quad");
  //   printer.setTextSize(7,7);
  //   printer.println("Wow");
  //   printer.setTextSize(0,0);
  //   printer.setTextNormal();
  //   printer.println("This is normal");
  //   printer.drawLine();

  //   try {
  //     printer.printBarcode("4126570807191");
  // printer.code128("4126570807191", {
  //   height: 50,
  //   text: 1
  // });
  //     printer.beep();
  //   } catch (error) {
  //     console.error('Error here: ',error?.message);
  //   }

  //   printer.pdf417("4126565129008670807191");
  //   printer.printQR("https://olaii.com");

  printer.newLine();

  //   printer.leftRight("Left", "Right");

  //   printer.table(["#", "Item","Qty", "Price(GHS)"]);
  printer.tableCustom([
    { text: "#", align: TableAlign.LEFT, bold: true },
    { text: "Item", align: TableAlign.LEFT, bold: true },
    { text: "Qty", align: TableAlign.LEFT, bold: true },
    { text: "Unit(GHS)", align: TableAlign.LEFT, bold: false },
    { text: "Amt(GHS)", align: TableAlign.LEFT, bold: true }
  ]);
  printer.alignCenter();
  data?.products?.forEach((val, index) => {
    printer.tableCustom([{ text: index + 1, align: TableAlign.LEFT, }, { text: val.item, align: TableAlign.LEFT, }, { text: val.qty, align: TableAlign.LEFT, }, { text: val.price, align: TableAlign.LEFT, }, { text: val.amount, align: TableAlign.LEFT, }]);
  })
  printer.newLine();
  printer.drawLine();

  printer.tableCustom([
    { text: "", align: TableAlign.RIGHT, width: 0.25, bold: false },
    { text: "Subtotal", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: "GHS ", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.metaData?.subTotal}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.tableCustom([
    { text: "", align: TableAlign.RIGHT, width: 0.25, bold: false },
    { text: "Amount paid", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: "GHS ", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.metaData?.amountPaid}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.tableCustom([
    { text: "", align: TableAlign.RIGHT, width: 0.25, bold: false },
    { text: "Balance", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `GHS `, align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.metaData?.balance}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.tableCustom([
    { text: "", align: TableAlign.RIGHT, width: 0.25, bold: false },
    { text: "Total", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `GHS `, align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.metaData?.total}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.drawLine();

  printer.tableCustom([
    { text: "*********", align: TableAlign.LEFT, cols: 10 },
    { text: "Thank you", align: TableAlign.CENTER, cols: 10, bold: true },
    { text: "*********", align: TableAlign.RIGHT, cols: 10 }
  ]);

  // printer.openCashDrawer();
  //   console.log('====================================');
  //   console.log("Text is: ",printer.getText());
  //   console.log('====================================');
  //    printer.newLine();
  printer.partialCut()
  return printer.getText();



  // Print raw
  //   console.log(printer.getText());
}

const paymentPrintView = (data: any) => {
  const printer = new ThermalPrinter(PrinterTypes.EPSON);
  //   printer.alignCenter();
  //   await printer.printImage('./assets/olaii-logo-black-small.png');
  printer.drawLine();
  printer.alignCenter();
  //   printer.newLine();
  printer.setTextQuadArea();
  printer.println("ED Yeboah Cold Store");
  printer.setTextSize(0, 0)
  printer.println("Asafo, Near Star Oil");
  printer.println("0209860893 / 0544832925");
  printer.setTextSize(0, 0);
  printer.table([`Payment #${data?.reference} `, moment(`${data?.date}`).format("YYYY-MM-DD HH:mm")]);
  printer.alignLeft();
  printer.print(`${data?.seller} ...  `);
  printer.alignRight();
  printer.println(` Customer: ${data?.customerName || 'n/a'}`);
  printer.alignCenter();
  printer.drawLine();


  //   printer.upsideDown(true);
  //   printer.println("Hello World upside down!");
  //   printer.upsideDown(false);
  //   printer.drawLine();

  //   printer.invert(true);
  //   printer.println("Hello World inverted!");
  //   printer.invert(false);
  //   printer.drawLine();

  //   printer.println("Special characters");
  //   printer.drawLine();

  //   printer.setTypeFontB();
  //   printer.println("Type font B");
  //   printer.setTypeFontA();
  //   printer.println("Type font A");
  //   printer.drawLine();

  //   printer.alignLeft();
  //   printer.println("This text is on the left");
  //   printer.alignCenter();
  //   printer.println("This text is in the middle");
  //   printer.alignRight();
  //   printer.println("This text is on the right");
  //   printer.alignLeft();
  //   printer.drawLine();

  //   printer.setTextDoubleHeight();
  //   printer.println("This is double height");
  //   printer.setTextDoubleWidth();
  //   printer.println("This is double width");
  //   printer.setTextQuadArea();
  //   printer.println("This is quad");
  //   printer.setTextSize(7,7);
  //   printer.println("Wow");
  //   printer.setTextSize(0,0);
  //   printer.setTextNormal();
  //   printer.println("This is normal");
  //   printer.drawLine();

  //   try {
  //     printer.printBarcode("4126570807191");
  // printer.code128("4126570807191", {
  //   height: 50,
  //   text: 1
  // });
  //     printer.beep();
  //   } catch (error) {
  //     console.error('Error here: ',error?.message);
  //   }

  //   printer.pdf417("4126565129008670807191");
  //   printer.printQR("https://olaii.com");

  printer.newLine();

  //   printer.leftRight("Left", "Right");

  //   printer.table(["#", "Item","Qty", "Price(GHS)"]);
  //   printer.tableCustom([
  //       { text:"#", align:TableAlign.LEFT, bold:true },
  //       { text:"Item", align:TableAlign.LEFT, bold:true },
  //       { text:"Qty", align:TableAlign.LEFT, bold:true },
  //       { text:"Unit(GHS)", align:TableAlign.LEFT,bold:false },
  //       { text:"Amt(GHS)", align:TableAlign.LEFT, bold:true }
  //   ]);
  printer.alignCenter();
  //  data?.products?.forEach((val,index)=>{
  //   printer.tableCustom([{text:index+1,align:TableAlign.LEFT,}, {text:val.item,align:TableAlign.LEFT,},{text:val.qty,align:TableAlign.LEFT,}, {text:val.price,align:TableAlign.LEFT,},{text:val.amount,align:TableAlign.LEFT,}]);
  //  })
  //  printer.newLine();
  //  printer.drawLine();

  printer.tableCustom([
    { text: "Previous balance", align: TableAlign.RIGHT, width: 0.5, bold: true },
    { text: "GHS ", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.previousBalance}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.tableCustom([
    { text: "Amount paid", align: TableAlign.RIGHT, width: 0.5, bold: true },
    { text: "GHS ", align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.amountPaid}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.tableCustom([
    { text: "Amount owing", align: TableAlign.RIGHT, width: 0.5, bold: true },
    { text: `GHS `, align: TableAlign.RIGHT, width: 0.25, bold: true },
    { text: `${data?.balance}`, align: TableAlign.LEFT, width: 0.25, bold: true }
  ]);

  printer.drawLine();

  printer.tableCustom([
    { text: "*********", align: TableAlign.LEFT, cols: 10 },
    { text: "Thank you", align: TableAlign.CENTER, cols: 10, bold: true },
    { text: "*********", align: TableAlign.RIGHT, cols: 10 }
  ]);

  // printer.openCashDrawer();
  //   console.log('====================================');
  //   console.log("Text is: ",printer.getText());
  //   console.log('====================================');
  //    printer.newLine();
  printer.partialCut()
  return printer.getText();



  // Print raw
  //   console.log(printer.getText());
}


export default {
  purchaseReceiptData,
  paymentPrintView,
  printContent,
  getPrinters
}