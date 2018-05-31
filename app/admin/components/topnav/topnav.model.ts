export class TopNavModel {
    username: string = "";

    existsUser(): boolean {
        return this.username && this.username !== "";
    }
}