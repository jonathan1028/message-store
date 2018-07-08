<template>
  <div>
    <!-- <div class="container">
        <div class="content-body">
            <div class="profile">
                <div class="clearfix m-b-30">
                    <div class="avatar-container pull-left">
                        <img class="avatar" v-bind:src="User.customAvatar||User.avatar">
                        <div class="text-center m-t-15">
                            <button class="circle-btn yellow-btn" @click="showAvatarModal">
                                <i class="fa fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                    <div class="pull-left">
                        <div class="details-top">
                            <div class="name">
                                <b>{{ User.fullName||User.email }}</b>
                            </div>
                            <div class="clearfix">
                                <div class="info-row float-left m-r-25">SGC Balance:{{ User.sgcBalance }}</div>
                                <div class="info-row float-left">GGC Balance:{{ User.ggcBalance }}</div>
                            </div>
                            <div class="description">
                                <div class="info-row">
                                    <i class="fa fa-map-marker"></i>
                                    <span class="caption">Location:</span>
                                    <span class="value" style="color:gray">{{ User.locale }}</span>

                                </div>

                                <div class="info-row">
                                    <i class="fa fa-clock-o"></i>
                                    <span class="caption"> Last login:</span>
                                    <span class="value" style="color:gray">{{User.lastLogin}}</span>

                                </div>

                                <div class="info-row">
                                    <i class="fa fa-calendar"></i>
                                    <span class="caption">Joined:</span>
                                    <span class="value" style="color:gray">{{ User.createdAt | ago }} </span>

                                </div>
                            </div>

                        </div>
                        <div class="text-center m-b-30 m-t-15">
                            <button class="circle-btn dark-btn" @click="showPasswordModal()">Change password</button>
                        </div>
                    </div>
                </div>
                <div class="details">

                    <div class="input-groups">
                        <div class="form-group">
                            <span class="top-title">User Name:</span>
                            <div class="btm-input"><input class="form-control form-control-short" type="text" v-model="User.username"></div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">First Name:</span>
                            <div class="btm-input"><input class="form-control form-control-short" type="text" v-model="User.firstName"></div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">Last Name:</span>
                            <div class="btm-input"><input class="form-control form-control-short" type="text" v-model="User.lastName"></div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">Birth Year:</span>
                            <div class="btm-input">
                                <input class="form-control form-control-short" v-model="User.birthYear" type="number" onkeypress="return event.charCode >= 48 || event.charCode<=75" min="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">Volunteer Interest:</span>
                            <div class="btm-input" v-for="(interest, index) in User.volunteerInterest" :key="index">
                                <input class="form-control form-control-short" type="text" v-model="User.volunteerInterest[index]">
                                <button type="button" class="button warning right-btn" @click="remove(User, interest)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            <div class="btm-input">
                                <input class="form-control form-control-short" type="text" v-model="interest">
                                <button class="right-btn" style="margin-top:10px" @click="addInterest(User)">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">My GCT Wallet Address:</span>
                            <div class="btm-input"><input class="form-control form-control-short" type="text" v-model="User.wallet"></div>
                            <button class="circle-btn dark-btn" style="margin-top:10px" @click="getGGCBalance(User)">Get GCT Balance
                            </button>
                        </div>
                        <div class="form-group">
                            <span class="top-title">Location:</span>
                            <div class="btm-input">
                                <gmap-autocomplete @place_changed="setPlace" class="form-control" v-model="User.locale">
                                </gmap-autocomplete>
                                <button @click="addMarker" class="right-btn" title="Show in map">
                                    <i class="fa fa-map-marker"></i>
                                </button>
                            </div>
                            <br>
                            <gmap-map :center="center" :zoom="12" style="width:60%;  height: 400px;">
                                <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center=m.position"></gmap-marker>
                            </gmap-map>

                        </div>
                        <div class="form-group">
                            <span class="top-title">Mobile Phone No:</span>
                            <div class="btm-input">
                                <input class="form-control form-control-short" v-model="User.mobilePhoneNumber" onkeypress="return event.charCode >= 48 || event.charCode<=75" min="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="top-title">Email Address:</span>
                            <div class="btm-input"><input class="form-control form-control-short" type="text" v-model="User.email" disabled=true></div>
                        </div>
                        <div class="btm-btn m-t-30 text-center">
                            <button class="circle-btn yellow-btn" style="width:100%;" @click="update()">Save Changes</button>
                        </div>
                    </div>

                </div>
            </div>

            <Modal v-model="showModal" title="Change Password" :closable="false" :mask-closable="false">
                <div class="form-group">
                    <span style="color:black">Old Password:</span>
                    <input class="form-control" type="password" name="password" style="width:100%" v-model="profile.password" v-validate="'required'">
                    <span v-show="errors.has('password')" style="color:red">{{ errors.first('password') }}</span>
                </div>
                <div class="form-group">
                    <span style="color:black">New Password:</span>
                    <input class="form-control" type="password" style="width:100%" id="newpassword" name="newpassword" v-model="profile.newpassword" data-vv-as="newpassword" v-validate="'required|min:8'">
                    <span v-show="errors.has('newpassword')" style="color:red">{{ errors.first('newpassword') }}</span>
                </div>
                <div class="form-group">
                    <span style="color:black">Confirm Password:</span>
                    <input class="form-control" type="password" style="width:100%" id="confirmpassword" name="confirmpassword" v-model="profile.confirmpassword" data-vv-as="confirmpassword" v-validate="'required|min:8'">
                    <span v-show="errors.has('confirmpassword')" style="color:red">{{ errors.first('confirmpassword') }}</span>
                </div>
                <span v-show="isShowErrorPasswordDoesNotMatch" style="color:red">The password confirmation does not match</span>
                <span v-show="isShowErrorPasswordFormatInvalid" style="color:red">Password must contain three types of uppercase letters, lowercase letters, numbers, and special characters.</span>
                <div class="form-group" v-if="showError">
                    <span style="color:red">{{errorMessage}}</span>
                </div>
                <div slot="footer">
                    <Button class="circle-btn dark-btn" size="large" @click="colsePasswordModal">Cancel</Button>
                    <Button class="circle-btn yellow-btn" size="large" @click="changepwd(profile)">OK</Button>
                </div>
            </Modal>

            <Modal v-model="editAvatar" title="Edit Avatar" :closable="true" :mask-closable="true">
                <div class="form-group">
                    <span style="color:black">Choose a picture(JPG/JPEG/PNG/
                        </span>
                            <input class="form-control" accept=".jpg, .jpeg, .png" type="file" style="width:100%" @change="avatarChanged($event)">
                </div>
                <div class="form-group">
                    <span style="color:red">{{avatarMessage}}</span>
                </div>
                <div class="preview">
                    <img class="avatar" v-bind:src="previewSrc" style="width:300px;height:300px">
                </div>
                <div slot="footer">
                    <Button class="circle-btn dark-btn" size="large" @click="closeAvatarModal">Cancel</Button>
                    <Button class="circle-btn yellow-btn" size="large" @click="saveAvatar(profile)">OK</Button>
                </div>
            </Modal>
        </div>
    </div> -->
    <div class="pageLayout">
      <div class="profileHeader">
        <div class="profileImage"></div>
        <div class="UserName">{{getName(User.firstName, User.lastName)}}</div>
        <div>Location:</div>
        <div>Last Login:</div>
        <div>Joined:</div>
        <button>Change Password</button>
      </div>
      <div class="profileTabs">
        <div v-bind:class="{ active_tab: true }"
          class="tab"
          @click.prevent="isActiveTab('profile')"
        >
          Profile
        </div>
        <div v-bind:class="{ active_tab: true }"
          class="tab"
          @click.prevent="isActiveTab('volunteerPreferences')"
        >
          My Volunteer Preferences
        </div>
        <div v-bind:class="{ active_tab: true }"
          class="tab"
          @click.prevent="isActiveTab('volunteerLogging')"
        >
          My Volunteer Logging
        </div>
        <div v-bind:class="{ active_tab: true }"
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
  background-color: white;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20vh auto auto;
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
  grid-template-columns: max-content max-content max-content auto;
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
