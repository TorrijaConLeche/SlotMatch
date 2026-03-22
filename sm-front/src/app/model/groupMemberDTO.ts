export interface GroupMemberDTO {
  userId: string;
  displayName: string;
  group: {
    groupId: number;
  }
}