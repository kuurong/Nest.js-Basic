export interface Paginated<T> {
  data: T[];
  //data is going to be an array of the entity.
  // for example if you want to paginate the posts entity, the data over here would be an array of posts.
  // If you want to paginate the user's entity, then the data over here is going to be an array of users.
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}
