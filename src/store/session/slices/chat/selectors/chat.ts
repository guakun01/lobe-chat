import { DEFAULT_USER_AVATAR } from '@/const/meta';
import { useGlobalStore } from '@/store/global';
import { ChatMessage } from '@/types/chatMessage';

import type { SessionStore } from '../../../store';
import { agentSelectors } from '../../agentConfig';
import { sessionSelectors } from '../../session/selectors';
import { getSlicedMessagesWithConfig } from '../utils';
import { organizeChats } from './utils';

export const getChatsById =
  (id: string) =>
  (s: SessionStore): ChatMessage[] => {
    const session = sessionSelectors.getSessionById(id)(s);

    if (!session) return [];

    return organizeChats(session, {
      meta: {
        assistant: {
          avatar: agentSelectors.currentAgentAvatar(s),
          backgroundColor: agentSelectors.currentAgentBackgroundColor(s),
        },
        user: {
          avatar: useGlobalStore.getState().settings.avatar || DEFAULT_USER_AVATAR,
        },
      },
      topicId: s.activeTopicId,
    });
  };

// 当前激活的消息列表
export const currentChats = (s: SessionStore): ChatMessage[] => {
  if (!s.activeId) return [];

  return getChatsById(s.activeId)(s);
};

export const currentChatsWithHistoryConfig = (s: SessionStore): ChatMessage[] => {
  const chats = currentChats(s);
  const config = agentSelectors.currentAgentConfig(s);

  return getSlicedMessagesWithConfig(chats, config);
};
