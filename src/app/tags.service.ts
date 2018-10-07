import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from './tag';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  options: {} = { headers: this.headers };

  getTags() {
  	return this.http.get<Tag[]>(this.baseUrl + '/tag', this.options);
  }

  getTagsByEntry(_id: string) {
    return this.http.get<Tag[]>(this.baseUrl + '/tag/entry/' + _id, this.options);
  }

  getTagById(_id: string) {
  	return this.http.get<Tag>(this.baseUrl + '/tag/'+ _id);
  }

  createTag(tag: Tag) {
  	return this.http.post(this.baseUrl + '/tag', tag, this.options);
  }

  createTags(postId: string, tags: string[]) {
  	for (let i = 0; i < tags.length; i++) {
  		let tag = new Tag();
  		tag.playerid = tags[i];
  		tag.userid = localStorage.getItem('userid');
  		tag.entryid = postId;
  		this.createTag(tag).subscribe();
  	}
  }

  updateTag(tag: Tag) {
  	return this.http.put(this.baseUrl + '/tag/' + tag._id, tag, this.options);
  }

  deleteTag(_id: string) {
  	return this.http.delete(this.baseUrl + '/tag/' + _id, this.options);
  }
}
