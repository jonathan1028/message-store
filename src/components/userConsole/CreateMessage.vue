<template>
  <div>
    <form class="box">
      <h1>New Message</h1>
      <div class="field">
        <label>Message</label>
        <textarea
          v-model="text"
          rows="10"
          cols="30"
        ></textarea>
      </div>
      <button @click.prevent="cancel()">Cancel</button>
      <button @click.prevent="create()">Submit</button>
    </form>
  </div>
</template>

<script>
import { CREATE_MESSAGE_MUTATION, ALL_MESSAGES_QUERY } from '../../constants/graphql'
import { GC_USER_ID } from '../../constants/settings'

export default {
  name: 'CreateMessage',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    create () {
      // Checks permissions
      const currentUser = localStorage.getItem(GC_USER_ID)
      if (!currentUser) {
        console.error('No user logged in')
        return
      }
      console.log('User', currentUser)

      this.$apollo.mutate({
        mutation: CREATE_MESSAGE_MUTATION,
        variables: {
          text: this.text
        },
        update: (store, { data: { createMessage } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_MESSAGES_QUERY })
          // We add the new data
          data.allMessages.push(createMessage)
          // We update the cache
          store.writeQuery({ query: ALL_MESSAGES_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$router.push({path: '/dashboard'})
    }
  }
}
</script>
