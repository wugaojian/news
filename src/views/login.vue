<template>
    <div class="login">
        <van-nav-bar left-arrow @click-left="$router.back()"/>
        <div class="login-container">
            <h5>短信登陆</h5>
            <van-form ref="loginForm" @submit="handleLogin" :show-error='false' :show-error-message='false'  validate-first> 
                <van-field
                    v-model="user.mobile"
                    name="mobile"
                    placeholder="请输入手机号码"
                    :rules="formRules.mobile"
                    center
                />
                <van-field
                    v-model="user.code"
                    name="code"
                    placeholder="请输入验证码"
                    :rules="formRules.code"
                    center
                >
                    <template #button>
                        <div class="count" v-if="isCountShow">
                            <van-count-down :time="1000 * 60" format="ss s" @finish = 'isCountShow = false' />
                            <span>后获取</span>
                        </div>
                        <van-button round size="small" type="primary" @click="getUserCode" :loading='sendLoading' v-if="!isCountShow">发送验证码</van-button>
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block type="primary">登录</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { login,getCode } from '../api/user'
export default {
    name: 'login',
    data () {
        return {
            user: {
                mobile: '',
                code: ''
            },
            formRules: {
                // 手机号验证规则
                mobile: [{require: true,message: '请输入手机号'}, {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]14[57])[0-9]{8}$/, message: '请输入正确的手机号'}],
                // 验证码验证规则
                code: [{require: true,message: '请输入验证码'}, {pattern: /^\d{6}$/,message:'验证码错误'}]
            },
            isCountShow: false, //控制验证码倒计时的显示与隐藏
            sendLoading: false //防止用户一直点击按钮，造成资源浪费
        }
    },
    methods: {
        async getUserCode () {
            try{
                // 验证手机号是否通过
                await this.$refs['loginForm'].validate('mobile')
                // 验证通过
                this.sendLoading = true //展示按钮的loading状态，防止网络慢的用户一直点击
                await getCode(this.user.mobile)  //获取用户的验证码
                this.isCountShow = true  //验证码倒计时
            }catch(err) {
                let message = ''
                if (err && err.response && err.response.status === 429) {
                    // 发送短信失败的错误提示
                    message = '发送太频繁了，请稍后再试'
                } else if (err.name === 'mobile') {
                    // 表单验证中手机号错误，输出错误信息
                    message = err.message
                }else {
                    // 未知错误
                    message = '发送失败，请稍后再试'
                }
  
                // 提示用户
                this.$toast({
                    message,
                    position: 'top'
                })
            }
            this.sendLoading = false //无论发送成功或者失败，都要关闭loading状态
        },
        async handleLogin() {
                this.$toast.loading({
                    message: '登陆中...',
                    forbidClick: true,
                    duration: 0
                })
            try {
                const res = await login(this.user)
                this.$toast.success('登陆成功')  //提示用户登陆成功
                this.$store.commit('setUser', res.data.data)  //登陆成功后，将用户的token数据存储在本地
                this.$router.push('/mine')  //登陆成功后跳转到用户信息页面
            } catch (error) {
                this.$toast.fail('登陆失败，手机号或者验证码错误')
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.login-container{
    margin: 0 20px;
    h5{
        color: #666;
    }
    .count{
        display: flex;
        align-items: center;
    }
}
</style>