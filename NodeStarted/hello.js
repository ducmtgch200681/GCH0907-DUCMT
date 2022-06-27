console.log("Hello world!")

function XinChao(ten){
    console.log("Hello " + ten)
}
ten1 = "Cuong"
XinChao("Phuong")
for (i=1; i<4; i++){
    XinChao(ten1)
}
for (i = 0; i < ten1.length; i++){
    console.log(ten1[i] + '\n')
}

console.log(isNaN("123p"))
let ten2 = "Cuong$123"
for (i = 0; i < ten2.length; i++){
    if (isNaN (ten2[i])) {
        console.log(ten2[i] + ' Khong phai la so')

    }
    else{
        console.log(ten2[i] + ' la so')
    }
}

let color = "Xanh;Do;Hong;Tim"
let mang = color.split(";")
for (i = 0; i < mang.length; i++){
    console.log(mang[i].toUpperCase)
}
