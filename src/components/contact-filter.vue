<template>
    <section class="contact-filter">
        <input @input="onFilter" v-model="filterBy.name" placeholder="Search by name.." type="text">
    </section>
</template>

<script>
    export default {
        data(){
            return{
                filterBy: { name: '' }
            }
        },
        methods:{
            onFilter(){
                this.$emit('filter', this.filterBy)
            }
        }
    }
</script>