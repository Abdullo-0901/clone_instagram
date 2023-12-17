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
  images: string;
  postFavorite: boolean;
  postId: number;
  postLike: boolean;
  postLikeCount: number;
  postView: boolean;
  title: string;
  userFavorite: any;
  userId: string;
  userLikes: any;
  userViews: any;
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
  viewerDto: any;
  id: number;
  fileName: any;
  postId: any;
  createAt: any;
  userId: any;
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
