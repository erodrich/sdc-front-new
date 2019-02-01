<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li :class="[{disabled: !prev}]" class="page-item">
                <a class="page-link" href="#" @click="fetchResource(prev)">Previous</a>
            </li>
            <li class="page-item disabled"><a class="page-link text-dark" href="#">Page {{ current
                }} of {{ last }}</a></li>
            <li :class="[{disabled: !next}]" class="page-item">
                <a class="page-link" href="#" @click="fetchResource(next)">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Pagination',
    props: ['action'],
    computed: {
      ...mapGetters([
        'current', 'next', 'prev', 'last'
      ])
    },
    methods: {
        fetchResource (page) {
            page = `page=${page}`
            this.$store.dispatch(this.action, page)
        }
    }
    
}
</script>
