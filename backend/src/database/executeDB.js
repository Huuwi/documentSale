const { Connection } = require("../database/connection.js")
require("dotenv").config({ path: "../../.env" })
const fs = require("fs")
const FileDisk = require("../helper/fileDisk.helper.js")
const main = async () => {
    let connection = new Connection()
    await connection.connect()

    // await connection.executeQuery(`CREATE TABLE user (
    // userId int primary key NOT NULL AUTO_INCREMENT,
    // userName varchar(30) not null,
    // passWord varchar(100) not null ,
    // nickName varchar(30) CHARACTER SET utf8mb4,
    // avartar varchar(255) default 'https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276205531.jpg',
    // isAdmin boolean default 0,
    // balance double default 0 
    // );`)


    // await connection.executeQuery(`CREATE TABLE document (
    // documentId int primary key NOT NULL AUTO_INCREMENT,
    // name text  CHARACTER SET utf8mb4,
    // author varchar(100) CHARACTER SET utf8mb4 ,
    // description text CHARACTER SET utf8mb4,
    // image varchar(1024) default 'https://th.bing.com/th/id/OIP.ssgniUaZGeguCb9lES1obQHaHa?rs=1&pid=ImgDetMain',
    // price double default 200,
    // quantitySold int default 0,
    // filePath text  CHARACTER SET utf8mb4,
    // type int default 1
    // );`)


    // await connection.executeQuery(`CREATE TABLE comment (
    //     commentId int primary key NOT NULL AUTO_INCREMENT,
    //     userId int,
    //     content text CHARACTER SET utf8mb4,
    //     vote int,
    //     documentId int
    //     );`)

    // await connection.executeQuery(`CREATE TABLE boughtDocument (
    //         boughtDocumentId int primary key NOT NULL AUTO_INCREMENT,
    //         userId int,
    //         documentId int
    //         );`)

    // await connection.executeQuery(`CREATE TABLE cart (
    //             cartId int primary key NOT NULL AUTO_INCREMENT,
    //             userId int,
    //             documentId int
    //             );`)



    // await connection.executeQuery(`CREATE TABLE payment (
    //     paymentId int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //     userId int,
    //     amount double,
    //     transId varchar(100)
    // );`);


    //-----------------------------------------------------------------------------------------------------------------------------------

    // await connection.executeQuery(`insert into user (userName,passWord,nickName,isAdmin,balance) values (?,?,?,?,?)`, ["admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "admin", true, 999999999])

    // await connection.executeQuery(`insert into user (userName,passWord,nickName,isAdmin,balance) values (?,?,?,?,?)`, ["user1", "user1", "user1", false, 2000])

    // await connection.executeQuery('delete from user where userId = 7')
    //     .then((data) => {
    //         console.log(data);
    //     })



    await connection.executeQuery('select * from document')
        .then((data) => {
            console.log(data);
        })

    // await connection.executeQuery("drop table document")
    // await FileDisk.asyncFileWithDB()



    await connection.disconnect()




}

main()