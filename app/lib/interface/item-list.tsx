export interface ItemList {
    avatar?: any,
    title: string,
    description: string
}

export interface ListProps<ItemList> {
    dataItems: ItemList[];
  }