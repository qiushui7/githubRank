// 定义错误消息映射
const SECONDARY_ERROR_MESSAGES: Record<string, string> = {
  MAX_RETRY: 'Maximum retries exceeded',
  NO_TOKENS: 'No tokens available',
  USER_NOT_FOUND: 'User not found',
  GRAPHQL_ERROR: 'GraphQL API error',
  GITHUB_REST_API_ERROR: 'GitHub REST API error',
  WAKATIME_ERROR: 'WakaTime API error',
};

class CustomError extends Error {
  type: string;
  secondaryMessage: string;

  /**
   * @param {string} message Error message.
   * @param {string} type Error type.
   */
  constructor(message: string, type: string) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }

  static MAX_RETRY = 'MAX_RETRY';
  static NO_TOKENS = 'NO_TOKENS';
  static USER_NOT_FOUND = 'USER_NOT_FOUND';
  static GRAPHQL_ERROR = 'GRAPHQL_ERROR';
  static GITHUB_REST_API_ERROR = 'GITHUB_REST_API_ERROR';
  static WAKATIME_ERROR = 'WAKATIME_ERROR';
}

export default CustomError;
