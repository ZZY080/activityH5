<template>
    <fragment>
        <div class="activity-detail-wrapper">
            <div class="activity-detail">
                <div class="activity-title">
                    <div class="word">{{activityData.activity_title }}</div>
                    <div class="organizer">{{ activityData.activity_belong }}
                    </div>
                </div>
                <div class="activity-time">
                    <img :src="IP+'/闹钟.png'" alt="" class="shared-style">
                    <span>活动时间 {{ activityData.activity_datetime | utcprocess }}</span>
                </div>
                <div class="join-time">
                    <img :src="IP+'/闹钟.png'" alt="" class="shared-style">
                    <span>报名时间 {{ activityData.activity_apply_datetime_start | utcprocess }}-{{ activityData.activity_apply_datetime_end | utcprocess }}</span>
                </div>
                <div class=" activity-position">
                    <img :src="IP+'/地址.png'" alt="" class="shared-style">
                    <span> {{ activityData.activity_place }}</span>
                </div>
                <div class="book-mark">
                    <span class="count">{{ likecount}}</span>
                    <img :src="is_like?likeactiveicon:likeicon" alt="" @click="handleLike" class="icon">
                </div>
                <div class="joinPeople-detail">
                    <ProgressBar :joinPeople="applycount" :totalPeople="activityData.activity_total" />
                    <div class="joinPeople-pic">
                        <img :src="item.pic" loading="lazy" alt="" v-for="(item,index) in avatarpiclist">
                    </div>
                </div>
                <div class="activity-introduction">
                    <img :src="IP+'/招聘1.jpg'" alt="">
                </div>
            </div>
            <div class="join-active">
                <div class="bookmark-btn"  @click="handleLike"> 
                    <img :src="is_like?likeactiveicon:likeicon" alt="">
                </div>
                <div class="join-btn" @click="handleApply" v-show="handleBtn(activityData)==0">{{is_apply?"取消报名":"报名"}}</div>
            </div>
        </div>
        <div class="qrcode-wrapper">
            <div class="qrcode-main">
                <div ref="canvasWrapper"></div>
            </div>
        </div>
    </fragment>

</template>

<script>
    import {IP} from "../config/config.js"
    import {compareDateTime} from "../util/utils.js";
    import ProgressBar from '../components/ProgressBar.vue'
    import QRCode from 'qrcode'
    export default {
        components: {
            ProgressBar,
        },
        data() {
            return {
                activityData:{},
                IP:"",
                bookMarks: 0,
                avatarpiclist: [
                    {id:0,pic:IP+"/1.png"},
                    {id:1,pic:IP+"/2.png"},
                    {id:2,pic:IP+"/3.png"},
                    {id:3,pic:IP+"/4.png"},
                    {id:4,pic:IP+"/5.png"},
                ],
               
                activity_id:"",

                likecount:0,
                is_like:0,
                likeicon:IP+"/like.png",
                likeactiveicon:IP+"/like-active.png",

                applycount:0,
                is_apply:0,

                qrcodeText: {
                    user_id:"202003021003",
                    activity_id:"assasaewewew",
                },
            }
        },
        created(){   
            this.activity_id=localStorage.getItem("activity_id");
            this.IP=IP;
            this.getActivityData();
            this.getlike();
            this.getlikecount();
            this.getApply();
            this.getApplyCount();
        },
        mounted() {
            this.generateCode();
        },
        methods: {
            async getActivityData(){
                let activity_id=this.activity_id;
                let {data}= await this.$http.get(`/activity/get_activity_single?activity_id=${activity_id}`);
                let {status,message}=data;
                if(status==200){
                    this.activityData=data.data;
                }
            },
            async getlike(){
                let activity_id=this.activity_id;
                let {data} = await this.$http.get(`/activity/activity_get_like?activity_id=${activity_id}`);
                let {status,message} =data;
                if(status==200){
                    this.is_like=data.data.is_like;
                }
            },
            async handleLike() {
                let activity_id=this.activity_id;
                let {data} = await this.$http.post("/activity/activity_like_process",{activity_id:activity_id});
                let {status,message} =data;
                if(status==200){
                    this.is_like=data.data.is_like;
                    this.getlikecount();
                }
            },
            async getlikecount(){
                let activity_id = this.activity_id;
                let {data} = await this.$http.get(`/activity/get_activity_like_all_count?activity_id=${activity_id}`);
                let {status,message} = data;
                if(status==200){
                    this.likecount=data.data.likecount;
                }
            },   
            async getApply(){
                let activity_id=this.activity_id;
                let {data} = await this.$http.get(`/activity/activity_get_apply?activity_id=${activity_id}`);
                let {status,message} =data;
                if(status==200){
                    this.is_apply=data.data.is_apply;
                }
            },
            async handleApply() {
                let activity_id=this.activity_id;
                let {data} = await this.$http.post("/activity/activity_apply_process",{activity_id:activity_id});
                let {status,message} =data;
                if(status==200){
                    this.is_apply=data.data.is_apply;
                    this.getApplyCount();
                }
            },
            async getApplyCount(){
                let activity_id = this.activity_id;
                let {data} = await this.$http.get(`/activity/get_activity_apply_all_count?activity_id=${activity_id}`);
                let {status,message} = data;
                if(status==200){
                    this.applycount=data.data.applycount;
                    await this.$http.post(`/activity/update_activity_apply`,{activity_id:activity_id,applycount:`${this.applycount}`});
                }
            },   
            handleBtn(activityData){
                let time1=this.activityData.activity_apply_datetime_start;
                let time2=this.activityData.activity_apply_datetime_end;
                return compareDateTime(time1,time2);
            },
            generateCode() {
                let qrcodeText=JSON.stringify(this.qrcodeText)
                QRCode.toCanvas(qrcodeText, {
                    width: 70,
                    margin: 1
                }, (error, canvas) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    this.$refs.canvasWrapper.appendChild(canvas);
                })
            }
        },
       
    }
