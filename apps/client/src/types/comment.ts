interface CommentCount {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}

interface CommentItem {
  created_at: string;
  github_id: string;
  id: number;
  message: string;
  rating: number;
  updated_at: string;
  user_id: number;
  username: string;
}

export interface CommentResponse {
  average: number;
  count: CommentCount;
  list: CommentItem[];
  total: number;
}
