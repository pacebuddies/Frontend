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
  my_graph_stats: UserGraphData;
  recommended_graph_stats: UserGraphData;
}
export interface ClubsData {
  id: string;
  name: string;
  profile_medium: string;
  url: string;
}

export interface UserGraphData {
  avg_speed: number;
  avg_elevation_gain: number;
  avg_distance: number;
  avg_moving_time: number;
  number_of_activities_by_sport_type: number;
}
