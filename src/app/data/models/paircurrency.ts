export class PairCurrency {
  left: string;
  right: string;
  active: boolean;
  favorite: boolean;

  constructor(inputLeft: string, inputRight: string, inputActive: boolean = false, inputFavorite: boolean = false) {
    this.left = inputLeft;
    this.right = inputRight;
    this.active = inputActive;
    this.favorite = inputFavorite;
  }
}
