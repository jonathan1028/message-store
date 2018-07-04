<template>
  <div>
    <ul>
      <li
        class="feedItem"
        v-for='(item, index) in filteredData'
        :key='index'
      >
          <div class="eventTextBlock">
            <div>{{item.name}}</div>
            <p>with Organization Name</p>
            <p class="description">{{item.description}}</p>
            <p>{{item.startTime}}</p>
            <p>{{item.endTime}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ALL_PEOPLE_QUERY, DELETE_PERSON_MUTATION } from '../../../constants/graphql'

export default {
  name: 'Feed',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    const fields = this.columns.map(x => x.dbField)
    fields.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    isContacts: function (field) {
      if (field === 'contacts') {
        return true
      } else {
        return false
      }
    },
    getNames: function (contacts) {
      if (contacts[0]) {
        // let names = ''
        // contacts.map(x => {
        //   names = names + x.displayName
        // })
        // return names
        console.log('Contacts', contacts)
        let name = contacts[0].displayName
        return name
      } else {
        return ''
      }
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    viewPerson: function (person) {
      localStorage.setItem('person', JSON.stringify(person))
      this.$router.push({path: `/person/${person.id}`})
    },
    updatePerson (person) {
      localStorage.setItem('person', JSON.stringify(person))
      console.log('test1', JSON.parse(localStorage.getItem('person')))
      this.$router.push({path: `/person/update/${person.id}`})
    },
    deletePerson (person) {
      this.$apollo.mutate({
        mutation: DELETE_PERSON_MUTATION,
        variables: {
          id: person.id
        },
        update: (store, { data: { deletePerson } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: ALL_PEOPLE_QUERY })
          // Remove item from the list
          const index = data.allPersons.findIndex(x => x.id === person.id)
          if (index !== -1) {
            data.allPersons.splice(index, 1)
          }
          // Take the modified data and write it back into the store.
          store.writeQuery({ query: ALL_PEOPLE_QUERY, data })
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style>
.feedItem {
  display: grid;
  grid-template-columns: 15% 85% 15%;
  grid-template-rows: 20% 10% 10% 50%;
  background-color: white;
  margin-top: 1%;
  padding: 1%;
  /* border: 1px solid #BFBFBF;
  background-color: white;
  box-shadow: 3px 3px 3px 3px #aaaaaa; */
  -webkit-box-shadow: 0 1px 2px #777;
  -moz-box-shadow: 0 2px 1px #777;
  box-shadow: 0 2px 1px #777;
}
.eventTextBlock {
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 4vh;
}
.description {
  margin-top: 1vh;
}

</style>
