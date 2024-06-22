<template>
    <fragment>
        <div class="tab-wrapper">
            <div class="tab-main">
                <div :class="['item',tabIndex==index?'active':'']" v-for="(item,index) in tabList" :key="index"
                    @click="handleTab(index)">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="search-wrapper">
            <div class="search-main">
                <input type="text" class="keyword" />
                <div class="btn">搜索</div>
            </div>
        </div>
        <div class="question-wrapper">
            <div class="question-main">
                <div class="item" v-for="(item, index) in questionList" :key="index" @click="handleDetail">
                    <div class="info-time">
                        <div class="info">
                            <img :src="myavataricon" alt="" class="avatar">
                            <div class="nickname">告别夏夜的萤火虫</div>
                            <img :src="womanicon" alt="" class="sex">
                            <div class="tag">精</div>
                        </div>
                        <div class="time">5天前</div>
                    </div>
                    <div class="icon-title">
                        <img :src="askicon" alt="" class="icon">
                        <div class="title">一个什么学历的人在知乎上自称证明了哥德巴赫猜想会有人相信？</div>
                    </div>
                    <div class="types">
                        <div class="word">计算机</div>
                        <div class="word">求职</div>
                    </div>
                    <div class="read-answer">
                        <div class="read">{{ 1 }}人浏览</div>
                        <div class="answer">
                            <div class="word">查看全部{{ 1.7 }}k条回答</div>
                            <img :src="righticon" alt="" class="icon">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="add">
            发布
        </div>
    </fragment>
</template>
<script>
    import { IP } from "../config/config.js";
    export default {
        data() {
            return {
                myavataricon: IP + "/youth-detail-avatar.jpg",
                tabList: [
                    {
                        id: 0,
                        name: "我发",
                    },
                    {
                        id: 1,
                        name: "我回",
                    },
                    {
                        id: 2,
                        name: "我赞",
                    },
                    {
                        id: 3,
                        name: "新回",
                    },
                    {
                        id: 4,
                        name: "新发",
                    },
                    {
                        id: 5,
                        name: "精选",
                    },
                    {
                        id: 6,
                        name: "热榜",
                    },
                ],
                tabIndex: 0,
                manicon: IP + "/youth-man.png",
                womanicon: IP + "/youth-woman.png",
                askicon: IP + "/youth-ask.png",
                righticon: IP + "/youth-right.png",
                questionList: [],
            }
        },
        mounted() {
            this.handleQuestionData();
        },
        methods: {
            handleTab(index) {
                this.tabIndex = index;
            },
            handleQuestionData() {
                for (let i = 0; i < 20; i++) {
                    this.questionList.push(i);
                }
            },
            handleDetail() {
                this.$router.push({ path: "/youthdetail" })
            }
        }
    }
</script>
<style scoped>
    .tab-wrapper {
        padding: 0 .4rem;
        margin-top: .4rem;
    }

    .tab-main {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding: .27rem .13rem;
        border-radius: .13rem;
        overflow-x: auto;
        white-space: nowrap;
        /* 水平滚动需要禁用换行 */
    }

    .tab-main::-webkit-scrollbar {
        display: none;
    }

    .tab-main .item {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: .32rem;
        box-sizing: border-box;
        padding: .11rem .13rem;
        border-radius: .13rem;
        user-select: none;
    }

    .tab-main .item.active {
        background-color: #1296db;
        color: #fff
    }

    .search-wrapper {
        padding: 0 .4rem;
        margin-top: .27rem;
    }

    .search-main {
        display: flex;
        flex-direction: row;
        border-radius: .27rem;
        overflow: hidden;
    }

    .search-main .keyword {
        flex: 1;
        outline: none;
        border: none;
        padding: 0 0 0 .27rem;
        color: black;
    }

    .search-main .keyword:focus {
        color: black;
    }

    .search-main .btn {
        font-size: .35rem;
        padding: .13rem .27rem;
        background-color: #1296db;
        color: white;
        user-select: none;
    }

    .search-main .btn:active {
        opacity: 0.2;
    }

    /*  */
    .question-wrapper {
        padding: 0 .4rem;
        margin-top: .4rem;
        /* background-image: url("") */
    }

    .question-main {}

    .question-main .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        background-color: #fff;
        padding: .27rem .16rem;
        border-radius: .27rem;
        margin-bottom: .27rem;
        user-select: none;
    }

    .question-main .item:active {
        opacity: 0.3;
    }

    .question-main .item .info-time {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }

    .question-main .item .info-time .info {

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .question-main .item .info-time .info .avatar {
        width: .67rem;
        height: .67rem;
        border-radius: 50%;
        background-color: #1296db;
        margin-right: .32rem;
        object-fit: cover;
    }

    .question-main .item .info-time .info .nickname {
        font-size: .32rem;
        margin-right: .27rem;
    }

    .question-main .item .info-time .info .sex {
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        margin-right: .13rem;
        object-fit: cover;
    }

    .question-main .item .info-time .info .tag {
        font-size: .32rem;
    }

    .question-main .item .info-time .time {
        font-size: .32rem;
    }

    .question-main .item .icon-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: .27rem;
    }

    .question-main .item .icon-title .icon {
        width: .53rem;
        height: .53rem;
        margin-right: .27rem;
    }

    .question-main .item .icon-title .title {
        flex: 1;
        font-size: .43rem;
        font-weight: 800;
    }

    .question-main .item .types {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: .13rem 0;
    }

    .question-main .item .types .word {
        font-size: .24rem;
        border-radius: .13rem;
        padding: .08rem .13rem;
        background-color: #1296db;
        color: white;
        margin-right: .13rem
    }

    .question-main .item .read-answer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* margin-top: .13rem; */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .question-main .item .read-answer .read {
        font-size: .27rem;
    }

    .question-main .item .read-answer .answer {
        display: flex;
        align-items: center;
    }

    .question-main .item .read-answer .answer .word {
        font-size: .27rem;
        color: #1296db;
    }

    .question-main .item .read-answer .answer .icon {
        width: .4rem;
        height: .4rem;
    }

    .add {
        position: fixed;
        top: 50%;
        right: .27rem;
        font-size: .32rem;
        background-color: #1296db;
        color: #e8faff;
        height: .8rem;
        width: .8rem;
        text-align: center;
        line-height: .8rem;
        border-radius: 50%;
        padding: .27rem;
        user-select: none;
    }

    .add:active {
        background-color: #66b1ff;
        color: #fff;
    }
</style>