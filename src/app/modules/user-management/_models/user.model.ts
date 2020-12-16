import { BaseType } from '@core/index';

export class UserCreateModel {
  UserId: string;
  UserID?: string; // Legacy
  UserName: string;
  Email: string;
  Password?: string;
  ConfirmPassword?: string;
  BirthDay?: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  StoreID: number;
  FirstName: string;
  LastName: string;
  CellPhone: string;
  Phone: string;
  LoyaltyAutoEnroll: boolean;
  ReceiveEmail: boolean;
  ReceiveTextMessage: boolean;
}

export class UserModel extends UserCreateModel {
  General1: boolean;
  General2: boolean;
  General3: boolean;
  General4: boolean;
  Token?: string;
  Promocode?: string;
  RegistrationPath?: boolean;
  SSOChanel?: string;
  IsPwdTemporary: boolean;
  CreatedDate: string;
  IsAuthorized: boolean;
  IsLockedOut: boolean;
  ChangedUserName: boolean;
  LastLoginDate: string;
  LastPasswordChangeDate: string;
  LastUpdatedDate: string;
  ListRoles?: string[] | null;
  SRCardID: string;
  ExternalCustomerCardID?: string;
  ExternalCustomerID: number;
  ApplicationKey?: string;
  BannerHost?: string;
  BannerID?: string;
  BannerName?: string;
  StoreManagerID: number;
  StoreName: string;
  StoreZipCode: string;
  ReceivePostalMail: boolean;
  MiddleName: string;
  SecondaryCellPhone?: string;
  LastUpdatedByUser: string;
  ListContact: ContactModel[];

  UserProfile?: UserModel; // TODO: Should remove this after demo
}

export class UserLoginModel {
	APIKey?: null;
	ClientTag?: null;
	FailCode?: null;
	InvalidPasswordAttempts: number;
	IsSuccess: boolean;
	LockUserTimeout: number;
	LoginStatus: number;
	MaxInvalidPasswordAttempts: number;
	Message?: null;
	Password?: null;
	User: UserModel;
	UserName: string;
	Token: string;
}

export class UserListResultModel {
	Users: Array<UserModel>;
	TotalResult: number;
}

export class ContactModel {
  CS_ContactID: number;
  UserID: string;
  OrderNumber: number;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Email: string;
  Phone: string;
  SecondaryPhone: string;
  Fax: string;
  Note: string;
  Title: string;
  MobilePhone: string;
  IsBilling: boolean;
  IsDelivery: boolean;
  FirstName: string;
  LastName: string;
  ExternalId: string;
  IsPrimary: boolean;
}

export const US_STATE_ENUM_OPTIONS: { [key: string]: string } = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
}

export enum UserStatusEnum {
  Active = 'active', InActive = 'inactive'
}
export const USER_STATUS_ENUM_OPTIONS: { [key: string]: string } = {
  [UserStatusEnum.Active]: 'Active',
  [UserStatusEnum.InActive]: 'InActive'
}

export class ChangePasswordModel {
  UserName: string;
  NewPassword: string;
  OldPassword: string;
}

export class ChangePasswordViewModel extends ChangePasswordModel {
  ConfirmPassword: string;
}

export class StoreListResultModel {
  Stores: IStore[];
  TotalPages: number;
  TotalRecords: number;
  PageSize: number;
}
export interface IStore {
  StoreCode: number;
  StoreId: number;
  CompanyId: string;
  Name: string;
  ShortName: string;
  StoreInformation: string;
  Phone: string;
  Email: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  LeadTime: string;
  Latitude: string;
  Longitude: string;
  StoreLogo: string;
  StoreLogoId: number;
  MapPin: string;
  MapPinId: number;
  AreasOfPractice: string;
  EmailNotifications: string;
  SmsNotifications: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: string;
  CreatedBy: string;
  ModifiedDate: string;
  ModifiedBy: string;
  HtmlEditor: string;
  PickingSlot: {
    MaxSlot: number;
    PickupStartTime: string;
    PickupEndTime: string;
  };
  StoreServices: IService[];
}

// User store
export interface IAddUserStoreBody {
  userId: string;
  storeId: number;
  storeCode?: number;
  pin: string;
  acl: {
    Services?: number[]
  };
}

export interface IStoreAssignedUser {
  UserId: string;
  StoreId: number;
  StoreCode?: number;
  PIN: string;
  ACL: {
    Services?: number[]
  };
}

export interface IService {
  ServiceId: number;
  CompanyId: string;
  ServiceName: string;
  DisplayName: string;
  Description: string;
  DisplayOrder: number;
  IsActive: boolean;
  Type: string;
  ParentId: number;
  ImageUrl: string;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
}
