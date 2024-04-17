export default interface CatalogItem {
  source_created: string;
  index: number;
  medium: string;
  reproduction_number: string;
  links: {
    item: string;
    resource: string | null;
  };
  title: string;
  image: {
    alt: string;
    full: string;
    square: string;
    thumb: string;
  };
  created: string;
  modified: string;
  collection: string[];
  creator: string;
  call_number: string;
  medium_brief: string;
  source_modified: string;
  pk: string;
  created_published_date: string;
  subjects: string[];
}
