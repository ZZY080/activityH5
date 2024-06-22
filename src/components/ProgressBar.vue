<template>
    <div class="progress-container">
        <div class="progress-bar" :style="{ width: ProgressBarWidth }">
        </div>
        <span>{{ joinPeople }}/{{ totalPeople }}</span>
    </div>

</template>

<script>
export default {
    props: {
        joinPeople: {
            // type: String,
            required: true
        },
        totalPeople: {
            // type: String,
            required: true
        }
    },
    computed: {
        ProgressBarWidth() {
            return (this.joinPeople / this.totalPeople) * 100 + '%';
        }
    }

}
</script>
<style scoped>
.progress-container {
    height: .4rem;
    /* width: 2.67rem; */
    flex: 1;
    border-radius: .2rem;
    background-color: rgb(187, 188, 255);
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: .27rem;
    color: aliceblue;
    position: relative;
    margin-right: .4rem;
    overflow: hidden;

}

.progress-container .progress-bar {
    height: 100%;
    border-radius: .2rem;
    overflow: hidden;
    background-color: #1296db;
}

.progress-container span {
    position: absolute;
    right: .4rem;
}
</style>