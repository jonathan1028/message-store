<template>
  <div>
    <div class="searchBlock">
      <form class="search">
        <!-- <input name="query" v-model="searchQuery" placeholder="Search opportunities..."> -->
      </form>
    </div>
    <ul class="feedList">
      <li
        class="feedItem"
        v-for='(item, index) in filteredData'
        :key='index'
      >
        <div class="imageBlock">
          <img src="" href=''>
        </div>
        <div class="textBlock">
          <div>{{item.name}}</div>
          <div class="orgNameBlock">
            <p>with &nbsp;</p>
            <p class="orgName">Organization Name</p>
          </div>
          <p class="description">{{item.description}}</p>
        </div>
        <div class="timeLocationBlock">
          <p class="startTime">{{item.startTime | formatDate}}</p>
          <!-- <p>{{item.endTime | formatDate}}</p> -->
          <p class="location">{{item.address}}</p>
        </div>
        <div class="rightColumn">
          1h
        </div>
        <div class="buttonsBlock">
          <button @click='interested(item)'>Interested</button>
          <button>Going</button>
          <button>Ignore</button>
        </div>
        <div class="usersBlock">
          <ul>
            <li
              class="userStatus"
              v-for='(user, index) in item.interestedUsers'
              :key='index'
            >
              <div class="userName">{{getName(user.firstName, user.lastName)}} &nbsp;</div>
              <div>is interested</div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { ALL_USERS_QUERY } from '../../../constants/graphql'
