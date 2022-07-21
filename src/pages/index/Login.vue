<template>
  <div class="login-page">
    <img src="@/assets/images/login-logo.png" alt="" class="login-logo" />
    <div class="login-wrapper">
      <div class="login-top">
        欢迎登录
      </div>
      <div class="login-form">
        <t-form
          labelAlign="top"
          :data="formData"
          :rules="rules"
          ref="form"
          @submit="submit"
        >
          <t-form-item label="账号" name="loginName" initialData="">
            <t-input v-model="formData.loginName" placeholder="请输入账号" />
          </t-form-item>
          <t-form-item label="密码" name="password" initialData="">
            <t-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
            />
          </t-form-item>
          <div class="captcha">
            <div class="captcha-form">
              <t-form-item label="验证码" name="code" initialData="">
                <t-input v-model="formData.code" placeholder="请输入验证码" />
              </t-form-item>
            </div>
            <div class="captcha-img" @click="getCaptcha">
              <img :src="captcha" alt="" />
            </div>
          </div>
          <div class="check-wrapper">
            <t-checkbox-group v-model="rememberPassword">
              <t-checkbox :value="1">记住密码</t-checkbox>
            </t-checkbox-group>
            <t-checkbox-group v-model="autoLogin">
              <t-checkbox :value="1">自动登录</t-checkbox>
            </t-checkbox-group>
          </div>
          <t-form-item>
            <t-button theme="primary" type="submit" block>登录</t-button>
          </t-form-item>
        </t-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, login } from "@/service/apis";
import { MessagePlugin } from "tdesign-vue";
import md5 from "js-md5";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";

export default {
  data() {
    return {
      captcha: "",
      formData: {
        loginName: "",
        password: "",
        captchakey: "",
        code: "",
      },
      rules: {
        loginName: [
          {
            required: true,
            message: "请输入账号",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
        ],
      },
      rememberPassword: [1],
      autoLogin: [1],
    };
  },

  mounted() {
    if (getLocalStorage("rememberPassword")) {
      this.$set(this.formData, "loginName", getLocalStorage("loginName"));
      this.$set(this.formData, "password", getLocalStorage("password"));
    } else {
      this.$set(this.formData, "loginName", "");
      this.$set(this.formData, "password", "");
    }
    this.getCaptcha();
  },

  methods: {
    async submit({ validateResult, firstError }) {
      if (validateResult === true) {
        const params = {
          ...this.formData,
          password: md5(this.formData.password),
        };
        const {
          data: { errorCode, errorMessage, data: userInfo } = {},
        } = await login(params);
        if (errorCode === 0) {
          MessagePlugin.success("登录成功");
          if (this.rememberPassword.length > 0) {
            setLocalStorage("password", this.formData.password);
            setLocalStorage("loginName", this.formData.loginName);
            setLocalStorage("rememberPassword", true);
          } else {
            setLocalStorage("password", "");
            setLocalStorage("loginName", "");
            setLocalStorage("rememberPassword", false);
          }
          if (this.autoLogin.length > 0) {
            setLocalStorage("autoLogin", true);
          } else {
            setLocalStorage("autoLogin", false);
          }
          setLocalStorage("userInfo", userInfo);
          this.$router.push("/index");
        } else {
          MessagePlugin.success(errorMessage);
        }
      } else {
        MessagePlugin.warning(firstError);
      }
    },

    async getCaptcha() {
      const { headers, data } = await getCaptcha();
      const { captchakey } = headers;
      let reader = new FileReader();
      reader.readAsDataURL(data); // 转换为base64
      reader.onload = () => {
        this.captcha = reader.result;
      };
      this.$set(this.formData, "captchakey", captchakey);
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  height: 100%;
  background: url("~@/assets/images/login-bg.png") no-repeat center center;
  overflow: hidden;

  .login-logo {
    display: block;
    position: absolute;
    width: 1034px;
    height: 162px;
    left: 84px;
    top: 53px;
  }

  .login-wrapper {
    position: absolute;
    padding-left: 114px;
    left: 1208px;
    top: 405px;
    width: 892px;
    height: 925px;
    background: url("~@/assets/images/login-wrapper.png") no-repeat center
      center;
    overflow: hidden;

    .login-top {
      position: relative;
      padding-left: 32px;
      margin-top: 110px;
      font-size: 64px;
      font-weight: bold;
      line-height: 64px;

      &::after {
        position: absolute;
        left: 0;
        top: 0;
        width: 8px;
        height: 64px;
        content: "";
        background-color: #2ccaff;
      }
    }

    /deep/ .login-form {
      margin-top: 40px;
      width: 672px;

      .captcha {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .captcha-form {
          width: 350px;
        }

        .captcha-img {
          width: 218px;
          height: 96px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .t-form__item {
        margin-bottom: 48px;

        input::placeholder {
          color: #7d8ba2;
        }
      }

      .t-form__label {
        color: #f1f1f1;
        font-size: 40px;
        line-height: 40px;
        margin-bottom: 16px;
      }

      .t-form__controls {
        .t-input__extra {
          font-size: 24px;
          line-height: 24px;
          bottom: -30px;
        }
      }

      .t-input.t-input--suffix > .t-input__suffix-icon {
        font-size: 24px;
        color: #fff;

        .t-icon {
          color: #fff;
        }
      }

      .t-input {
        height: 64px;
        line-height: 64px;
        font-size: 32px;
        border-color: #487395;
        background: transparent;
        color: #f1f1f1;

        .t-input__inner {
          color: #fff;
        }
      }

      .check-wrapper {
        display: flex;
        justify-content: space-between;
        padding: 0 56px;

        .t-form__label {
          // display: none;
        }

        .t-checkbox.t-is-checked .t-checkbox__input::after {
        }

        .t-checkbox-group {
          // line-height: 24px;

          .t-checkbox {
            // line-height: 24px;
            transform: scale(2);

            .t-checkbox__input {
              // width: 24px;
              // height: 24px;
            }

            .t-checkbox__label {
              color: #f1f1f1;
            }
          }
        }
      }

      .t-button {
        font-size: 44px;
        height: 88px;
        line-height: 88px;
        background: #3f8ef7;
      }
    }
  }
}
</style>
