<template>
    <div class="search-wrapper">
        <div class="search-main">
            <div class="header">
                <img :src="searchicon.search" alt="" class="icon">
                <input type="text" class="keyword" @input="handleGetSearchData" placeholder="请输入关键字" v-model="keyword">
                <img :src="searchicon.photo" alt="" class="icon" v-if="calculateKwLength == 0">
                <img :src="searchicon.deletes" alt="" class="delete" @click="handleDelete" v-if="calculateKwLength > 0">
                <div class="word" style="display: none;">搜索</div>
            </div>
            <div class="content" v-if="calculateKwLength>0">
                <div class="item-wrapper" v-for="(item,index) in searchData">
                    <div class="item-main">
                        <img :src="searchicon.search" alt="" class="icon">
                        <div class="word">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import {IP} from "../config/config.js";
export default {
    data() {
        return {
            keyword: "",
            kwlength: 0,
            searchicon: {
                search: IP + "/home-search-search.png",
                photo: IP + "/home-search-photo.png",
                deletes: IP + "/home-search-delete.png"
            },
            searchData:[],
        }
    },
    methods: {
        handleDelete(){
            this.keyword="";
        },
        handleGetSearchData(){
            let num =Math.floor(Math.random()*100);
            console.log(num);
            for(let i=0;i<num;i++){
                this.searchData.push(i)
            }
            this.searchData=this.searchData.slice(0,10)
        }
    },
    computed: {
        calculateKwLength: function () {
            return this.keyword.length;
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
    position: relative;
}
.search-main .header {
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

.search-main .header .icon {
    width: .53rem;
    /* height: .53rem; */
    margin: 0 .27rem;
}

.search-main .header .icon:active {
    opacity: 0.3;
}

.search-main .header .keyword {
    outline: none;
    border: none;
    flex: 1;
    margin: 0 .27rem 0;
    height: 100%;
    color: #1296db;
    font-size: .32rem;
}

.search-main .header .keyword:focus {
    color: #1296db;
}

.search-main .header .icon:nth-of-type(2) {
    margin-right: .45rem;
}

.search-main .header .delete {
    width: .4rem;
    height: .4rem;
    margin: 0 .57rem 0 0.27rem;
}

.search-main .header .delete:active {
    opacity: 0.3;
}

.search-main .header .word {
    font-size: .32rem;
    color: #1296db;
}

.search-main .header .word:active {
    opacity: 0.3;
}
.search-main .content {
    position: absolute;
    width: 100%;
    z-index: 3;
    top: 1.1rem;
    font-size: .37rem;
    background-color: #ffff;
    border-radius:.13rem .13rem .4rem .4rem;
}
.search-main .content {
    display: flex;
    flex-direction: column;
}
.search-main .content .item-wrapper {
    padding: .21rem .29rem;
    border-bottom: 1px solid #f1f1f1;
    user-select: none;
}
.search-main .content .item-wrapper:active{
    opacity: 0.4;
}
.search-main .content .item-wrapper .item-main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.search-main .content .item-wrapper .item-main .icon {
    width: .4rem;
    height: .4rem;
    margin-right: .4rem;
}
</style>