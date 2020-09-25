const express = require("express");
const app = express();
const port = process.argv[2];
const passwordMainMail = process.argv[3];
const nodemailer = require("nodemailer");
const pdfkit = require("pdfkit");
let pdf = new pdfkit({
  autoFirstPage: true,
});
const pdfTable = require("voilab-pdf-table");
const table = new pdfTable(pdf, {
  bottomMargin: 30,
  width: 100,
  align: "center",
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "distributed.systemUPTC",
    pass: passwordMainMail,
  },
});

app.get("/dataUser", (req, res) => {
  console.log(
    "Red: " +
      req.query.red +
      ", Green: " +
      req.query.green +
      ", Blue: " +
      req.query.blue
  );
  designPDF(req.query);
  res.send("Data received successful");
});

function sendMail(pdfData, data) {
  var mailOptions = {
    from: "distributed.systemUPTC@gmail.com",
    to: data.email,
    subject: "CORREO PRUEBA DESDE NODEJS - PDF",
    text: "Este email es de prueba, y contiene un PDF como archivo adjunto.",
    attachments: [
      {
        filename: "file.pdf",
        content: pdfData,
      },
    ],
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sended: " + info.response);
    }
  });
}

function designPDF(data) {
  let buffers = [];
  pdf.on("data", buffers.push.bind(buffers));
  pdf.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    sendMail(pdfData, data);
  });

  pdf.text("REPORTE DE PIXELES", {
    align: "center",
  });
  pdf.text("\n\n\n");
  setTable(data);
  pdf.image('D:/Pictures/StockImgs/Stock2.jpg', table.width, table.height, {scale: 0.05});
  pdf.end();
}

function setTable(data) {
  table
    .addPlugin(
      new (require("voilab-pdf-table/plugins/fitcolumn"))({
        column: "description",
      })
    )
    .setColumnsDefaults({
      headerBorder: "B",
      align: "center",
    })
    // add table columns
    .addColumns([
      {
        id: "red",
        header: "Red",
        align: "center",
        width: 100,
      },
      {
        id: "green",
        header: "Green",
        align: "center",
        width: 100,
      },
      {
        id: "blue",
        header: "Blue",
        align: "center",
        width: 100,
	  },
    ])
    // add events (here, we draw headers on each new page)
    .onPageAdded(function (tb) {
      tb.addHeader();
    });
  // pdf.addPage();
  table.addBody([{ red: data.red, green: data.green, blue: data.blue }, { red: data.red, green: data.green, blue: data.blue }]);
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
