<template>
  <div class="feedPageLayout">
    <div class="notifications _box">
      <div class="notifications__header">
        <div class="__userPhoto"></div>
        <div class="__userName">User Name</div>
        <div class="__userLocation">Austin, TX</div>
      </div>
      <div class="notifications__row">
        Recognitions
      </div>
      <div class="notifications__row">
        Thank You Notes
      </div>
      <div class="notifications__row">
        My Events
      </div>
     <div class="notifications__row">
        Friend's Events
      </div>
      <div class="notifications__row">
        GCT Total
      </div>
      <div class="notifications__row --bottom-row">
        <a>See all notifications...</a>
      </div>
    </div>
    <search></search>
    <div class="carousel _box">
      <div class="__header">Help people affected by Hurricane Harvey</div>
      <div class="__image-row">Photos</div>
      <div class="__card-row">
        <div class="__volunteer-card _box-shadow">
          <div class="__card-header">Volunteer</div>
          <div class="__card-item1 --no-margin">
            <div>Icon</div>
            <div>
              Serve meals and snacks with our partners
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Open up your home to families in need
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Learn how you can be a support contact
            </div>
          </div>
          <div class="__card-item1">
            <div>Icon</div>
            <div>
              Use your truck for good
            </div>
          </div>
          <div class="__card-footer1">
            <button class="_button3">More Ways to Help</button>
          </div>
        </div>
        <div class="__support-card _box-shadow">
          <div class="__card-header">Support</div>
          <div class="__card-item2 --no-margin">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Cleaning Supplies
            </div>
          </div>
          <div class="__card-item2 --no-margin">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Diapers
            </div>
          </div>
          <div class="__card-item2">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Coolers
            </div>
          </div>
          <div class="__card-item2">
            <div class="__card-item-icon">Icon</div>
            <div class="__card-item-content">
              Comfort Kits
            </div>
          </div>
          <div class="__card-footer2">
            <button class="_button3">Donate Goods</button>
          </div>
        </div>
        <div class="__donate-card _box-shadow">
          <div class="__card-header">Donate</div>
          <div class="__card-item3 --no-margin">$500</div>
          <div class="__card-item3">$100</div>
          <div class="__card-item3">$50</div>
          <div class="__card-item3">$25</div>
          <div class="__card-footer1">
            <button class="_button3">Donate $</button>
          </div>
        </div>
      </div>
      <div class="__carousel-footer"> ...... </div>
    </div>
    <div class="feed _box">
      <feed
        :data="allOpportunities"
        :columns="columns"
      >
      </feed>
    </div>
    <div class="button-menu _box">
      <div class="__header">Grow the GCN Community</div>
      <div class="__row --border-collapse">
        <button class="_button2 ">Send a Thank You Note</button>
      </div>
      <div class="__row">
        <button class="_button2">Invite Friends</button>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from './Feed'
import Search from './Search'
import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'FeedPage',
  components: {
    Feed, Search
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

<style lang="scss" scoped>
.search{
  width: 38%;
}
.feedPageLayout {
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.carousel {
  // width: 100%;
  height: 65vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: white;
  display: grid;
  grid-template-rows: 4vh 6fr 10fr 1fr
}
.__image-row {
  font-size: 1vw;
  // border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
  margin: 1vh 1.5vh;
  background-color: var(--theme-color4);
}
.__card-row {
  font-size: 1vw;
  margin: 0vh 1.5vh 1.5vh 2vh;
  // background-color: var(--theme-color4);
  display: grid;
  grid-template-columns: 38% 38% 20%;
  grid-column-gap: 2%;
}
.__volunteer-card {
  border-radius: 3vh;
  display: grid;
  grid-template-rows: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-template-columns: 1fr;
  grid-row-gap: 1vh;
  padding: 1vh 1vh;
}
.__support-card {
  border-radius: 3vh;
  display: grid;
  display: grid;
  grid-template-rows: 1fr 2fr 2fr 1fr;
  grid-template-columns: 48% 48%;
  grid-column-gap: 1vh;
  grid-row-gap: 1vh;
  padding: 0.5vh 1vh 1vh 1vh;
}
.__donate-card {
  border-radius: 3vh;
  display: grid;
  grid-template-rows: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-template-columns: 1fr;
  grid-row-gap: 1vh;
  padding: 1vh 1vh;
}
.__card-header {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: .15vh solid var(--theme-color4);
}
.__card-footer1 {
  grid-row-start: 6;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0% 15%;
  button {
    height: 100%;
  }
  // border: 1px solid black;
}
.__card-footer2 {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0% 15%;
  button {
    height: 100%;
  }
  // border: 1px solid black;
}
.__card-item1 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  // margin-top: 4%;
}
.__card-item2 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: grid;
  grid-template-rows: 60% 40%;
  // margin-top: 4%;
}
.__card-item3 {
  border: .15vh solid var(--theme-color4);
  border-radius: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 4%;
}
.__card-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.__card-item-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.--no-margin {
  margin-top: 0vh;
}
.__carousel-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid black;
}
.feed {
  // width: 100%;
  height: auto;
}
.notifications {
  // width: 100%;
  height: 35vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  grid-template-rows: 8vh 1fr 1fr 1fr 1fr 1fr 1fr;
}
.notifications__header {
  background-color: var(--theme-color1);
  border-top-right-radius: 3vh;
  border-top-left-radius: 3vh;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  border-bottom: .3vh solid var(--theme-color4);
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 3fr;
  padding: 0.8vh 0vh 0vh 3vh;
}
.__userPhoto{
  width: 6vh;
  height: 6vh;
  grid-row-start: 1;
  grid-row-end: -1;
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: white;
  border: .15vh solid var(--theme-color3);
  border-radius: 3vh;
}
.__userName {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-end: 2;
  grid-column-start: 3;
  // background-color: var(--theme-color4);
  text-align: left;
}
.__userLocation {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
  // background-color: var(--theme-color4);
  font-size: 1.5vh;
  text-align: left;
}
.notifications__row {
  font-size: 1vw;
  // border-top: .3vh solid var(--theme-color4);
  padding: 0.5vh 2vw;
}

.button-menu{
  height: 25vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  background-color: white;
  display: grid;
  grid-template-rows: 8vh auto auto;
}
.__header {
  background-color: var(--theme-color1);
  border-top-right-radius: 3vh;
  border-top-left-radius: 3vh;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: .3vh solid var(--theme-color4);
  border-collapse: collapse;
}
.__row {
  font-size: 1vw;
  border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
}
.--border-collapse {
  border-top: none;
}
.--bottom-row {
  padding-bottom: 2vh;
}
</style>
