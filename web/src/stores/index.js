import {defineStore} from 'pinia'

// Store Option
export const useAuthStore = defineStore('auth',{
    state : ()=>{//相当于data(){}
        return{//管理俩个状态 一个是是否登录成功即token是否存在，二是解析的token里面所包含的数据
            isAuthenticated:false,
            user:{}
        }
    },
    getters:{//相当于computed计算属性，通过getters对状态state进行获取
        getAuthenticated(){
            return this.isAuthenticated
        },
        getUser(){
            return this.user
        }
    },
    actions:{//相当于methods
        setAuth(isAuth){//修改当前登录状态
            if (isAuth){
                this.isAuthenticated  = isAuth;//在pinia中this指代state
            }else{
                this.isAuthenticated  = false;
            }
        },
        setUser(user) { //解析的用户
            if (user) {
                this.user = user;
            } else {
                this.user = {};
            }
        }
    }
})