import axios from "axios"
const service=axios.create({
    timeout:5000,
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
})
service.interceptors.request.use(config=>{
    if(config.method=="post"){
        config.data=JSON.stringify(config.data)
    }
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token')
    }
    return config
})
service.interceptors.response.use(res=>{
    return Promise.resolve(res) 
    // res.data.status===200? : Promise.reject(res)
},err=>{
    console.log(err)
})
export default service