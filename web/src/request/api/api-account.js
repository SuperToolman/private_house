import myAxios from "../axios.js";

const SSOServer = "http://localhost:53001"
export default {
    SenderRegisterCode:(phone)=>{
        return myAxios({
            method:'get',
            baseURL:SSOServer,
            url:`/Account/SenderRegisterCode?phone=${phone}`
        })
    },
    LoginByEmail:(email,password)=>{
        return myAxios({
            method:'post',
            baseURL:SSOServer,
            url:`/Account/LoginByEmail?email=${email}&password=${password}`
        })
    },
    RegisterOrLoginByPhone:(phone,code)=>{
        return myAxios({
            method:'post',
            baseURL:SSOServer,
            url:`/Account/RegisterOrLoginByPhone?phone=${phone}&code=${code}`
        })
    },
}