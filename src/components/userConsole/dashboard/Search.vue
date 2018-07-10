Component Documentation
V1
- Collect the search query
- Pass the query to Vuex
- In the Feed component, pull the searchQuery from Vuex
V2
- Collect the search query
- Pass the search query via Apollo_Link_State
- Call the GQL SEARCH_OPPORTUNITIES_QUERY and call Apollo_Link_State and pass the searchQuery into the GQL query

<template>
  <div class="search _box">
      <div class="searchRow">
          <input name="query" v-model="searchQuery" placeholder="Search opportunities...">
      </div>
      {{searchQuery}}
      <div class="filter">
        <div>When:</div>
        <div>
          <input type="checkbox">
          <label for="">Today</label>
        </div>
          <input type="checkbox">
          <label for="">Tomorrow</label>
        <div></div>
        <div>
          <input type="checkbox">
          <label for="">This Week</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">This Weekend</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">This Month</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">Mornings</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">Afternoons</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">Evenings</label>
        </div>
        <div>
          <input type="checkbox">
          <label for="">Date & Time Range</label>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Feed',
  data: function () {
    return {
      searchQuery: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: auto;
  height: fit-content;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  grid-template-rows: 7vh auto;
  padding: 1vh 2vh;
}
.searchRow {
  input {
    width: calc(100% - 4vh);
    padding: .5vh 2vh;
    height: 4vh;
    border-radius: 3vh;
    border: .25vh solid var(--theme-color3);
  }
}
</style>
