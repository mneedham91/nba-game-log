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

  updateTags(postId: string, newTagsList: string[]) {
    this.getTagsByEntry(postId).subscribe(
      data => { 
        let existingTags: Tag[] = data;
        // Go through existingTags
        for (let i = 0; i < existingTags.length; i++) {
          // Check if player is in updated tags list
          let found: boolean = false;
          for (let z = 0; z < newTagsList.length; z++) {
            if (existingTags[i].playerid == newTagsList[z]) { found = true; } 
          }
          // if not in list, delete the tag
          if (!found) { this.deleteTag(existingTags[i]._id); }
        }
        // Go through newTagsList
        for (let z = 0; z < newTagsList.length; z++) {
          // Check if player is in existing tags list
          let found: boolean = false;
          for (let i = 0; i < existingTags.length; i++) {
            if (existingTags[i].playerid == newTagsList[z]) { found = true; } 
          }
          // if not in list, create a new tag
          if (!found) {
            let tag = new Tag();
            tag.playerid = newTagsList[z];
            tag.entryid = postId;
            tag.userid = localStorage.getItem('userid');
            this.createTag(tag);
        } 
      }
    );
  }

  deleteTag(_id: string) {
  	return this.http.delete(this.baseUrl + '/tag/' + _id, this.options);
  }
}
