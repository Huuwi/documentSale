const api = require("express").Router()
const CommonController = require("../controller/common.controller.js")
const AuthController = require("../controller/auth.controller.js")
const AuthMiddleWare = require("../middleware/auth.middleware.js")
const PaymentController = require("../controller/payment.controller.js")
const SocketIoController = require("../controller/socketIo.controller.js")
const AdminController = require("../controller/admin.controller.js")
const FileDisk = require("../helper/fileDisk.helper.js")


const uploadFile = new FileDisk()
const adminController = new AdminController()
const authMiddleWare = new AuthMiddleWare()
let commonController = new CommonController()
let authController = new AuthController()
let paymentController = new PaymentController()
let socketIoController = new SocketIoController()
const mammoth = require("mammoth");


api.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})

api.get("/ping", (req, res) => {
    res.status(200).json({
        message: "ok from backend!"
    });
})


api.get("/test", (req, res) => {

    mammoth.convertToHtml({ path: "C:\\Users\\BEHAK\\Pictures\\Screenshots/aaa.png" })
        .then(result => {
            res.send(`<html><body>${result.value}</body></html>`);
        })
        .catch(err => {
            res.status(500).send("Error reading the DOCX file");
        });

})



api.use("/auth", authMiddleWare.checkInforAccessToken)
api.use("/admin", authMiddleWare.checkIsAdmin)


api.post("/getNewCaptcha", commonController.getNewCaptcha)
api.post("/login", authController.login)
api.post("/register", authController.register)
api.post("/getNewAccessToken", authController.getNewAccessToken)
api.post("/auth/getInforUser", authController.getInforUser)
api.post("/auth/changePassWord", commonController.changePassWord)
api.post("/auth/getAllDocument", authController.getAllDocument)
api.post("/auth/getBoughtDocument", authController.getBoughtDocument)

api.post("/auth/getCart", authController.getCart)
api.post("/auth/addCart", authController.addCart)

api.post("/auth/buyDocument", authController.buyDocument) // chua cap nhap quantitySold


//transaction
api.post("/auth/createPaymentLink", paymentController.createPaymentLink)
api.post("/auth/checkPayment", paymentController.checkPayment)

//socket
api.post("/auth/testSocket", socketIoController.testSocket)
api.post("/auth/chatWorld", socketIoController.chatWorld)
api.post("/auth/privateMessage", socketIoController.privateMessage)

//admin
api.post("/admin/addNewDocument", uploadFile.single("document"), adminController.addNewDocument)
api.post("/admin/deleteDocument", adminController.deleteDocument)

api.post("/addNewDocument", uploadFile.single("document"), adminController.addNewDocument)
api.post("/deleteDocument", adminController.deleteDocument)


module.exports = { api }