import React from 'react';

import { COMMENT_PATHS } from './../constants/comment.paths';

const COMMENT_SCREEN = {
  id: 'id_comment',
  path: COMMENT_PATHS.COMMENT,
  component: React.lazy(() =>
    import('./../screens/CommentScreen/CommentScreen')
  ),
  pageTitle: 'Quản trị bình luận',
  isPrivateRoute: true,
  exact: true,
};

const COMMENT_REPLY_SCREEN = {
  id: 'id_comment',
  path: COMMENT_PATHS.COMMENT_DETAIL,
  component: React.lazy(() =>
    import('./../screens/CommentDetailScreen/CommentDetailScreen')
  ),
  pageTitle: 'Quản trị bình luận',
  isPrivateRoute: true,
};

export const COMMENT_ROUTES = [COMMENT_SCREEN, COMMENT_REPLY_SCREEN];
