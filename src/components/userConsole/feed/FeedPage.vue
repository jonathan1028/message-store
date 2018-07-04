<template>
  <div class="feedPageLayout">
    <div class="box">Left Column</div>
    <div>
      <!-- <span v-if="this.$store.state.showCreateOpportunity">
        <create-opportunity></create-opportunity>
      </span> -->
      <div class="box effect6">
        <div class="box-content">
          <div>
            <!-- <opportunities-table
              :data="processData(allOpportunities)"
              :columns="columns"
              :filter-key="searchQuery">
            </opportunities-table> -->
            <feed
              :data="allOpportunities"
              :columns="columns"
              :filter-key="searchQuery">
            </feed>
          </div>
        </div>
      </div>
    </div>
    <div class="box">Right Column</div>
  </div>
</template>

<script>
import Feed from './Feed'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'FeedPage',
  components: {
    Feed
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      allOpportunities: [
        // {name: 'Opp1'},
        // {name: 'Opp2'},
        // {name: 'Opp3'}
      ],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'Name'},
        {dbField: 'description', title: 'description'},
        {dbField: 'startTime', title: 'Start Time'},
        {dbField: 'endTime', title: 'End Time'},
        {dbField: 'address', title: 'Location'}
      ]
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
    }
  },
  methods: {
    openCreate () {
      this.$store.commit('toggleCreateOpportunity')
    }
    // processData (data) {
    //   console.log(data)
    //   return data
    // }
  // }
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY
    }
  }
}
</script>

<style scoped>
.search{
  width: 38%;
}
.feedPageLayout {
  margin-top: 3vh;
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 15vw 50vw 15vw;
  grid-column-gap: 3vw;
}
</style>
