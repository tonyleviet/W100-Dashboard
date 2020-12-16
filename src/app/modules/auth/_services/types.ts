import { UserModel } from '@app/modules/user-management/_models/user.model';

export interface RsAccessTokenResponseType {
	Success?: boolean;
	ErrorCode?: number;
	AccessToken: string;
	User?: UserModel;
}