import { UPDATE_OPPORTUNITY_MUTATION, ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
import moment from 'moment'
import { format, isToday, isTomorrow, isSaturday, isSunday, isThisWeek, isThisMonth } from 'date-fns'

export default {
  name: 'Feed',
  props: {
    data: Array,
    columns: Array
  },
  data: function () {
    // console.log('Search Query', this.$store.state.searchQuery)
    var sortOrders = {}
    const fields = this.columns.map(x => x.dbField)
    fields.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      searchQueryFilters: [],
      allOpportunities: [],
      usersOnFeed: [
        // {name: 'Caleb Jones', status: 'is going'},
        // {name: 'Michael J. Foxworthy', status: 'is interested'},
        // {name: 'Joseph Smith', status: 'volunteered'},
        // {name: 'Michael Johnson', status: 'donated'}

      ]
    }
  },
  computed: {
    filteredData: function () {
      let filters = JSON.parse(JSON.stringify(this.$store.state.searchQueryFilters))
      let data = this.allOpportunities
      // Removes case sensitivity
      var keywords = filters.keywords && filters.keywords.toLowerCase()
      // var sortKey = this.sortKey
      // var order = this.sortOrders[sortKey] || 1
      // console.log('Filter Key', filterKey)

      if (filters.today) {
        data = data.filter(function (item) {
          console.log('Today', isToday(item.startTime))
          return isToday(item.startTime)
        })
      }
      if (filters.tomorrow) {
        data = data.filter(function (item) {
          console.log('Today', isTomorrow(item.startTime))
          return isTomorrow(item.startTime)
        })
      }
      if (filters.thisWeekend) {
        data = data.filter(function (item) {
          let test = isThisWeek(item.startTime) && (isSaturday(item.startTime) || isSunday(item.startTime))
          console.log('This Weekend', test)
          return test
        })
      }
      if (filters.thisWeek) {
        data = data.filter(function (item) {
          let meetsRange = (isThisWeek(item.startTime) && !isSaturday(item.startTime) && !isSunday(item.startTime))
          console.log('This Week', meetsRange)
          return meetsRange
        })
      }
      if (filters.thisMonth) {
        data = data.filter(function (item) {
          console.log('Today', isThisMonth(item.startTime))
          return isThisMonth(item.startTime)
        })
      }
      if (filters.mornings) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          console.log('Mornings', time)
          return format(item.startTime, 'H') < 12
        })
      }
      if (filters.afternoons) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          let meetsRange = time > 12 && time < 17
          console.log('Afternoons', meetsRange)
          return meetsRange
        })
      }
      if (filters.evenings) {
        data = data.filter(function (item) {
          let time = format(item.startTime, 'H')
          let meetsRange = time > 16
          console.log('Evenings', meetsRange)
          return meetsRange
        })
      }
      if (keywords) {
        data = data.filter(function (row) {
          // Pulls out all keys in the current object and iterates over them
          return Object.keys(row).some(function (key) {
            // Returns the index# where this object's key matches the filterKey
            return String(row[key]).toLowerCase().indexOf(keywords) > -1
          })
        })
      }

      // if (sortKey) {
      //   data = data.slice().sort(function (a, b) {
      //     a = a[sortKey]
      //     b = b[sortKey]
      //     return (a === b ? 0 : a > b ? 1 : -1) * order
      //   })
      // }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatDate: function (date) {
      if (date !== null) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  },
  methods: {
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    interested (opportunity) {
      let userId = localStorage.getItem('graphcool-user-id')
      console.log('Interested', opportunity.interestedUsers)
      let interestedUsersIds = opportunity.interestedUsers.map(x => {
        return x.id
      })
      if (opportunity.interestedUsers.find(user => user.id === userId)) {
        return console.log('User Found')
      } else {
        interestedUsersIds.push(userId)
      }

      console.log('UserIds', interestedUsersIds)

      this.$apollo.mutate({
        mutation: UPDATE_OPPORTUNITY_MUTATION,
        variables: {
          id: opportunity.id,
          name: opportunity.name,
          interestedUsersIds: interestedUsersIds
        },
        update: (store, { data: { updateOpportunity } }) => {
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: updateOpportunity })
        }
      })
    }
  },
  apollo: {
    // The name of this variable must equal to the name of back-end API function
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBlock {
  display: flex;
  justify-content: space-between;
  padding: 1%;
}
.search {
  height: 4vh;
  // padding: 1%;
  input {
    width: 25vw;
    height: 4vh;
    font-size: 2.5vh;
    color: var(--theme-color3);
  }
}
.feedList {
  // height: 80vh;
  // overflow-y: scroll;
}
.feedItem {
  display: grid;
  grid-template-columns: 10% 68% 10%;
  grid-template-rows: 20% 10% 10% 50%;
  grid-column-gap: 5%;
  background-color: white;
  margin-top: 1%;
  padding: 2%;
  /* border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;
}
.imageBlock {
  height: 10vh;
  width: 10vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: lightgray;
  border-radius: 5vh;
}
.textBlock {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  // padding-left: 5%;
  font-size: 3vh;
  p {
    font-size: 2vh;
  }
  // border: 1px solid red;
}
.orgNameBlock {
  display: flex;
}
.orgName {
  text-decoration: underline;
}
.description {
  margin-top: 1vh;
}
.timeLocationBlock {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  justify-content: space-between;
  p{
    font-size: 2vh;
  }
  // border: 1px solid red;
}
.rightColumn {
  grid-row-start: 1;
  grid-row-end: -1;
  grid-column-start: 3;
  grid-column-end: 4;
  // background-color: gray;
  width: 10vh;
  height: 10vh;
}
.buttonsBlock {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 3;
  padding-top: 3%;
  button {
    border: .1vh solid var(--theme-color3);
    background-color: var(--theme-color1);
  }
}
.usersBlock {
  margin-top: 2%;
  padding-top: 2%;
  border-top: .25vh solid lightgray;
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: -1;
}
.userStatus {
  display: flex;
  margin: 1% 0%;
  padding: 1% 2%;
  border: .25vh solid lightgray;
  border-radius: 3vh;
  font-size: 1.75vh;
  width: max-content;
  background-color: var(--theme-color2);
}
.userName {
  color: black;
  font-weight: 900;
}
</style>
