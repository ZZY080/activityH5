<template>
    <div class="item-wrapper">
        <div class="item-main" v-on:click="handleDetail(item.activity_id)">
            <div class="pic-word">
                <img :src="item.activity_cover" loading="lazy" alt="" class="pic">
                <div class="word">{{handleTags(item.activity_apply_datetime_start,item.activity_apply_datetime_end)}}</div>
                <div class="read-count">
                    <img :src="browseIcon" alt="" class="read">
                    <div class="count">{{item.activity_view}}</div>
                </div>
            </div>
            <div class="text">
                <div class="title">{{ item.activity_title }}</div>
                <div class="time">{{ item.activity_datetime | utcprocess }}</div>
                <div class="desc">{{item.activity_introduce}}</div>
                <div class="join-people">报名人数：{{ item.activity_apply_count }}/{{ item.activity_total }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {compareDateTime} from "../util/utils.js";
    export default {
        props: ['item', "browseIcon"],
        data(){
            return {
                applycount:0,
            }
        },
        mounted(){
            
        },
        methods: {
            handleDetail(id) {
                this.$router.push({ path: "/activitydetail", query: { id: id } });
                localStorage.setItem("activity_id",id);
                this.$emit("viewchange",id);
            },
            handleTags(time1,time2){
                let tag=compareDateTime(time1,time2);
                if(tag==-1){
                    return "未开始"
                }
                if(tag==0){
                    return "报名中"
                }
                if(tag==1){
                    return "结束报名"
                }
            }
          
        },
        
       
    }
</script>

<style scoped>
    .item-wrapper {
        box-sizing: border-box;
        padding: 10px 12px;
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        margin-bottom: 10px;
    }

    .item-main {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

    }

    .item-main .pic-word {
        position: relative;
    }

    .item-main .pic-word .pic {
        width: 4.67rem;
        height: 3.04rem;
        border-radius: .27rem;
        overflow: hidden;
        object-fit: cover;
        vertical-align: text-top;
    }

    .item-main .pic-word .word {
        position: absolute;
        top: 0px;
        left: -10px;
        padding: 3px 5px;
        font-size: .29rem;
        background-color: #1296db;
        border-radius: 0 10px 10px 0;
        color: aliceblue;
    }

    .item-main .pic-word .read-count {
        position: absolute;
        bottom: .3125rem;
        left: 10px;
        z-index: 10;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 8px;
        border-radius: 3px;
        background-color: rgba(11, 0, 0, 0.12);
    }

    .item-main .pic-word .read-count .read {
        width: .35rem;
        height: .35rem;
        margin-right: 3px;
    }

    .item-main .pic-word .read-count .count {
        color: white;
        font-size: .2125rem;
    }

    .item-main .text {
        flex: 1;
        margin-left: 10px;
    }

    .item-main .text .title {
        font-weight: 700;
        font-size: .35rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        min-height: .9375rem;
    }

    .item-main .text .time {
        margin: .13rem 0 .08rem;
        font-size: .32rem;
        font-weight: 800;

    }

    .item-main .text .desc {
        font-size: .32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: .13rem;
        min-height: 0.91rem;
    }

    .item-main .text .join-people {
        font-size: .32rem;
    }
</style>