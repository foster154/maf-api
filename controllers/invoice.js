const Invoice = require('../models/invoice').Invoice;



exports.listInvoices = function(req, res, next) {
  Invoice.find({})
        .exec(function(err, invoices){
          if(err) return next(err);
          res.json(invoices);
        });
}

exports.createInvoice = function(req, res, next) {
  var invoice = new Invoice(req.body);
  invoice.save(function(err, invoice){
    if (err) return next(err);
    res.status(201);
    res.json(invoice);
  });
}

// This is a paramenter handler that preloads the invoice document if ID is present
exports.invoiceIdParam = function(req, res, next, id) {
    Invoice.findById(id, function(err, doc){
      if (err) return next(err);
      if (!doc) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
      }
      // add it to the request so it can be used by other middleware and route handlers.
      req.invoice = doc;
      return next();
    });
}

exports.getInvoice = function(req, res, next) {
  res.json(req.invoice);
}

exports.updateInvoice = function(req, res, next) {
  req.invoice.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
}

exports.deleteInvoice = function(req, res, next) {
  req.invoice.remove(function(err, invoice){
    if(err) return next(err);
    res.json(invoice);
  });
}