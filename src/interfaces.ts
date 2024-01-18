interface EnumComentsItems {
  comment: string;
  dateCommented: string;
  postCommentId: number;
  userId: string;
}
// Object post ##########################
export interface EnumDataPostItem {
  commentCount: number;
  content: string;
  comments: Array<EnumComentsItems>;
  datePublished: string;
  images: [""];
  postFavorite: boolean;
  postId: number;
  postLike: boolean;
  postLikeCount: number;
  postView: boolean;
  title: string;
  userFavorite: null | boolean;
  userId: string;
  userLikes: null | number;
  userViews: number;
}

export interface IPostById {
  errors: [];
  data?: EnumDataPostItem | null;
  statusCode: number;
}
// object user ##################################
export interface UserInfoInterface {
  id: string;
  avatar: string;
  fullName: string;
  subscribersCount: number;
  subscriptions: boolean;
  userName: string;
}
// array stories ###################################
export interface storiesObj {
  viewerDto: null | string;
  id: number;
  fileName: null | string;
  postId: string;
  createAt: string;
  userId: string;
}
export interface userStories {
  userId: string;
  userName: string;
  userPhoto: string;
  fullname: string;
  stories: [storiesObj];
}
// interface Post
export interface IPost {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  data: Array<EnumDataPostItem>;
  statusCode: number;
}

// get user by id ##############################################################

export interface getUserByIdInterfaceObj {
  userName: string;
  image: string;
  dateUpdated: string;
  gender: string;
  postCount: number;
  subscribersCount: number;
  subscriptionsCount: number;
  fullName: string;
  dob: string;
  about: string;
}
export interface getUserByIdInterface {
  statusCode: number;
  errors: string;
  data: getUserByIdInterfaceObj;
}

// get user ########################################################################

export interface IUser {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  data: Array<UserInfoInterface>;
  errors: [];
  statusCode: number;
}

export interface IStories {
  data: Array<userStories>;
}
export interface likeId {
  postId: number;
}

// Comment

export interface PropsComment {
  comment: string;
  postId: number;
}

// Chat send message

export interface ChatMessage {
  chatId: number | undefined;
  messageText: string;
}

export interface GetChats {
  data: [
    {
      receiveUser: {
        userId: string;
        userName: string;
        userPhoto: string;
        fullname: string;
        subscriptions: boolean;
      };
      chatId: number | undefined;
    },
  ];
}

export interface GetChatById {
  data: [
    {
      userId: string;
      userPhoto: string;
      messageId: number;
      sendMassageDate: string;
      chatId: number;
      messageText: string;
    },
  ];
}
