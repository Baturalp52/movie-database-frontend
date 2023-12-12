import BaseService from '../base.service';
import {
  SocialMediaItemsGetAllSocialMediaItemResponseType,
  SocialMediaItemsGetSocialMediaItemResponseType,
  SocialMediaItemsPutSocialMediaItemRequestType,
} from './social-media-items.type';

class _SocialMediaItemsService extends BaseService {
  constructor() {
    super('/social-media-items');
  }

  getAllSocialMediaItems() {
    return this.get<SocialMediaItemsGetAllSocialMediaItemResponseType>('');
  }
  getSocialMediaItem(id: number) {
    return this.get<SocialMediaItemsGetSocialMediaItemResponseType>(`${id}`);
  }
  postSocialMediaItem(data: SocialMediaItemsPutSocialMediaItemRequestType) {
    return this.post('', data);
  }
  putSocialMediaItem(
    id: number,
    data: SocialMediaItemsPutSocialMediaItemRequestType,
  ) {
    return this.put(`${id}`, data);
  }
  deleteSocialMediaItem(id: number) {
    return this.delete(`${id}`);
  }
}
const SocialMediaItemsService = new _SocialMediaItemsService();
export default SocialMediaItemsService;
