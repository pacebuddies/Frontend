export interface RecommendationData {
  id: string;
  country: string;
  city: string;
  profile: string;
  firstname: string;
  lastname: string;
  sex: string;
  compatibility: number;
  upvotes: number;
  clubs: ClubsData[];
  sport_types: number[];
}
export interface ClubsData {
  name: string;
  profile_medium: string;
  url: string;
}
