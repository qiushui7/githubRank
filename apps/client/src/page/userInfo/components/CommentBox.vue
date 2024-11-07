<template>
  <div class="comment-box">
    <!-- 评论输入区域 -->
    <div class="comment-input-container">
      <div class="user-avatar">
        <img
          v-if="userInfo?.avatar_url"
          :src="userInfo.avatar_url"
          :alt="userInfo.login"
        />
        <div v-else class="avatar-placeholder"></div>
      </div>
      <div class="input-wrapper">
        <textarea
          v-model="commentText"
          :placeholder="
            isAuth ? t('comment.placeholder') : t('comment.login_first')
          "
          class="comment-textarea"
          :disabled="!isAuth"
        ></textarea>
        <div class="action-container">
          <div class="rating-container">
            <StarRating v-model="rating" :disabled="!isAuth" />
          </div>
          <button
            class="submit-button"
            :disabled="!isAuth || !commentText.trim() || !rating"
            @click="handleSubmit"
          >
            {{ t('comment.submit') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <template v-if="comments.length > 0">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-avatar" @click="navigateToUser(comment.username)">
            <img :src="comment.avatar_url" :alt="comment.username" />
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <div class="user-info">
                <span
                  class="comment-username"
                  @click="navigateToUser(comment.username)"
                >
                  {{ comment.username }}
                </span>
                <StarRating
                  :model-value="comment.rating"
                  disabled
                  class="comment-rating"
                />
              </div>
              <span class="comment-time">
                {{ formatTime(comment.created_at) }}
              </span>
            </div>
            <div class="comment-text">{{ comment.message }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty-state">
          <div class="empty-icon">💭</div>
          <div class="empty-text">{{ t('comment.empty') }}</div>
          <div class="empty-subtext">{{ t('comment.be_first') }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import StarRating from './StarRating.vue';
import { formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { createComment } from '../../../service/comment';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();

const props = defineProps<{
  userInfo: any;
  isAuth: boolean;
  github_id: string;
  comments: any[];
}>();

const emit = defineEmits(['handlePageChange']);
const commentText = ref('');

const rating = ref(0);

const router = useRouter();

const navigateToUser = (username: string) => {
  router.push(`/userInfo/${username}`);
};

const formatTime = (time: string) => {
  const locales: Record<'zh' | 'en', any> = {
    zh: zhCN,
    en: enUS,
  };
  return formatDistanceToNow(new Date(time), {
    addSuffix: true,
    locale: locales[locale.value as 'zh' | 'en'] || enUS,
  });
};

const handleSubmit = async () => {
  console.log(commentText.value, rating.value);
  if (commentText.value.trim() && rating.value) {
    try {
      // 调用API提交评论和评分
      const newComment = {
        message: commentText.value,
        number: rating.value,
        github_id: props.github_id,
        avatar_url: props.userInfo.avatar_url,
      };
      await createComment(newComment);
      commentText.value = '';
      rating.value = 0;
      emit('handlePageChange', 1);
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;

  .comment-input-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        background: var(--skeleton-bg-color);
      }
    }

    .input-wrapper {
      flex: 1;

      .comment-textarea {
        width: 100%;
        min-height: 100px;
        padding: 1rem;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        background: var(--bg-color);
        color: var(--text-color);
        resize: vertical;
        transition: all 0.3s ease;
        box-sizing: border-box;
        margin-bottom: 1rem;

        &:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      }

      .action-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rating-container {
          flex: 1;
        }

        .submit-button {
          padding: 0.5rem 1.5rem;
          border: none;
          border-radius: 8px;
          background: #2196f3;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: 1rem;

          &:hover:not(:disabled) {
            background: #1976d2;
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }
      }
    }
  }

  .comments-list {
    margin-top: 2rem;

    .comment-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--shadow-color);
      }

      .comment-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--border-color);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border-color: #2196f3;
          transform: scale(1.05);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .comment-username {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-color);
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #2196f3;
          text-decoration: underline;
        }
      }

      .comment-content {
        flex: 1;

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;

          .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;

            .comment-username {
              font-size: 1.1rem;
              font-weight: 600;
              color: var(--text-color);

              &:hover {
                color: #2196f3;
              }
            }

            .comment-rating {
              margin-left: 0.5rem;
            }
          }

          .comment-time {
            font-size: 0.9rem;
            color: var(--text-color);
            opacity: 0.7;
          }
        }

        .comment-text {
          color: var(--text-color);
          line-height: 1.6;
          font-size: 1rem;
          white-space: pre-wrap;
          padding: 1rem 1.2rem;
          background: var(--hover-bg-color);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-top: 0.5rem;
          position: relative;

          &::first-letter {
            margin-left: 1rem;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .pagination-container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: var(--text-color);

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .empty-subtext {
      font-size: 0.9rem;
      opacity: 0.7;
    }
  }
}

// 添加响应式设计
@media (max-width: 768px) {
  .comment-box {
    .comments-list {
      .comment-item {
        padding: 1rem;
        gap: 1rem;

        .comment-avatar {
          width: 40px;
          height: 40px;
        }

        .comment-content {
          .comment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;

            .user-info {
              flex-wrap: wrap;
            }
          }
        }
      }
    }
  }
}
</style>
