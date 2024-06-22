<template>
    <div class="activity-list">
        <Item v-for="(item,index) in listdata" v-bind:key="index" :item="item" :browseIcon="browseIcon" 
            v-on:viewchange="handleUpdateActivityView" />
    </div>
</template>

<script>
    import Item from '@/components/Item.vue';
    import { IP } from '@/config/config';

    export default {
        components: { Item },
        data() {
            return {
                listdata: [],
                browseIcon: IP + "/youth-browse.png",
            }
        },
        created() {
            console.log("created");
        },
        mounted() {
            console.log("mounted");
            this.getListData();
        },
        beforeUpdate() {
            console.log("beforeUpdate");
        },
        updated() {
            console.log("updated");
        },
        beforeDestroy() {
            console.log("beforeDestroy");
        },
        async destroyed() {
            console.log("destroyed");
        },
        methods: {
            async getListData() {
                let { data } = await this.$http.get("/activity/get_activity_list");
                let { status, message } = data;
                if (status == 200) {
                    this.listdata = data.data;
                }
            },
            async handleUpdateActivityView(activity_id) {
                this.handleUpdateView(activity_id);
                let { data } = await this.$http.post("/activity/update_activity_view", { activity_id: activity_id });
                let { status, message } = data;
            },
            async handleUpdateView(activity_id) {
                let { data } = await this.$http.post("/activity/update_view", { activity_id: activity_id });
                let { status, message } = data;
            },
        },
    }
</script>

<style scoped>
    .activity-list {
        box-sizing: border-box;
        padding: 0 15px;
        margin-top: 30px;
    }
</style>