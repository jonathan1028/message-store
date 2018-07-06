import gql from 'graphql-tag'

// ----------------------------------------- Queries ---------------------------------------------
export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_QUERY = gql`
  query User ($id: ID!){
    User(id: $id) {
      id
      firstName
      lastName
      email
      birthYear
      phone
    }
  }
`

// query Post($id: ID!) {
//   Post(id: $id) {
//     id
//     imageUrl
//     description
//   }

export const USERS_ON_FEED_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    # gives you access to the count of the links
    _allLinksMeta {
      count
    }
  }
`

export const ALL_PEOPLE_QUERY = gql`
  query AllPersonsQuery {
    allPersons {
      id
      createdAt
      displayName
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`
export const ALL_OPPORTUNITIES_QUERY = gql`
  query AllOpportunitiesQuery {
    allOpportunities {
      id
      name
      description
      startTime
      endTime
      address
      ownedBy {
        id
      }
      interestedUsers {
        id
        firstName
        lastName
      }
    }
  }
`

export const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
// ----------------------------------------- Mutations ---------------------------------------------

// Two mutations defined at once!
// the execution order is always from top to bottom.
// CreateUser mutation will be executed before the signinUser mutation.
// Bundling two mutations like this allows you to sign up and login in a single request!
export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($firstName: String, $lastName: String, $email: String!, $password: String!) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePersonMutation($displayName: String!, $firstName: String, $lastName: String, 
    $phone1: String, $email: String, $ownedById: ID!) {
    createPerson(
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1,
      email: $email,
      ownedById: $ownedById
    ) {
      id
      createdAt
      displayName 
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunityMutation($name: String, $ownedById: ID!, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $address: String) {
    createOpportunity(
      name: $name
      ownedById: $ownedById
      description: $description
      startTime: $startTime
      endTime: $endTime
      address: $address
    ) {
      id
      name
      description
      startTime
      endTime
      address
      ownedBy {
        id
        firstName
        lastName
      }
    }
  }
`

export const UPDATE_OPPORTUNITY_MUTATION = gql`
  mutation UpdateOpportunityMutation($id: ID!, $name: String, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $address: String, $interestedUsersIds: [ID!]) {
    updateOpportunity(
      id: $id,
      name: $name
      description: $description
      startTime: $startTime
      endTime: $endTime
      address: $address,
      interestedUsersIds: $interestedUsersIds
    ) {
      id
      name
      description
      startTime
      endTime
      address
      ownedBy {
        id
        firstName
        lastName
      }
      interestedUsers {
        id
        firstName
        lastName
      }
    }
  }
`

export const UPDATE_INTERESTED_USERS_MUTATION = gql`
  mutation UpdateOpportunityMutation($id: ID!, $firstName: String, $lastName: String, $description: String, 
  $startTime: DateTime, $endTime: DateTime, $address: String, $interestedUsersIds: [ID!]) {
    updateOpportunity(
      id: $id,
      firstName: $firstName
      lastName: $lastName
      description: $description
      startTime: $startTime
      endTime: $endTime
      address: $address
      interestedUsersIds: $interestedUsersIds
    ) {
      id
      name
      description
      startTime
      endTime
      address
      ownedBy {
        id
        firstName
        lastName
      }
      interestedUsers {
        id
        firstName
        lastName
      }
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!,  $firstName: String, $lastName: String, $phone: String, 
  $birthYear: String) {
    updateUser(
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      birthYear: $birthYear,
    ) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePersonMutation($id: ID!, $displayName: String!, $firstName: String, 
  $lastName: String, $phone1: String, $email: String) {
    updatePerson(
      id: $id,
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1, 
      email: $email
    ) {
      id
      displayName
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(
      id: $id,
    ) {
      id
    }
  }
`

export const DELETE_OPPORTUNITY_MUTATION = gql`
  mutation DeleteOpportunityMutation($id: ID!) {
    deleteOpportunity(
      id: $id,
    ) {
      id
    }
  }
`

export const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: ID!) {
    deletePerson(
      id: $id,
    ) {
      id
    }
  }
`

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`
// ----------------------------------------- Subscriptions ---------------------------------------------

export const NEW_PEOPLE_SUBSCRIPTION = gql`
  subscription {
    Person(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        createdAt
        displayName 
        firstName
        lastName
        phone1
        email
        ownedBy {
          id
        }
      }
    }
  }
`

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    Vote(filter: { mutation_in: [CREATED] }) 
    {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`
