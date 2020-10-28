/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDevices = /* GraphQL */ `
  mutation CreateDevices(
    $input: CreateDevicesInput!
    $condition: ModelDevicesConditionInput
  ) {
    createDevices(input: $input, condition: $condition) {
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
export const updateDevices = /* GraphQL */ `
  mutation UpdateDevices(
    $input: UpdateDevicesInput!
    $condition: ModelDevicesConditionInput
  ) {
    updateDevices(input: $input, condition: $condition) {
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
export const deleteDevices = /* GraphQL */ `
  mutation DeleteDevices(
    $input: DeleteDevicesInput!
    $condition: ModelDevicesConditionInput
  ) {
    deleteDevices(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createAssignedDevices = /* GraphQL */ `
  mutation CreateAssignedDevices(
    $input: CreateAssignedDevicesInput!
    $condition: ModelAssignedDevicesConditionInput
  ) {
    createAssignedDevices(input: $input, condition: $condition) {
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
export const updateAssignedDevices = /* GraphQL */ `
  mutation UpdateAssignedDevices(
    $input: UpdateAssignedDevicesInput!
    $condition: ModelAssignedDevicesConditionInput
  ) {
    updateAssignedDevices(input: $input, condition: $condition) {
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
export const deleteAssignedDevices = /* GraphQL */ `
  mutation DeleteAssignedDevices(
    $input: DeleteAssignedDevicesInput!
    $condition: ModelAssignedDevicesConditionInput
  ) {
    deleteAssignedDevices(input: $input, condition: $condition) {
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
export const createAdminLogin = /* GraphQL */ `
  mutation CreateAdminLogin(
    $input: CreateAdminLoginInput!
    $condition: ModelAdminLoginConditionInput
  ) {
    createAdminLogin(input: $input, condition: $condition) {
      id
      adminemail
      adminpwd
      adminStatus
      createdAt
      updatedAt
    }
  }
`;
export const updateAdminLogin = /* GraphQL */ `
  mutation UpdateAdminLogin(
    $input: UpdateAdminLoginInput!
    $condition: ModelAdminLoginConditionInput
  ) {
    updateAdminLogin(input: $input, condition: $condition) {
      id
      adminemail
      adminpwd
      adminStatus
      createdAt
      updatedAt
    }
  }
`;
export const deleteAdminLogin = /* GraphQL */ `
  mutation DeleteAdminLogin(
    $input: DeleteAdminLoginInput!
    $condition: ModelAdminLoginConditionInput
  ) {
    deleteAdminLogin(input: $input, condition: $condition) {
      id
      adminemail
      adminpwd
      adminStatus
      createdAt
      updatedAt
    }
  }
`;
