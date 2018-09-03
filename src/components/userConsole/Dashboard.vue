<template>
  <div class="pageLayout">

    <div>
      All Messages
      <div class="searchRow">
          <input
            name="query"
            v-model="searchQuery"
            placeholder="Search"
          >
      </div>
      <ul>
        <li
          class="hands"
          v-for="(message,index) in filteredData"
          :key='index'
        >
        <div>
          {{message.text}}
        </div>
        <div>
          {{message.createdAt | relativeTime}}
        </div>
        </li>
      </ul>
    </div>
    <div>
      <!-- <div class="hands">
        <div>Create Hand</div>
        <div>
          <label for="">Rank:</label>
          <input type="number" v-model="rank">
        </div>
        <div>
          <label for="">Preflop Odds:</label>
          <input type="text" v-model="preflopOdds">
        </div>
        <div>
          <label for="">Card 1:</label>
          <input type="text" v-model="card1">
        </div>
        <div>
          <label for="">Card 2:</label>
          <input type="text" v-model="card2">
        </div>
        <button @click="submit">Submit</button>
      </div> -->
      <!-- ------------------------------- Search Hands --------------------------------- -->
      <!-- <div
        class="hands"
        v-for="(hand,index) in filteredData"
        :key='index'
      >
        <div class="cards">
          {{hand.cards[0].code}}, {{hand.cards[1].code}}
        </div>
        <div class="rank">Rank: {{hand.rank}}</div>
        <div>PreFlop Odds (2 players): {{hand.preflopOdds | percentage}}</div>
        <div>Code: {{hand.code}}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ALL_MESSAGES_QUERY } from '../../constants/graphql'

export default {
  name: 'Dashboard',
  data () {
    return {
      allMessages: [
        {text: 'test 5'},
        {text: 'test 6'},
        {text: 'test 7'}
      ],
      searchQuery: ''
    }
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    allMessages: {
      query: ALL_MESSAGES_QUERY
    }
  },
  computed: {
    filteredData: function () {
      let data = this.allMessages
      console.log('Search Query', this.searchQuery)
      var searchQuery = this.searchQuery && this.searchQuery.toLowerCase()

      if (searchQuery) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(searchQuery) > -1
          })
        })
      }

      return data
    }
  },
  methods: {
    // submit () {
    //   console.log('Submit', this.rank, this.preflopOdds, this.code)
    //   let rank = parseInt(this.rank)
    //   let preflopOdds = parseFloat(this.preflopOdds)
    //   let code = ''
    //   let card1 = this.card1
    //   let card2 = this.card2
    //   let card1Data = {}
    //   let card2Data = {}

    //   this.$apollo.query({
    //     query: ALL_CARDS_QUERY,
    //     variables: {
    //       code: card1
    //     }
    //   }).catch((error) => {
    //     console.error(error)
    //   }).then((data) => {
    //     card1Data = data
    //     console.log('Card1 Data', card1Data.data.allCards[0])
    //     card2Data = this.$apollo.query({
    //       query: ALL_CARDS_QUERY,
    //       variables: {
    //         code: card2
    //       }
    //     }).catch((error) => {
    //       console.error(error)
    //     }).then((data) => {
    //       card2Data = data
    //       code = card1Data.data.allCards[0].code + ' ' + card2Data.data.allCards[0].code
    //       console.log('Card2 Data', card2Data.data.allCards[0])
    //       this.$apollo.mutate({
    //         mutation: CREATE_HAND_MUTATION,
    //         variables: {
    //           // Sets variables in graphql.js
    //           rank: rank,
    //           preflopOdds: preflopOdds,
    //           code: code,
    //           cardsIds: [card1Data.data.allCards[0].id, card2Data.data.allCards[0].id]
    //         },
    //         update: (store, { data: { createHand } }) => {
    //           // Pull data from the stored query
    //           const data = store.readQuery({ query: ALL_HANDS_QUERY })
    //           // We add the new data
    //           data.allHands.push(createHand)
    //           // We update the cache
    //           store.writeQuery({ query: ALL_HANDS_QUERY, data: data })
    //         }
    //       }).catch((error) => {
    //         console.error(error)
    //       })
    //     })
    //   })
    //   // console.log('Card ID', card1Id)
    // }
  }
}
</script>

<style lang="scss" scoped>
.pageLayout {
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-template-areas:
     "notifications-component carousel-component action-buttons-component"
     "search-component        feed-component     .";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.hands {
  border: .25vh solid lightgray;
  padding: 1vh;
}
.cards {
  font-size: 3vh;
}
.rank {
  color: blue;
}
</style>
