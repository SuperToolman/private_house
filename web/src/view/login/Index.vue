<script setup>
import {message} from "ant-design-vue";
import {useAuthStore} from "@stores/authStore";

const api = inject('api')
const router = useRouter()
const rememberPassword = ref(false)
const account = ref('')
const password = ref('')

const handleLogin = async () => {
  if (account.value && password.value) {
    try {
      // 调用登录接口
      const response = await api.adminiApi.Login(account.value, password.value);
      if (response.isSuccess) {
        const token = response.data.token;

        // 更新认证状态
        const auth = useAuthStore();
        auth.setAuth(true);
        auth.setAdmin({ 
          name: account.value, 
          token: token,
        });

        // 跳转到首页
        router.push("/");
        message.success("登录成功");
      } else {
        message.error(response.message || "登录失败");
      }
    } catch (error) {
      message.error("登录失败，请稍后重试");
    }
  } else {
    message.error("请输入账号密码");
  }
};
</script>

<template>
  <div class="login-container-wrap">
    <PhSpace class="login-container">
        <div class="left">
          <div class="left__content">
            <div class="title"><span>登 录</span></div>
            <div class="sub-title"><span>欢 迎 登 录 私 享 家 管 理 平 台</span></div>
            <div class="login-form">
              <div class="content-grid">
                <div class="input-wrap">
                  <a-input v-model:value="account" style="background:none;font-size: 16px;" :bordered="false" placeholder="请输入账号"/>
                  <UserOutlined />
                </div>
                <div class="input-wrap">
                  <a-input v-model:value="password" style="background:none;font-size: 16px;" :bordered="false" placeholder="请输入密码" type="password"/>
                  <LockOutlined />
                </div>
              </div>

              <PhSpace class="remember-password-wrap">
                <a-checkbox v-model:checked="rememberPassword" style="font-size: 12px;color: var(--text3)">记住密码</a-checkbox>
                <a style="font-size: 12px;color:#00AEEC;text-align: right">你忘记了你的密码？</a>
              </PhSpace>

              <div class="login-btn-wrap">
                <a-button type="primary" class="login-btn" style="font-size: 16px" @click="handleLogin">登录</a-button>
              </div>
            </div>
            <div class="separate">
              <a-divider style="height: 2px;font-size: 14px;color: var(--text3);font-weight: bold;">O R</a-divider>
            </div>
            <div class="other-login-wrap">
              <div class="selected-item"><PhoneOutlined style="margin-right: 7px"/><span>使用手机登录</span></div>
              <div class="selected-item"><WechatOutlined style="margin-right: 7px"/><span>使用xxx登录</span></div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="right__content">

          </div>
        </div>
    </PhSpace>
  </div>
</template>

<style scoped>
.login-container-wrap{
  height: 100vh;
  .login-container{
    height: 100%;

    .left{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;


      .left__content{
        justify-content: center;
        height: 100%;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &>*{
          width: 100%;
          text-align: center;
        }

        .title{
          font-size: 45px;
          font-weight: bold;
          color: var(--text1);
          margin-bottom: 15px;
        }
        .sub-title{
          font-size: 14px;
          color: var(--text2);
          margin-bottom: 40px;
        }

        .login-form{
          .remember-password-wrap{
            font-size: 12px;
            color: var(--text3);
            align-items: center;
            margin: 20px 0;
          }

          .login-btn-wrap{
            width: 100%;
            &>*{
              height: 40px;
              width: 100%;
              border-radius: 12px;
            }
          }

          .content-grid{
            .input-wrap{
              display: flex;
              align-items: center;
              background-color: rgba(204, 225, 250, 0.38);
              padding: 7px 15px;
              margin-bottom: 13px;
              border-radius: 12px;
              font-size: 16px;
              color: var(--text2);
            }
          }
        }

        .separate{
          margin: 20px 0;
        }

        .other-login-wrap{
          .selected-item{

            background-color: #ffffff;
            padding: 7px 15px;
            margin-bottom: 13px;
            border-radius: 12px;
            font-size: 16px;
            height: 47px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(107, 107, 107, 0.31);
            color: var(--text2);
          }
        }
      }
    }

    .right{
      height: 100%;
      border-radius: 50px 0 0 50px;
      overflow: hidden;
      .right__content{
        background-color: #00a1d6;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>