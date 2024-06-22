<template>
    <div>
        <div class="header-wrapper">
            <div class="header-main">
                <div class="title">请问鞠美玉爱曾志远吗？有多爱？</div>
                <div class="operation-btn">
                    <div class="operation">
                        <div class="atten">32关注</div>
                        <div class="read">10w+问题浏览</div>
                    </div>
                    <div :class="['btn', isatten ? 'active' : '']" @click="handleAttention">
                        {{ isatten ? "已关注" : "+关注" }}
                    </div>
                </div>
                <div class="author">
                    <img :src="attenavataricon" alt="" class="avatar">
                    <div class="nickname">告别夏夜的萤火虫</div>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content-main">
                <div class="send">
                    <img :src="myavataricon" alt="" class="avatar">
                    <input type="text" class="inputword" v-model="sendcontent" placeholder="让大家听到你的声音" />
                    <div class="btn" @click="handleSend">发布</div>
                </div>
                <div class="comment-list">
                    <div class="item" v-for="(item, index) in commentData" :key="index">
                        <div class="main">
                            <img :src="myavataricon" alt="" class="avatar">
                            <div class="info">
                                <div class="nickname">{{ item.nickname }}</div>
                                <div class="word-time-location-reply" @click="handleReply(index)">
                                    <div class="word">{{ item.word }}</div>
                                    <div class="times">{{ item.time }}</div>
                                    <div class="location">{{ item.location }}</div>
                                    <div class="reply">回复</div>
                                </div>
                            </div>
                            <div class="like-count">
                                <img :src="item.islike ? activelikeicon : likeicon" alt="" class="like"
                                    @click="handleLike('item',item)">
                                <div class="count">1</div>
                            </div>
                        </div>
                        <div class="sub-comment-list">
                            <div class="sub-item" v-for="(subitem, subindex) in item.replyData" :key="subindex">
                                <img :src="subitem.avatar" alt="" class="avatar">
                                <div class="sub-info">
                                    <div class="sub-nickname">{{ subitem.nickname }}</div>
                                    <div class="sub-word-time-location-reply" @click="handleReply(index)">
                                        <div class="word">{{ subitem.word }}</div>
                                        <div class="times">{{ subitem.time }}</div>
                                        <div class="location">{{ subitem.location }}</div>
                                        <div class="reply">回复</div>
                                    </div>
                                </div>
                                <div class="sub-like-count">
                                    <img :src="subitem.islike?activelikeicon:likeicon" alt="" class="like"
                                        @click="handleLike('subitem',subitem)">
                                    <div class="count">1</div>
                                </div>
                            </div>
                        </div>
                        <div class="sub-send" v-show="index == isreplyshow" @click="handleReplySend(index)">
                            <img :src="myavataricon" alt="" class="avatar">
                            <input type="text" class="inputword" ref="replyInput" v-model="replycontent"
                                placeholder="让大家听到你的声音" />
                            <div class="btn" >回复</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {IP} from "../config/config.js"
