var express = require('express');
var router = express.Router();
var pdfKit = require('pdfkit');     // Basic library...
var pdf = require('html-pdf');      // Html Convert to Pdf...
var fs = require('fs');






/*  The post is expecting a form element (json) for field 'Html' that it creates as a pdf... */
router.post('/HtmlToPdf', function (req, res, next) {
    
    if (!req.body.Html) {
        return console.log("Missing post data - Html field.");
    }
    
    var html = req.body.Html;
    
    console.log("HTML: " + html);
    
    var options = {
        format: 'Letter',
        type: "pdf",             // allowed file types: png, jpeg, pdf
    };
    
    pdf.create(html).toStream(function (err, stream) {
        if (err) {
            return console.log(err);
        } else {
            console.log(res);
        }
        
        return stream.pipe(res);
    });
    

});







/* Test pdfKit */
router.get('/test', function (req, res, next) {

    var text = 'Order';
    var pdfpath = __dirname + '/../test.pdf';
    var imgpath = __dirname + '/../public/images/logo.png';

    doc = new pdfKit();                                      
  
    doc.image(imgpath, 0, 15, 'width: 225');
    doc.moveDown();
    
   // doc.moveTo(0, 20)                               # set the current point
    doc.lineTo(100, 160); //                            # draw a line
       //.quadraticCurveTo(130, 200, 150, 120)        # draw a quadratic curve
       //.bezierCurveTo(190, -40, 200, 200, 300, 150) # draw a bezier curve
       //.lineTo(400, 90)                             # draw another line
       //.stroke()                                    # stroke the path

    doc.moveDown();

    //to write the content on the file system
    doc.text(text); //, 100, 100);             //adding the text to be written, 
    doc.moveDown();
    doc.text(text);
    doc.moveDown();
    doc.lineTo(100, 160);
    // more things can be added here including new pages
    doc.end(); //we end the document writing.
    

    return doc.pipe(res);

});





/* Get test doc */
router.get('/html', function (req, res, next) {
    
   
    var html = fs.readFileSync('public/views/nov.html', 'utf8');
    var options = { format: 'Letter' };
 

    pdf.create(html).toStream(function (err, stream) {
        if (err) return console.log(err);
        
        console.log(res);
    
        return stream.pipe(res);

    });
    

});







module.exports = router;