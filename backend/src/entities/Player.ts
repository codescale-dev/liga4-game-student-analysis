export class Player {
  private Id: string;
  private Name: string;
  private Victories: number;

  constructor(name: string, id: string) {
    if (!this.isNameValid(name)) {
      throw new Error("INVALID_PLAYER_NAME");
    }

    if (!this.isIdValid(id)) {
      throw new Error("INVALID_PLAYER_ID");
    }

    this.Id = id;
    this.Name = name;
    this.Victories = 0;
  }

  get name() {
    return this.Name;
  }

  get id() {
    return this.Id;
  }

  get victories() {
    return this.Victories;
  }

  private isNameValid(name: string) {
    return typeof name === 'string' && name.length > 3;
  }

  private isIdValid(id: string) {
    return typeof id === 'string' && id.length > 1;
  }

  victory() {
    this.Victories += 1;
  }
}