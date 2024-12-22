Dùng hàm băm :
-Tạo captcha :Server tạo giá trị unique sau đó băm để tạo ra keyCaptcha , trả về cho client , kèm theo đoạn base64 
   let key = hash.update(text + process.env.CAPTCHA_SECRECT_KEY + Date.now() + Math.random()).digest('hex')

-Đăng ký thành công sẽ băm mật khẩu lưu vào database


-Class Token : 