export default {
    data() {
        return {
            isatten: false,
            attenavataricon: IP + "/youth-detail-atten.jpg",
            myavataricon: IP + "/youth-detail-avatar.jpg",
            islike: false,
            likeicon: IP + "/like.png",
            activelikeicon: IP + "/like-active.png",
            sendcontent: "",
            commentData: [
                {
                    id: 0,
                    avatar: IP + "/youth-detail-avatar.jpg",
                    nickname: "只想用户0",
                    word: "123",
                    time: "2024-08-06",
                    location: "广东",
                    islike: false,
                    replyData: [
                        {
                            id:0,
                            avatar: IP + "/youth-detail-avatar.jpg",
                            nickname: "迎接冬日的雪花飘",
                            word: "年后",
                            time: "2024-05-05",
                            location: "广东",
                            islike:false,
                        }
                    ],
                },
                {
                    id: 1,
                    avatar: IP + "/youth-detail-avatar.jpg",
                    nickname: "只想用户1",
                    word: "123",
                    time: "2024-08-06",
                    location: "广东",
                    islike: false,
                    replyData: [
                        {
                            id: 1,
                            avatar: IP + "/youth-detail-avatar.jpg",
                            nickname: "迎接冬日的雪花飘",
                            word: "年后",
                            time: "2024-05-05",
                            location: "广东",
                            islike: false,
                        }
                    ],
                },
               
               
            ],
            replycontent: "",
            isreplyshow: -1,

        }
    },
    methods: {
        handleAttention() {
            this.isatten = !this.isatten;
        },
        handleSend() {
            let msg = this.sendcontent;
            let length = this.commentData.length;
            if (msg.trim() == "") {
                return alert("内容不能空！")
            }
            this.commentData.push( {
                    id: length,
                    avatar: IP + "/youth-detail-avatar.jpg",
                    nickname: "只想用户"+length,
                    word: msg,
                    time: "2024-08-06",
                    location: "广东",
                    islike: false,
                    replyData: [
                       
                    ],
                },);
            this.sendcontent = "";
        },
        handleLike(type,item) {
            if (type == 'item') {
                item.islike = !item.islike;
            }
            if(type=='subitem'){
                item.islike = !item.islike;
            }
        },
        handleReply(index) {
            this.isreplyshow = index;
            this.$refs.replyInput[0].focus();
        },
        handleReplySend(index) {
            let msg = this.replycontent;
            let length = this.commentData[index].replyData.length;
            this.commentData[index].replyData.push({
                id:length,
                avatar: IP + "/youth-detail-avatar.jpg",
                nickname: "迎接冬日的雪花飘",
                word: msg,
                time: "2024-05-05",
                location: "广东",
                islike:false,
            });
            this.replycontent = "";
            this.isreplyshow = -1;
        }
    }
}

</script>
<style scoped>
.header-wrapper {
    padding: 0 .4rem;
    margin-top: .4rem;
}

.header-main {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: .53rem .27rem;
    border-radius: .27rem;
}

.header-main .title {
    font-size: .4rem;
    font-weight: 800;
}

.header-main .operation-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: .4rem;

}

.header-main .operation-btn .operation {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: .32rem;
}

.header-main .operation-btn .operation .atten {
    margin-right: .27rem;
}

.header-main .operation-btn .btn {
    width: 1.07rem;
    text-align: center;
    font-size: .32rem;
    border: 1px solid #1296db;
    padding: .08rem .19rem;
    border-radius: .13rem;
    color: #1296db;

}

.header-main .operation-btn .btn.active {
    border-color: gray;
    color: gray;
}

.header-main .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .53rem;
}

.header-main .author .avatar {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: gray;
    margin-right: .4rem;
    object-fit: cover;
    border: 1px solid gray;

}

.header-main .author .nickname {
    font-size: .4rem;
    font-weight: 800;
}

.content-wrapper {
    padding: 0 .4rem;
    margin-top: .4rem;
}

.content-main {}

.content-main .send {
    display: flex;
    flex-direction: row;
    align-items: center
}

.content-main .send .avatar {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: gray;
    margin-right: .4rem;
    object-fit: cover;
    border: 1px solid gray;
}

.content-main .send .inputword {
    box-sizing: border-box;
    flex: 1;
    outline: none;
    border: none;
    height: 0.8rem;
    border-radius: 0.3rem 0 0 0.3rem;
    padding: 0 0 0 .27rem;
    color: #1296db;
    font-size: .4rem
}

.content-main .send .btn {
    font-size: .27rem;
    background-color: #1296db;
    height: 0.8rem;
    line-height: 0.8rem;
    color: white;
    text-align: center;
    padding: 0 .27rem 0;
    border-radius: 0 0.3rem 0.3rem 0;
}

.content-main .send .inputword:focus {
    color: #1296db;
}

.content-main .send .inputword::placeholder {
    font-size: .4rem;
}

