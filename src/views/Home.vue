<template>
    <div>
        <div class="search-wrapper">
            <div class="search-main" @click="handleSearchDetail">
                <img :src="searchicon.search" alt="" class="icon">
                <div class="keyword"></div>
            </div>
        </div>
        <div class="menu-wrapper">
            <div class="menu-main">
                <div class="item-wrapper" v-for="(item, index) in menuData" @click="handleDetail(item.path)">
                    <div class="item-main">
                        <img :src="item.icon" alt="" class="pic">
                        <div class="word" v-cloak>{{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="video-wrapper">
            <div class="video-main">
                <video :src="item.videosrc" v-for="(item, index) in graduateVideoList" :key="index" controls class="item" ></video>
            </div>
        </div> -->
    </div>
</template>

<script>
    import { IP } from '@/config/config';
    export default {
        data() {
            return {
                menuData: [
                    // {
                    //     id: "1",
                    //     icon: IP + "/home-menu-graduate.png",
                    //     text: "应届生",
                    //     path: "/activity"
                    // },
                    {
                        id: "2",
                        icon: IP + "/home-menu-question.png",
                        text: "让青春不迷茫",
                        path: "/youth"
                    },
                    {
                        id: "3",
                        icon: IP + "/home-menu-activity.png",
                        text: "活动",
                        path: "/activity"
                    },

                    // {
                    //     id: "4",
                    //     icon: IP + "/home-menu-parttime.png",
                    //     text: "校园兼职",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "5",
                    //     icon: IP + "/home-menu-second.png",
                    //     text: "二手市场",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "6",
                    //     icon: IP + "/home-menu-teacher.png",
                    //     text: "家教资料",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "7",
                    //     icon: IP + "/home-menu-class.png",
                    //     text: "线上课堂",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "8",
                    //     icon: IP + "/home-menu-problem.png",
                    //     text: "题库",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "9",
                    //     icon: IP + "/home-menu-water.png",
                    //     text: "滴滴青桔",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "10",
                    //     icon: IP + "/home-menu-red.png",
                    //     text: "我的小红书",
                    //     path: "https://www.xiaohongshu.com/user/profile/601e81b40000000001003636"
                    // },
                    // {
                    //     id: "11",
                    //     icon: IP + "/home-menu-github.png",
                    //     text: "我的github",
                    //     path: "https://github.com/ZZY080/"
                    // },
                    // {
                    //     id: "12",
                    //     icon: IP + "/home-menu-beef.png",
                    //     text: "我的牛客",
                    //     path: "https://www.nowcoder.com/discuss/381410695156445184?sourceSSR=users"
                    // },
                    // {
                    //     id: "13",
                    //     icon: IP + "/home-menu-life.png",
                    //     text: "科大生活",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "14",
                    //     icon: IP + "/home-menu-schoolmate.png",
                    //     text: "校友理事",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "15",
                    //     icon: IP + "/home-menu-kitchen.png",
                    //     text: "厨艺提升",
                    //     path: "/activity"
                    // },
                    // {
                    //     id: "16",
                    //     icon: IP + "/home-menu-software.png",
                    //     text: "软件安装",
                    //     path: "/barcode"
                    // },
                    // {
                    //     id: "17",
                    //     icon: IP + "/home-menu-warning.png",
                    //     text: "求职注意事项",
                    //     path: "/qrcode"
                    // },
                    // {
                    //     id: "18",
                    //     icon: IP + "/home-menu-spring.png",
                    //     text: "饮用水",
                    //     path: "/qrcode"
                    // },
                    // {
                    //     id: "19",
                    //     icon: IP + "/home-menu-blog.png",
                    //     text: "我的博客",
                    //     path: "/qrcode"
                    // },
                    // {
                    //     id: "20",
                    //     icon: IP + "/home-menu-push.png",
                    //     text: "校园推广",
                    //     path: "/qrcode"
                    // },
                     {
                        id: "21",
                        icon: IP + "/home-menu-neighborhood.png",
                        text: "锦川佳苑",
                        path: "/neighborhood"
                    },

                ],
                searchicon: {
                    search: IP + "/home-search-search.png",
                    photo: IP + "/home-search-photo.png"
                },
                graduateVideoList: [
                    {
                        id: 0,
                        videosrc: IP + "/1.mp4"
                    },
                    {
                        id: 2,
                        videosrc: IP + "/2.mp4"
                    },
                    {
                        id: 3,
                        videosrc: IP + "/3.mp4"
                    },
                    {
                        id: 4,
                        videosrc: IP + "/4.mp4"
                    },

                ]
            }
        },
        methods: {
            handleSearchDetail() {
                this.$router.push({ path: "/search" });
            },
            handleGetQueryStringArgs(url, opt) {
                const { decode = true, multiple = false } = opt || {};
                const args = {};
                if (!(typeof url === 'string' && url.includes('?'))) return args;

                const arr = url.split('?');
                const qs = arr.length === 2 ? arr[1] : '';
                if (!(typeof qs === 'string' && qs.length)) return args;

                const items = qs.split('&');
                for (let i = 0; i < items.length; i++) {
                    const meta = items[i];
                    if (!(typeof meta === 'string' && meta.includes('='))) continue;
                    const item = meta.split('=');
                    const key = decode ? decodeURIComponent(item[0]) : item[0];
                    const value = decode ? decodeURIComponent(item[1]) : item[1];
                    if (Object.prototype.hasOwnProperty.call(args, key) && multiple) {
                        const temp = args[key];
                        args[key] = Array.isArray(temp) ? [...temp, value] : [temp, value];
                    } else {
                        args[key] = value;
                    }
                }
                return args;
            },
            handleDetail(path) {
                let reg = /(http|https):\/\/[\w]+(.[\w]+)([\w\-\.,@?^=%&:/~\+#\u4e00-\u9fa5]*[\w\-\@?^=%&/~\+#])/;
                if (reg.test(path)) {
                    return window.location.href = path;
                }
                this.$router.push({ path: path })
            }
        }
    }
</script>
<style scoped>
    .search-wrapper {
        padding: 0 15px;
        margin-top: 10px;
    }

    .search-main {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #ffff;
        border-radius: 1.07rem;
        height: .8rem;
        overflow: hidden;
        min-width: 0;
        padding: .08rem .27rem;

    }

    .search-main .icon {
        width: .53rem;
        height: .53rem;
        margin: 0 .27rem;
    }

    .search-main .keyword {
        outline: none;
        border: none;
        flex: 1;
        margin: 0 .27rem;
        height: 100%;
    }

    .menu-wrapper {
        padding: 0 15px;
        margin-top: 10px;
    }

    .menu-main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: white;
        box-sizing: border-box;
        padding: 10px 0px 0 0px;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .menu-main .item-wrapper {
        box-sizing: border-box;
        width: 25%;
        padding: 0 .27rem;
        margin-bottom: .27rem;
    }

    .menu-main .item-wrapper .item-main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menu-main .item-wrapper .item-main:active {
        opacity: 0.3;
    }

    .menu-main .item-wrapper .item-main .pic {
        margin-top: 5px;
        width: 1.07rem;
        height: 1.07rem;
        border-radius: 10px;
    }

    .menu-main .item-wrapper .item-main .word {
        margin-top: 5px;
        font-size: .27rem;
    }

    .video-wrapper {
        padding: 0 15px;
        margin-top: .53rem;
    }

    .video-main {}

    .video-main .item {
        border-radius: .27rem;
        overflow: hidden;
        width: 100%;
        object-fit: cover;
        height: 150px;
    }
</style>