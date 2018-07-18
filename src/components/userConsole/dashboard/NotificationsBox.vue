<template>
  <div class="notifications-box _box">
    <div class="notifications__header">
      <div class="__userPhoto"></div>
      <div class="__userName">User Name</div>
      <div class="__userLocation">Austin, TX</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="comment-alt"
      ></icon>
      <div>Thank You Notes:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="user-plus"
      ></icon>
      <div>Follow:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="hand-holding-usd"
      ></icon>
      <div>Donations:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="hands-helping"
      ></icon>
      <div>Volunteer:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="medkit"
      ></icon>
      <div>Support:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="heart"
      ></icon>
      <div>Interested:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="hourglass"
      ></icon>
      <div>Going:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="trophy"
      ></icon>
      <div>Recognitions:</div>
    </div>
    <div class="notifications__row">
      <icon
        class="icon"
        name="paper-plane"
      ></icon>
      <div>Share:</div>
    </div>
    <div class="notifications__row --bottom-row">
      <a>See all notifications...</a>
    </div>
  </div>
</template>

<script>
// import Feed from './Feed'
// import Search from './Search'
// import NotificationsBox from './NotificationsBox'
// import { ALL_OPPORTUNITIES_QUERY } from '../../../constants/graphql'
// import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'NotificationsBox',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.notifications-box {
  // width: 100%;
  height: 50vh;
  top: 0;
  margin: 0vh;
  padding: 0vh;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  // grid-template-rows: 8vh repeat(10, 4vh);
  align-content: start;
}
.notifications__header {
  background-image: linear-gradient(to bottom, #efba34, #f3cc6a, #f7dd9b, #fbeecb, #fffefb);
  border-top-right-radius: 3vh;
  border-top-left-radius: 3vh;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  border-bottom: .3vh solid var(--theme-color4);
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "user-photo user-name"
    "user-photo user-location";
  padding: 0.8vh 0vh 0vh 3vh;
}
.__userPhoto{
  width: 6vh;
  height: 6vh;
  grid-area: user-photo;
  background-color: white;
  border: .15vh solid var(--theme-color3);
  border-radius: 3vh;
}
.__userName {
  grid-area: user-name;
  text-align: left;
}
.__userLocation {
  grid-area: user-location;
  font-size: 1.5vh;
  text-align: left;
}
.notifications__row {
  font-size: 1vw;
  // border: .3vh solid var(--theme-color4);
  padding: 0.5vh 2vw;
  display: flex;
  align-content: center;
  .icon {
    margin-top: 0.5vh;
    margin-right: 2vh;
  }
}
.__row {
  font-size: 1vw;
  border-top: .3vh solid var(--theme-color4);
  padding: 2vh 2vh;
}
.--bottom-row {
  padding-bottom: 2vh;
}
</style>
