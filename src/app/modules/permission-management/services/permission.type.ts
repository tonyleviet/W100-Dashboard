import { BaseType } from '@app/core';

export class PermissionType extends BaseType {
    id: number;
    name: string;
    description: string;
    dateCreated: string;
    lastModified: string;
    modifiedBy: string;

    clear(): void {
        this.id = undefined;
        this.name = '';
        this.description = '';
        this.dateCreated = '';
        this.lastModified = '';
        this.modifiedBy = '';
	}
}
