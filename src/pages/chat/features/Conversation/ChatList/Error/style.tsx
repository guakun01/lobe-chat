import { Avatar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    background: ${token.colorBgContainer};
    border: 1px solid ${token.colorSplit};
    border-radius: 8px;
  `,
  desc: css`
    color: ${token.colorTextTertiary};
    text-align: center;
  `,
}));

export const ErrorActionContainer = memo<{ children: ReactNode }>(({ children }) => {
  const { styles } = useStyles();

  return (
    <Center className={styles.container} gap={24} padding={24}>
      {children}
    </Center>
  );
});

export const FormAction = memo<{
  avatar: string;
  children: ReactNode;
  description: string;
  title: string;
}>(({ children, title, description, avatar }) => {
  const { styles, theme } = useStyles();

  return (
    <Center gap={16} style={{ maxWidth: 300 }}>
      <Avatar avatar={avatar} background={theme.colorText} gap={12} size={80} />
      <Flexbox style={{ fontSize: 20 }}>{title}</Flexbox>
      <Flexbox className={styles.desc}>{description}</Flexbox>
      {children}
    </Center>
  );
});
