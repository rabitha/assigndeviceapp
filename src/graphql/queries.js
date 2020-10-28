/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDevices = /* GraphQL */ `
  query GetDevices($id: ID!) {
    getDevices(id: $id) {
      id
      itemName
      buydate
      itemDetails
      numberofItems
      createdAt
      updatedAt
    }
  }
`;
export const listDevicess = /* GraphQL */ `
  query ListDevicess(
    $filter: ModelDevicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevicess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemName
        buydate
        itemDetails
        numberofItems
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      mppmailAddress
      employeeNumber
      contactNumber
      deskName
      nameofUser
      createdAt
      updatedAt
    }
  }
`;
export const listUserss = /* GraphQL */ `
  query ListUserss(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mppmailAddress
        employeeNumber
        contactNumber
        deskName
        nameofUser
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssignedDevices = /* GraphQL */ `
  query GetAssignedDevices($id: ID!) {
    getAssignedDevices(id: $id) {
      id
      mppmailAddress
      device
      assigneddate
      numberofItems
      returnStatus
      createdAt
      updatedAt
    }
  }
`;
export const listAssignedDevicess = /* GraphQL */ `
  query ListAssignedDevicess(
    $filter: ModelAssignedDevicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignedDevicess(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mppmailAddress
        device
        assigneddate
        numberofItems
        returnStatus
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdminLogin = /* GraphQL */ `
  query GetAdminLogin($id: ID!) {
    getAdminLogin(id: $id) {
      id
      adminemail
      adminpwd
      adminStatus
      createdAt
      updatedAt
    }
  }
`;
export const listAdminLogins = /* GraphQL */ `
  query ListAdminLogins(
    $filter: ModelAdminLoginFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminLogins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        adminemail
        adminpwd
        adminStatus
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
