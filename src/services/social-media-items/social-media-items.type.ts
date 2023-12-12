import { SocialMediaItemType } from '@/types/social-media-item.type';

export type SocialMediaItemsGetAllSocialMediaItemResponseType =
  SocialMediaItemType[];
export type SocialMediaItemsGetSocialMediaItemResponseType =
  SocialMediaItemType;

export type SocialMediaItemsPostSocialMediaItemRequestType = {
  name: string;
  icon: string;
};
export type SocialMediaItemsPutSocialMediaItemRequestType = {
  name?: string;
  icon?: string;
};
