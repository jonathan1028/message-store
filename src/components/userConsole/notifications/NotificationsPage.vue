<template>
    <div class="pageLayout">
      <notifications-box></notifications-box>
      <div class="notifications">
        <ul>
          <li
            class="notification _box-shadow1"
            v-for='(item, index) in allNotifications'
            :key='index'
          >
            <icon
              class="icon"
              name="heart"
            ></icon>
            <div class="message">{{item.message}}</div>
            <div class="time-stamp">{{item.createdAt | formatDate}}</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { ALL_NOTIFICATIONS_QUERY } from '../../../constants/graphql'
import NotificationsBox from '../dashboard/NotificationsBox'
// import moment from 'moment'
// import CreateVolunteeringLog from './CreateVolunteeringLog'
// import UpdateVolunteeringLog from './UpdateVolunteeringLog'
import { format } from 'date-fns'
console.log('UserId', localStorage.getItem('graphcool-user-id'))
export default {
  name: 'NotificationsPage',
  components: {
    NotificationsBox
  },
  data () {
    console.log('NotificationType', this.$store.state.notificationType)
    return {
      allNotifications: []
    }
  },
  filters: {
    formatDate (data) {
      return format(data, 'MMMM Do YYYY, h:mm:ssa')
    }
  },
  computed: {
    modalState () {
      return this.$store.state.showCreateVolunteeringLog
    }
  },
  // methods: {
  //   getDate (startTime, endTime) {
  //     return `${format(startTime, 'MM/DD/YY')}   \u00A0 ${format(endTime, 'MM/DD/YY')}`
  //   },
  //   calculateHours (obj) {
  //     // console.log('time', obj.endTime, obj.startTime, differenceInMinutes(obj.endTime, obj.startTime))
  //     return (parseFloat(differenceInMinutes(obj.endTime, obj.startTime)) / 60).toPrecision(1)
  //   },
  //   toggleCreateVolunteeringLog () {
  //     // console.log('button pushed')
  //     this.$store.commit('toggleCreateVolunteeringLog')
  //   },
  //   toggleUpdateVolunteeringLog (obj) {
  //     // console.log('button pushed')
  //     this.$store.commit('updateCurrentVolunteeringLog', obj)
  //     this.$store.commit('toggleUpdateVolunteeringLog')
  //   },
  //   isActiveTab (data) {
  //     this.activeTab = data
  //     return this.activeTab
  //   },
  //   getName (firstName, lastName) {
  //     return `${firstName} ${lastName}`
  //   },
  //   update () {
  //     console.log('Update User Ran', this.User.birthYear)
  //     this.$apollo.mutate({
  //       mutation: UPDATE_USER_MUTATION,
  //       variables: {
  //         id: this.User.id,
  //         firstName: this.User.firstName,
  //         lastName: this.User.lastName,
  //         phone: this.User.phone,
  //         birthYear: this.User.birthYear,
  //         email: this.User.email
  //       },
  //       update: (store, { data: { updateUser } }) => {
  //         // Gets the data from the stored query that existed before the mutation
  //         const data = store.readQuery({
  //           query: GET_USER_QUERY,
  //           variables: {
  //             id: this.User.id
  //           }
  //         })
  //         // Sets the data.User in the cache to the newly modified User
  //         data.User = JSON.parse(JSON.stringify(this.User))
  //         // Writes the updated data back to the store
  //         store.writeQuery(
  //           {query: GET_USER_QUERY, data: data}
  //         )
  //       }
  //     })
  //   }
  // },
  apollo: {
    // User: {
    //   query: GET_USER_QUERY,
    //   // Changing variables: to a function with a return statement makes Apollo
    //   // wait on the data of userId to be defined before querrying and prevents an undefined error
    //   variables () {
    //     return {
    //       id: this.userId
    //     }
    //   },
    //   result ({ data }) {
    //     // Creates clone of data because Apollo data is read only
    //     this.User = JSON.parse(JSON.stringify(data.User))
    //   }
    // },
    allNotifications: {
      query: ALL_NOTIFICATIONS_QUERY
    }
  }
}
</script>

<style lang="scss" scoped>
.pageLayout {
  // padding: 0vh;
  // background-color: pink;
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.notifications {
  background-color: white;
  padding: 3vh;
}
.notification {
  display: grid;
  grid-template-columns: 5% 65% 30%;
  grid-template-rows: 5vh;
  grid-template-areas:
    "icon message time-stamp";
  padding: 2vh;
  margin-bottom: 3vh;
}
.icon {
  grid-area: icon;
  // border: 1px solid #555;
  color: var(--theme-color3);
}
.message {
  // grid-area: message;
  // border: 1px solid #555;
  font-size: 2vh;
  color: var(--theme-color3);
}
.time-stamp {
  grid-area: time-stamp;
  // border: 1px solid #555;
  font-size: 1.8vh;
  color: var(--theme-color4);
  overflow: hidden;
}
</style>