.content-main .comment-list {
    margin-top: .4rem;
}

.content-main .comment-list .item .main {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: .27rem;
}

.content-main .comment-list .item .main .avatar {
    width: .8rem;
    height: .8rem;
    border-radius: .4rem;
    background-color: gray;
    object-fit: cover;
    margin-right: .4rem;
    border: 1px solid gray;
}

.content-main .comment-list .item .main .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: .4rem;
}

.content-main .comment-list .item .main .info .nickname {
    font-size: .32rem;
    color: black;
}

.content-main .comment-list .item .main .info .word-time-location-reply {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-top: .27rem;
}

.content-main .comment-list .item .main .info .word-time-location-reply .word {
    font-size: .43rem;
    margin-right: .27rem;
}

.content-main .comment-list .item .main .info .word-time-location-reply .times {
    font-size: .32rem;
}

.content-main .comment-list .item .main .info .word-time-location-reply .location {
    margin: 0 .13rem;
    font-size: .32rem;

}

.content-main .comment-list .item .main .info .word-time-location-reply .reply {
    font-size: .32rem;
}

.content-main .comment-list .item .main .like-count {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content-main .comment-list .item .main .like-count .like {
    width: .4rem;
    height: .4rem;
}

.content-main .comment-list .item .main .like-count .count {
    font-size: .27rem;
    margin-top: .13rem;
}

.content-main .sub-comment-list {
    margin-top: .27rem;
    padding-left: 1.2rem;
}

.content-main .sub-comment-list .sub-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: .27rem;
}

.content-main .sub-comment-list .sub-item .avatar {
    width: .5rem;
    height: .5rem;
    border-radius: .25rem;
    background-color: gray;
    object-fit: cover;
    margin-right: .4rem;
    border: 1px solid gray;
}

.content-main .sub-comment-list .sub-item .sub-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: .4rem;
}

.content-main .sub-comment-list .sub-item .sub-info .nickname {
    font-size: .32rem;
    color: black;
}



.content-main .sub-comment-list .sub-item .sub-info .sub-word-time-location-reply {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-top: .13rem;
}

.content-main .sub-comment-list .sub-item .sub-info .sub-word-time-location-reply .word {
    font-size: .43rem;
    margin-right: .27rem;
}

.content-main .sub-comment-list .sub-item .sub-info .sub-word-time-location-reply .times {
    font-size: .32rem;
}

.content-main .sub-comment-list .sub-item .sub-info .sub-word-time-location-reply .location {
    margin: 0 .13rem;
    font-size: .32rem;

}

.content-main .sub-comment-list .sub-item .sub-info .sub-word-time-location-reply .reply {
    font-size: .32rem;
}

.content-main .sub-comment-list .sub-item .sub-like-count {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content-main .sub-comment-list .sub-item .sub-like-count .like {
    width: .4rem;
    height: .4rem;
}

.content-main .sub-comment-list .sub-item .sub-like-count .count {
    font-size: .27rem;
    margin-top: .13rem;
}


.content-main .sub-send {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 1.2rem;
}

.content-main .sub-send .avatar {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background-color: gray;
    margin-right: .4rem;
    object-fit: cover;
    border: 1px solid gray;
}

.content-main .sub-send .inputword {
    box-sizing: border-box;
    flex: 1;
    outline: none;
    border: none;
    height: 0.8rem;
    border-radius: 0.3rem 0 0 0.3rem;
    padding: 0 0 0 .27rem;
    color: #1296db;
    font-size: .4rem
}

.content-main .sub-send .btn {
    font-size: .27rem;
    background-color: #1296db;
    height: 0.8rem;
    line-height: 0.8rem;
    color: white;
    text-align: center;
    padding: 0 .27rem 0;
    border-radius: 0 0.3rem 0.3rem 0;
}

.content-main .sub-send .inputword:focus {
    color: #1296db;
}

.content-main .sub-send .inputword::placeholder {
    font-size: .4rem;
}
</style>