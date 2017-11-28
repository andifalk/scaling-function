var Jimp = require("jimp");

module.exports = function (context, originalImage) {
    context.log("JavaScript blob trigger function processed blob \n Name:", 
        context.bindingData.name, "\n Blob Size:", originalImage.length, "Bytes");
    context.log("Type:", typeof originalImage);    
    
    
    Jimp.read(originalImage, function (error, image) {

        context.log("Start reading image");    

        if (error) {
            context.log(`There was an error processing the image.`);
            context.done(error);
        }
        context.log(`Start processing the image...`);
        image.resize(256, 256)            
            .getBuffer(Jimp.AUTO, (error, stream) => {

                if (error) {
                    context.log(`There was an error processing the image.`);
                    context.done(error);
                }
                else {
                    context.log(`Successfully processed the image`);

                    context.done(null, stream);
                }

            });
            
    }).catch(function (error) {
        context.log(`There was an error processing the image.`);
        context.done(error);
    });

};