</script>
<style scoped>
    .activity-detail-wrapper {
        padding: 0px 15px 20px;
        margin-top: 30px;
    }

    .activity-detail-wrapper .activity-detail .activity-title {
        font-size: .53rem;
        color: rgb(15, 16, 15);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    .activity-detail-wrapper .activity-detail .activity-title .word {
        flex: 1;
        font-size: .43rem !important;
        font-weight: 800;
    }

    .activity-detail-wrapper .activity-detail .activity-title .organizer {
        padding: .11rem .27rem;
        border-radius: .27rem;
        background-color: #1296db;
        font-size: .21rem;
        margin: 0px 0 0 .27rem;
        color: aliceblue;
        font-weight: 800;
    }

    .activity-detail-wrapper .activity-detail .activity-time,
    .join-time,
    .activity-position {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: .35rem;
        margin-top: .27rem;
    }

    .activity-detail-wrapper .activity-detail .shared-style {
        margin-right: .13rem;
    }

    .activity-detail-wrapper .activity-detail .book-mark {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

    .activity-detail-wrapper .activity-detail .book-mark .count {
        font-size: .29rem;
        margin-right: .13rem;
    }

    .activity-detail-wrapper .activity-detail .book-mark .icon {
        width: .4rem;
        height: .4rem;
    }

    .activity-detail-wrapper .activity-detail .joinPeople-detail {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: .53rem 0 .8rem .27rem;
    }

    .activity-detail-wrapper .activity-detail .joinPeople-detail .joinPeople-pic {
        /* padding-left: .27rem; */
    }

    .activity-detail-wrapper .activity-detail .joinPeople-detail .joinPeople-pic img {
        width: .69rem;
        height: .69rem;
        margin-right: .13rem;
        pointer-events: var(--pointer-events);
    }

    .activity-detail-wrapper .activity-detail .activity-introduction img {
        width: 100%;
        -webkit-touch-callout: none;
        user-select: none;
    }

    .activity-detail-wrapper .join-active {
        position: fixed;
        display: flex;
        align-items: center;
        flex-direction: row;
        bottom: .67rem;
        left: 50%;
        transform: translateX(-50%);
        /* 通过transform属性水平居中 */
    }

    .activity-detail-wrapper .join-active .bookmark-btn {
        width: 1.33rem;
        height: 1.07rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #1296db;
        border-radius: .53rem;
        user-select: none;
    }

    .activity-detail-wrapper .join-active .bookmark-btn:active {
        opacity: 0.4;
    }

    .activity-detail-wrapper .join-active .bookmark-btn img {
        width: .67rem;
        height: .67rem;
        pointer-events: var(--pointer-events);
    }

    .activity-detail-wrapper .join-active .join-btn {
        width: 2.67rem;
        height: 1.07rem;
        background-color: #1296db;
        color: aliceblue;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: .53rem;
        margin-left: .53rem;
        user-select: none;
        font-size: .32rem
    }

    .activity-detail-wrapper .join-active .join-btn:active {
        opacity: 0.4;
    }
    .qrcode-wrapper {
        position: fixed;
        bottom: 40vh;
        right: .625rem;
    }
</style>