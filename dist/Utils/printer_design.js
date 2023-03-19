"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_thermal_printer_1 = __importStar(require("browser-thermal-printer"));
const node_printer_1 = __importDefault(require("node-printer"));
const moment_1 = __importDefault(require("moment"));
const getPrinters = () => {
    console.log('Printers:====================================');
    console.log(process.env.PRINTER_NAME, node_printer_1.default === null || node_printer_1.default === void 0 ? void 0 : node_printer_1.default.list());
    console.log('====================================');
    return node_printer_1.default.list();
};
const printContent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            // media: 'Custom.200x600mm',
            n: 1,
            q: 100
        };
        // Printer.list();
        const printer = new node_printer_1.default(process.env.PRINTER_NAME);
        printer.printBuffer(data, options);
    }
    catch (error) {
        console.log('Print error====================================');
        console.log(error === null || error === void 0 ? void 0 : error.message);
        console.log('====================================');
    }
});
const purchaseReceiptData = (data) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const printer = new browser_thermal_printer_1.default(browser_thermal_printer_1.PrinterTypes.EPSON);
    //   printer.alignCenter();
    //   await printer.printImage('./assets/olaii-logo-black-small.png');
    printer.drawLine();
    printer.alignCenter();
    //   printer.newLine();
    printer.setTextQuadArea();
    printer.println("ED Yeboah Cold Store");
    printer.setTextSize(0, 0);
    printer.println("Asafo, Near Star Oil");
    printer.println("0209860893 / 0544832925");
    printer.setTextSize(0, 0);
    printer.table([`${((_a = data === null || data === void 0 ? void 0 : data.metaData) === null || _a === void 0 ? void 0 : _a.isCredit) ? "Credit Purchase " : "Cash Sales "}#${(_b = data === null || data === void 0 ? void 0 : data.metaData) === null || _b === void 0 ? void 0 : _b.reference} `, (0, moment_1.default)(`${(_c = data === null || data === void 0 ? void 0 : data.metaData) === null || _c === void 0 ? void 0 : _c.date}`).format("YYYY-MM-DD HH:mm")]);
    printer.alignLeft();
    printer.print(`Sold by: ${(_d = data === null || data === void 0 ? void 0 : data.metaData) === null || _d === void 0 ? void 0 : _d.seller} ...  `);
    printer.alignRight();
    printer.println(` Customer: ${((_e = data === null || data === void 0 ? void 0 : data.metaData) === null || _e === void 0 ? void 0 : _e.customerName) || 'n/a'}`);
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
        { text: "#", align: browser_thermal_printer_1.TableAlign.LEFT, bold: true },
        { text: "Item", align: browser_thermal_printer_1.TableAlign.LEFT, bold: true },
        { text: "Qty", align: browser_thermal_printer_1.TableAlign.LEFT, bold: true },
        { text: "Unit(GHS)", align: browser_thermal_printer_1.TableAlign.LEFT, bold: false },
        { text: "Amt(GHS)", align: browser_thermal_printer_1.TableAlign.LEFT, bold: true }
    ]);
    printer.alignCenter();
    (_f = data === null || data === void 0 ? void 0 : data.products) === null || _f === void 0 ? void 0 : _f.forEach((val, index) => {
        printer.tableCustom([{ text: index + 1, align: browser_thermal_printer_1.TableAlign.LEFT, }, { text: val.item, align: browser_thermal_printer_1.TableAlign.LEFT, }, { text: val.qty, align: browser_thermal_printer_1.TableAlign.LEFT, }, { text: val.price, align: browser_thermal_printer_1.TableAlign.LEFT, }, { text: val.amount, align: browser_thermal_printer_1.TableAlign.LEFT, }]);
    });
    printer.newLine();
    printer.drawLine();
    printer.tableCustom([
        { text: "", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: false },
        { text: "Subtotal", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: "GHS ", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${(_g = data === null || data === void 0 ? void 0 : data.metaData) === null || _g === void 0 ? void 0 : _g.subTotal}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.tableCustom([
        { text: "", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: false },
        { text: "Amount paid", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: "GHS ", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${(_h = data === null || data === void 0 ? void 0 : data.metaData) === null || _h === void 0 ? void 0 : _h.amountPaid}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.tableCustom([
        { text: "", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: false },
        { text: "Balance", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `GHS `, align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${(_j = data === null || data === void 0 ? void 0 : data.metaData) === null || _j === void 0 ? void 0 : _j.balance}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.tableCustom([
        { text: "", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: false },
        { text: "Total", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `GHS `, align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${(_k = data === null || data === void 0 ? void 0 : data.metaData) === null || _k === void 0 ? void 0 : _k.total}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.drawLine();
    printer.tableCustom([
        { text: "*********", align: browser_thermal_printer_1.TableAlign.LEFT, cols: 10 },
        { text: "Thank you", align: browser_thermal_printer_1.TableAlign.CENTER, cols: 10, bold: true },
        { text: "*********", align: browser_thermal_printer_1.TableAlign.RIGHT, cols: 10 }
    ]);
    // printer.openCashDrawer();
    //   console.log('====================================');
    //   console.log("Text is: ",printer.getText());
    //   console.log('====================================');
    //    printer.newLine();
    printer.partialCut();
    return printer.getText();
    // Print raw
    //   console.log(printer.getText());
};
const paymentPrintView = (data) => {
    const printer = new browser_thermal_printer_1.default(browser_thermal_printer_1.PrinterTypes.EPSON);
    //   printer.alignCenter();
    //   await printer.printImage('./assets/olaii-logo-black-small.png');
    printer.drawLine();
    printer.alignCenter();
    //   printer.newLine();
    printer.setTextQuadArea();
    printer.println("ED Yeboah Cold Store");
    printer.setTextSize(0, 0);
    printer.println("Asafo, Near Star Oil");
    printer.println("0209860893 / 0544832925");
    printer.setTextSize(0, 0);
    printer.table([`Payment #${data === null || data === void 0 ? void 0 : data.reference} `, (0, moment_1.default)(`${data === null || data === void 0 ? void 0 : data.date}`).format("YYYY-MM-DD HH:mm")]);
    printer.alignLeft();
    printer.print(`${data === null || data === void 0 ? void 0 : data.seller} ...  `);
    printer.alignRight();
    printer.println(` Customer: ${(data === null || data === void 0 ? void 0 : data.customerName) || 'n/a'}`);
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
        { text: "Previous balance", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.5, bold: true },
        { text: "GHS ", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${data === null || data === void 0 ? void 0 : data.previousBalance}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.tableCustom([
        { text: "Amount paid", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.5, bold: true },
        { text: "GHS ", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${data === null || data === void 0 ? void 0 : data.amountPaid}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.tableCustom([
        { text: "Amount owing", align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.5, bold: true },
        { text: `GHS `, align: browser_thermal_printer_1.TableAlign.RIGHT, width: 0.25, bold: true },
        { text: `${data === null || data === void 0 ? void 0 : data.balance}`, align: browser_thermal_printer_1.TableAlign.LEFT, width: 0.25, bold: true }
    ]);
    printer.drawLine();
    printer.tableCustom([
        { text: "*********", align: browser_thermal_printer_1.TableAlign.LEFT, cols: 10 },
        { text: "Thank you", align: browser_thermal_printer_1.TableAlign.CENTER, cols: 10, bold: true },
        { text: "*********", align: browser_thermal_printer_1.TableAlign.RIGHT, cols: 10 }
    ]);
    // printer.openCashDrawer();
    //   console.log('====================================');
    //   console.log("Text is: ",printer.getText());
    //   console.log('====================================');
    //    printer.newLine();
    printer.partialCut();
    return printer.getText();
    // Print raw
    //   console.log(printer.getText());
};
exports.default = {
    purchaseReceiptData,
    paymentPrintView,
    printContent,
    getPrinters
};
//# sourceMappingURL=printer_design.js.map