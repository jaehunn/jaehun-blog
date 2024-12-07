export type Post = {
  /** 식별자 */
  slug: string;

  /** 제목 */
  title: string;

  /** 설명 */
  description: string;

  /** 내용 */
  body: string;

  /** 생성일 */
  createdAt: string;

  /** 업데이트일 */
  updatedAt: string;
};
