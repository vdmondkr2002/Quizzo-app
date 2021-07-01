const nodemailer = require('nodemailer')
const sendEmail = async(mailData)=>{
    const {subject,receiverMail} = mailData

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.ADMIN1_EMAIL,
          pass: process.env.ADMIN1_PASS,
        },
    });
    
    var mailOptions;
    if(mailData.html){
        mailOptions = {
            from:process.env.ADMIN1_EMAIL,
            to:receiverMail,
            subject:subject,
            html:mailData.html
        }
    }else{
        const mailOptions = {
            from:process.env.ADMIN1_EMAIL,
            to:receiverMail,
            subject:subject,
            text:mailData.body
        }
    }
    

    
    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail sendt')
    }catch(err){
        console.log(err)
    }
}
module.exports = sendEmail