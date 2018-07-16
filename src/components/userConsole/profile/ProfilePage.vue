<template>
  <div>
    <div class="pageLayout">
      <div class="profileHeader">
        <div class="profileImage"></div>
        <div class="user-name">{{getName(User.firstName, User.lastName)}}</div>
        <div>Location:</div>
        <div>Last Login:</div>
        <div>Joined:</div>
        <button class="_button1 headerButton">Change Password</button>
      </div>
      <div class="profileTabs">
        <div 
          v-bind:class="{ 'active-tab': activeTab === 'profile' }"
          class="tab"
          @click.prevent="isActiveTab('profile')"
        >
          Profile
        </div>
        <div 
          v-bind:class="{ 'active-tab': activeTab === 'volunteerPreferences' }"
          class="tab"
          @click.prevent="isActiveTab('volunteerPreferences')"
        >
          My Volunteer Preferences
        </div>
        <div
          v-bind:class="{ 'active-tab': activeTab === 'volunteerLogging'}"
          class="tab"
          @click.prevent="isActiveTab('volunteerLogging')"
        >
          My Volunteer Logging
        </div>
        <div
          v-bind:class="{ 'active-tab': activeTab === 'privacyStatement' }"
          class="tab"
          @click.prevent="isActiveTab('privacyStatement')"
        >
          Privacy Statement
        </div>
      </div>
      <div class="profilePanels">
        <div
            class="panel"
            v-if="activeTab === 'profile'"
        >
          <div class="inputs">
            <div class="field">
              <label for="">First Name:</label>
              <input
                v-model="User.firstName"
                type="text"
                placeholder="">
            </div>
            <div class="field">
              <label for="">Last Name:</label>
              <input
                v-model="User.lastName"
                type="text"
                placeholder="">
            </div>
            <div class="field">
              <label for="">Birth Year:</label>
              <input
                v-model="User.birthYear"
                type="text"
                placeholder="">
            </div>
            <div class="field">
              <label for="">Location:</label>
              <input
                v-model="User.location"
                type="text"
                placeholder="">
            </div>
            <div class="field">
              <label for="">Phone Number:</label>
              <input
                v-model="User.phone"
                type="text"
                placeholder="">
            </div>
            <div class="field">
              <label for="">Email Address:</label>
              <input
                v-model="User.email"
                type="text"
                placeholder="">
            </div>
            <div class="buttonsRow">
              <button class="_button1" @click.prevent='update()'>Save Changes</button>
              <button
                class="_button3">Cancel</button>
            </div>
          </div>
        </div>
        <!-- --------------------------------------------- Volunteer Preferences ----------------------- -->
        <div class="panel"
          v-if="activeTab === 'volunteerPreferences'"
        >
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
        <!-- --------------------------------------------- Volunteer Loggin ----------------------- -->
        <div
          class="panel"
          v-if="activeTab === 'volunteerLogging'"
        >
          Panel3
          <button>+ Create Volunteer Logging</button>
        </div>
        <!-- --------------------------------------------- Privacy Statement ----------------------- -->
        <div
          class="panel"
          v-if="activeTab === 'privacyStatement'"
        >
          Privacy Statement Content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_USER_QUERY, UPDATE_USER_MUTATION } from '../../../constants/graphql'
import moment from 'moment'

export default {
  name: 'FeedPage',
  components: {
    // Feed
  },
  data () {
    return {
      keyword: '',
      userId: this.$store.state.auth.user.id,
      User: {},
      activeTab: 'profile'
    }
  },
  filters: {
    ago (time) {
      return moment(time).fromNow()
    }
  },
  computed: {
  },
  methods: {
    isActiveTab (data) {
      this.activeTab = data
      return this.activeTab
    },
    getName (firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    update () {
      console.log('Update User Ran', this.User.birthYear)
      this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.User.id,
          firstName: this.User.firstName,
          lastName: this.User.lastName,
          phone: this.User.phone,
          birthYear: this.User.birthYear,
          email: this.User.email
        },
        update: (store, { data: { updateUser } }) => {
          // Gets the data from the stored query that existed before the mutation
          const data = store.readQuery({
            query: GET_USER_QUERY,
            variables: {
              id: this.User.id
            }
          })
          // Sets the data.User in the cache to the newly modified User
          data.User = JSON.parse(JSON.stringify(this.User))
          // Writes the updated data back to the store
          store.writeQuery(
            {query: GET_USER_QUERY, data: data}
          )
        }
      })
    }
  },
  apollo: {
    User: {
      query: GET_USER_QUERY,
      // Changing variables: to a function with a return statement makes Apollo
      // wait on the data of userId to be defined before querrying and prevents an undefined error
      variables () {
        return {
          id: this.userId
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo data is read only
        this.User = JSON.parse(JSON.stringify(data.User))
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
  display: grid;
  // ####### GRID ######
  // Profile Header
  // Tabs
  // Tab Panels
  grid-template-columns: 100%;
  grid-template-rows: 25vh auto auto;
  background-color: white;
  margin-left: 20vw;
  margin-right: 20vw;
  padding: 3%;
}
.profileHeader {
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 28% 18% 18% 18% 4vh;
  font-size: 2vh;
  margin-bottom: 5vh;
  .user-name {
    font-size: 3vh;
  }
  .headerButton {
    width: 25%;
  }
}
.profileImage {
  height: 20vh;
  width: 20vh;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: -1;
  background-color: lightgray;
  border-radius: 10vh;
}
.profileTabs {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
}
.tab {
  border: .1vh solid black;
  border-bottom: none;
  padding: 1vh;
  font-size: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1vh;
  border-top-right-radius: 1vh;
  margin-right: 0.25vw;
  background-color: var(--theme-color5);
  cursor: pointer;
}
.tab:hover {
}
.active-tab {
  background-color:white;
  border-bottom: none;
  color: var(--theme-color1);
  cursor: pointer;
  margin-bottom: -1px;
  z-index: 1;
}
.active-tab:hover {
  cursor: pointer;
}
.panel {
  margin: auto;
  border: .15vh solid black;
  padding: 5vh;
  z-index: -1;
}
.inputs {
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
  width: 98%;
  padding-left: 1vw;
  font-size: 2vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// button {
//   width: 100%;
//   background-color: #efba34;
//   border-radius: 3vh;
// }
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
.buttonsRow {
  width: 100%;
  // border: 1px solid red;
  margin-top: 5vh;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  button {
    width: 20vw;
  }
}
</style>
