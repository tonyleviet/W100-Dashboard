import { UserModel } from '@app/modules/user-management/_models/user.model';

export class UserAuthModel {
    
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
    AccessToken: string;

    clear(): void {
        // this.id = undefined;
        // this.username = '';
        // this.password = '';
        // this.email = '';
        // this.roles = [];
        // this.fullname = '';
        // this.accessToken = 'access-token-' + Math.random();
        // this.refreshToken = 'access-token-' + Math.random();
        // this.pic = './assets/media/users/default.jpg';
        // this.occupation = '';
        // this.companyName = '';
        // this.phone = '';
        // this.address = new Address();
        // this.address.clear();
        // this.socialNetworks = new SocialNetworks();
        // this.socialNetworks.clear();
    }
}
