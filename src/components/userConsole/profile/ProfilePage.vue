<template>
  <div class="pageLayout">
    <!-- test: {{userId}}
    Users: {{User}} -->
    <div class="profileHeader">
      <div class="profileImage">Image</div>
      <div class="UserName">{{getName(User.firstName, User.lastName)}}</div>
      <div>Location:</div>
      <div>Last Login:</div>
      <div>Joined:</div>
      <button>Change Password</button>
    </div>
    <div class="profileTabs">
      <!-- <div class="p2_blank_tab"></div> -->
      <div v-bind:class="{ active_tab: true }"
        class="tab"
        @click.prevent=""
      >
        Profile
      </div>
      <div v-bind:class="{ active_tab: true }"
        class="tab"
        @click.prevent="">
        My Volunteer Preferences
      </div>
      <div v-bind:class="{ active_tab: true }"
        class="tab"
        @click.prevent="">
        My Volunteer Logging
      </div>
      <div v-bind:class="{ active_tab: true }"
        class="tab"
        @click.prevent="">
        Privacy Statement
      </div>
    </div>
    <div class="profilePanels">
      <div class="panel">
        <div class="inputs">
          <div class="field">
            <label for="">First Name</label>
            <input
              v-model="User.firstName"
              type="text"
              placeholder="">
          </div>
          <div class="field">
            <label for="">Last Name</label>
            <input
              v-model="User.lastName"
              type="text"
              placeholder="">
          </div>
          <div class="field">
            <label for="">Birth Year</label>
            <input
              v-model="User.birthYear"
              type="text"
              placeholder="">
          </div>
          <div class="field">
            <label for="">Location</label>
            <input
              v-model="User.location"
              type="text"
              placeholder="">
          </div>
           <div class="field">
            <label for="">Phone Number</label>
            <input
              v-model="User.phone"
              type="text"
              placeholder="">
          </div>
          <div class="field">
            <label for="">Email Address</label>
            <input
              v-model="User.email"
              type="text"
              placeholder="">
          </div>
          <div class="buttonsRow">
            <button @click.prevent='update()'>Save Changes</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="field">
          <label for="">Location:</label>
          <input
            v-model="User.volunteeringLocation"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Frequency:</label>
          <input
            v-model="User.volunteeringFrequency"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Receive Emails:</label>
          <input
            v-model="User.receiveVolunteeringEmails"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Volunteer Interest:</label>
          <input
            v-model="User.volunteerInterest"
            type="text"
            placeholder="">
        </div>
        <div class="field">
          <label for="">Keyword:</label>
          <input
            v-model="keyword"
            type="text"
            placeholder="">
        </div>
      </div>
      <div class="panel">
        Panel3
        <button>+ Create Volunteer Logging</button>
      </div>
      <div class="panel">
        Privacy Statement Content
      </div>
    </div>
  </div>
</template>

<script>
// import Feed from './Feed'
import { GET_USER_QUERY, UPDATE_USER_MUTATION } from '../../../constants/graphql'
// import { ALL_USERS_QUERY, UPDATE_USER_MUTATION } from '../../../constants/graphql'
// import { GC_USER_ID } from '../../../constants/settings'

// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'FeedPage',
  components: {
    // Feed
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      // allOpportunities: [
      // {name: 'Opp1'},
      // {name: 'Opp2'},
      // {name: 'Opp3'}
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'Name'},
        {dbField: 'description', title: 'description'},
        {dbField: 'startTime', title: 'Start Time'},
        {dbField: 'endTime', title: 'End Time'},
        {dbField: 'address', title: 'Location'}
      ],
      lastName: '',
      keyword: '',
      userId: this.$store.state.auth.user.id,
      User: {}
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
    }
  },
  methods: {
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    openCreate () {
      this.$store.commit('toggleCreateOpportunity')
    },
    update () {
      const phone = this.User.phone

      console.log('Update User Ran', this.User.birthYear)
      this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.User.id,
          firstName: this.User.firstName,
          lastName: this.User.lastName,
          phone: phone,
          birthYear: this.User.birthYear,
          email: this.User.email
        },
        update: (store, { data: { updateUser } }) => {
          console.log('Updated User', updateUser)
          this.$store.commit('updateUser', updateUser)
          // Get data from store
          // const data = store.readQuery({ query: ALL_USERS_QUERY })
          // // Delete the current person and replace it with a copay
          // let index = data.allUsers.findIndex(x => x.id === this.user.id)
          // if (index !== -1) {
          //   data.allUsers[index] = Object.assign({}, this.user)
          // }
          // // Update the store
          // store.writeQuery({ query: ALL_USERS_QUERY, data: data })
          // 1. Write user to Apollo Store at login
          // 2. Pull from store at profile page
          // 3. Update Apollo store at save
        }
      })
    }
  },
  apollo: {
    User: {
      query: GET_USER_QUERY,
      // Changing variables to a function with a return makes apollo wait on the data before querrying
      // and prevents an undefined error
      variables () {
        return {
          id: this.userId
        }
      },
      result ({ data }) {
        this.User = Object.assign({}, data.User)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 38%;
}
.pageLayout {
  background-color: white;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20vh auto auto;
  // grid-column-gap: 3vw;
  margin-top: 10vh;
  margin-left: 20vw;
  margin-right: 20vw;
  padding: 3%;
}
.profileHeader {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 20% 20% 20% 20% 20%;
  font-size: 2vh;
}
.userName {
  font-size: 4vh;
}
.profileImage {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: -1;
  background-color: lightgray;
}
.profileTabs {
  // padding: 3%;
  display: grid;
  grid-template-columns: max-content max-content max-content auto;
  // border: .15vh solid black;
}
.tab {
  border: .1vh solid black;
  padding: 3%;
  font-size: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tab:hover {
  // background-color: var(--color-hover2);
  // opacity: .8;
  // -webkit-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
  // -moz-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
  // box-shadow:0 .1vh 1vh rgba(0, 0, 0, 0.3), 0 0 4vh rgba(0, 0, 0, 0.1) inset;
}
.active_tab {
  background-color: var( --background-color1);
  border-bottom: none;
  color: black;
  cursor: pointer;
}
.active_tab:hover {
  cursor: pointer;
}
.panel {
  margin: auto;
  border: .15vh solid black;
  padding: 3%;
}
.inputs {
  // margin-top: 5vh;
}
.field {
  width: 100%;
  margin-top: 3vh;
}
label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 100%;
  font-size: 2vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
button {
  width: 100%;
  // margin-top: 5vh;
  background-color: #efba34;
  border-radius: 3vh;
}
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
.buttonsRow {
  display: flex;
}
</style>
