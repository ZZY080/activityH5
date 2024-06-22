<template>
    <fragment>
        <div class="header-wrapper">
            <div class="header-main">
                <swiper :options="swiperOptions" class="swiper" :style="{'--swiper-pagination-color': '#fff'}">
                    <swiper-slide v-for="(item,index) in backgroundpicArr" :key="index" class="swiper-slide">
                        <img :src="item" alt="" class="backgroundpic">
                    </swiper-slide>
                    <!-- 分页器 -->
                    <div slot="pagination" class="swiper-pagination"></div>
                </swiper>
            </div>
        </div>
        <div class="info-wrapper">
            <div class="info-main">
                <input type="text" placeholder="请输入账号(工作证号/学号/用户名)" v-model="account" class="account">
                <input type="password" placeholder="请输入密码" v-model="password" class="password">
            </div>
        </div>
        <div class="btn-wrapper" @click="handleLogin">
            <div class="btn-main">
                登录
            </div>
        </div>
    </fragment>

</template>


<script>
    import { IP } from "../config/config.js"
    export default {
        data() {
            return {
                backgroundpicArr: [
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/oQidBADzlCTBZExfhAACIAEcAAXwteUgV9IvD6~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&se=false&x-expires=1719104400&x-signature=i84O86GIM1iUpB6IkeT650%2FQPe4%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/o0CdeAzJ8DhNNA9vk1T7NzuhAFKfEAy3AIgAtd~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&se=false&x-expires=1719104400&x-signature=yxnZwJdeecpyQPu5f5l%2FtFranGE%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/o0ztAhJAQIKlSfEAwNUtAhyC2jAYCegqtyEpAA~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&se=false&x-expires=1719104400&x-signature=GIpha9Z7u2rf80Sgc%2FhAPn4KKnU%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/d6eace6d43934fcfa0ff951570a672f3_1689697739~tplv-dy-360p.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=origin_cover&se=false&x-expires=1719104400&x-signature=cPV1KZjBcJgN94HXpKguVN%2Fs6RE%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/b0bd838d63fb4e53834328709abae860~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=s3dl%2FlLQ854ul4rBE3oUWDQyTpg%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/a3e37b9759944101ae94e0cf6edd8351~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=Jib%2Bf%2Fdu57yyFBi6voC9SfDZ1vA%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/500bc10c1fc3450999207315f3186811~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=zzLsMkWp4fVVGP1iqxJL%2BrrGuQ0%3D",
                    "https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/479246be7dd5456c9358da7ab5cb6cc3~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=eKAsZy6lf3BX%2B4F4RdpTkVRZkpE%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/27248a35f8d549e2a488d73517c8508c~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=s3IZ0qhm1r5%2FeCdHdbTuTwPCktg%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/57b53fe8c75844ab97d4f5a3fb1c3897~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=sa4SmDNFhFmzQ7UBDDWACuzcP6g%3D",
                    "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/1cde08ba674e4c15842143fd0c48fa49~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=vFgiNo6B3geJkFBIQ144EKXrMyU%3D",
                    "https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/o8LRI4enAHNcBZfpAAnAQhlQ9hlgsCEAANDWbP~tplv-dy-aweme-images-v2:3000:3000:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_PUBLISH&sc=image&se=false&x-expires=1720486800&x-signature=UIUGY5YLzCA0kB5N0HgcGGqqIpY%3D",
                ],
                account: "",
                password: "",
                swiperOptions: {
                    //导航前进后退按钮
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    //自动轮播图
                    autoplay: {
                        delay: 3000,
                        // stopOnLastSlide: false,
                        // disableOnInteraction: true,
                    },
                    //无缝衔接
                    loop: true,
                    //分页器配置项
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true, // 点击分页器小球进行轮播图切换
                    },
                    //切换效果
                    effect: "cube",
                }
            }
        },
        methods: {
            async handleLogin() {
                let account = this.account;
                let password = this.password;
                let { data } = await this.$http.post("/api/login", { "user_studentid": account, "user_password": password });
                let { status, message } = data;
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'success'
                });
                if (status == 200) {
                    let token = data.token;
                    localStorage.setItem("token", token);
                    this.$router.push({ path: "/home" });
                }
            }
        }
    }
</script>
<style scoped>
    .header-wrapper {
        padding: 0 .5rem;
        margin-top: 10px;
    }

    .header-main {
        width: 100%;
        height: 220px;
       
    }

    .header-main .swiper {
        width: 100%;
        height: 100%;
    }

    .header-main .swiper .swiper-slide {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }

    .header-main .swiper .swiper-slide .backgroundpic {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .swiper-container-3d {
    perspective: unset !important;
}

    .info-wrapper {
        padding: 0 0.5rem;
        margin-top: 20px;
    }

    .info-main {
        display: flex;
        flex-direction: column;
    }

    .info-main input {
        box-sizing: border-box;
        width: 100%;
        outline: none;
        border: none;
        margin-bottom: 20px;
        height: 40px !important;
        border-radius: 5px;
        padding-left: .625rem;
    }

    .btn-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 0.5rem;
        margin-top: 40px;
    }

    .btn-main {
        width: 100%;
        text-align: center;
        padding: 10px 0;
        background-color: #1296db;
        font-size: .3125rem;
        border-radius: 10px;
        color: #fff;
    }

    .btn-main:active {
        opacity: 0.3;
    }
</style>